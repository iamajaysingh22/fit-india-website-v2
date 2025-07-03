#!/bin/bash
set -e

# Intelligent Deployment Script for Three Environments
# Usage: ./deploy-to-env.sh [development|test|production]

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
ENVIRONMENTS=("development" "test" "production")
TIMEOUT=1800  # 30 minutes

# Logging functions
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Show usage
show_usage() {
    echo "Usage: $0 [environment]"
    echo ""
    echo "Environments:"
    echo "  development  - Deploy to dev-fit-india-website"
    echo "  test         - Deploy to test-fit-india-website"
    echo "  production   - Deploy to prod-fit-india-website"
    echo ""
    echo "Examples:"
    echo "  $0 development"
    echo "  $0 test"
    echo "  $0 production"
}

# Validate environment parameter
validate_environment() {
    local env=$1
    
    if [[ -z "$env" ]]; then
        log_error "Environment parameter required"
        show_usage
        exit 1
    fi
    
    if [[ ! " ${ENVIRONMENTS[@]} " =~ " ${env} " ]]; then
        log_error "Invalid environment: $env"
        show_usage
        exit 1
    fi
    
    # Map environment to EB environment name and Git branch
    case "$env" in
        "development")
            EB_ENV="dev-fit-india-website"
            GIT_BRANCH="development"
            ;;
        "test")
            EB_ENV="test-fit-india-website"
            GIT_BRANCH="test"
            ;;
        "production")
            EB_ENV="prod-fit-india-website"
            GIT_BRANCH="main"
            ;;
    esac
    
    log_info "Deployment target:"
    echo "  Environment: $env"
    echo "  EB Environment: $EB_ENV"
    echo "  Git Branch: $GIT_BRANCH"
}

# Check environment status
check_environment_status() {
    log_info "Checking environment status..."
    
    # Check if environment exists
    if ! eb list | grep -q "$EB_ENV"; then
        log_error "Environment '$EB_ENV' does not exist"
        log_info "Create it first with: ./scripts/setup-three-environments.sh"
        exit 1
    fi
    
    # Get environment status
    local status=$(eb status $EB_ENV | grep "Status:" | awk '{print $2}')
    log_info "Environment status: $status"
    
    # Wait if environment is updating
    if [[ "$status" == "Updating" ]]; then
        log_warning "Environment is currently updating. Waiting..."
        local wait_time=0
        while [[ "$status" == "Updating" && $wait_time -lt 600 ]]; do
            sleep 30
            wait_time=$((wait_time + 30))
            status=$(eb status $EB_ENV | grep "Status:" | awk '{print $2}')
            log_info "Still updating... (${wait_time}s elapsed)"
        done
        
        if [[ "$status" == "Updating" ]]; then
            log_error "Environment still updating after 10 minutes. Please try later."
            exit 1
        fi
    fi
    
    # Check if environment is ready
    if [[ "$status" != "Ready" ]]; then
        log_error "Environment is not ready. Status: $status"
        log_info "Check environment health with: eb health $EB_ENV"
        exit 1
    fi
    
    log_success "Environment is ready for deployment"
}

# Validate Git branch and handle uncommitted changes
validate_git_branch() {
    log_info "Validating Git repository state..."
    
    # Check if we're in a Git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "Not in a Git repository"
        exit 1
    fi
    
    # Get current branch
    local current_branch=$(git branch --show-current)
    log_info "Current branch: $current_branch"
    
    # Check for uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        log_warning "Uncommitted changes detected"
        
        # Ask user what to do
        echo "Options:"
        echo "1. Commit changes and continue"
        echo "2. Stash changes and continue"
        echo "3. Abort deployment"
        read -p "Choose option (1/2/3): " choice
        
        case $choice in
            1)
                log_info "Committing changes..."
                git add .
                read -p "Enter commit message: " commit_msg
                git commit -m "$commit_msg"
                ;;
            2)
                log_info "Stashing changes..."
                git stash push -m "Auto-stash before deployment to $ENV"
                ;;
            3)
                log_info "Deployment aborted by user"
                exit 0
                ;;
            *)
                log_error "Invalid choice"
                exit 1
                ;;
        esac
    fi
    
    # Switch to target branch if needed
    if [[ "$current_branch" != "$GIT_BRANCH" ]]; then
        log_info "Switching to branch: $GIT_BRANCH"
        git checkout $GIT_BRANCH || {
            log_error "Failed to checkout branch: $GIT_BRANCH"
            exit 1
        }
    fi
    
    # Pull latest changes
    log_info "Pulling latest changes from remote..."
    git pull origin $GIT_BRANCH || {
        log_warning "Failed to pull from remote. Continuing with local branch."
    }
    
    log_success "Git repository state validated"
}

# Test build locally
test_build_locally() {
    log_info "Testing build locally..."
    
    # Install dependencies if needed
    if [[ ! -d "node_modules" ]] || [[ "package.json" -nt "node_modules" ]]; then
        log_info "Installing dependencies..."
        npm ci
    fi
    
    # Run build
    log_info "Running npm run build..."
    if npm run build; then
        log_success "Local build successful"
    else
        log_error "Local build failed. Please fix build errors before deploying."
        exit 1
    fi
    
    # Run linting if available
    if npm run lint &> /dev/null; then
        log_info "Running linting..."
        npm run lint || log_warning "Linting issues detected"
    fi
}

# Production safety checks
production_safety_checks() {
    if [[ "$ENV" == "production" ]]; then
        log_warning "🚨 PRODUCTION DEPLOYMENT SAFETY CHECKS 🚨"
        
        # Confirmation prompt
        echo ""
        echo -e "${RED}⚠️  You are about to deploy to PRODUCTION${NC}"
        echo "This will affect live users!"
        echo ""
        read -p "Are you absolutely sure? Type 'DEPLOY' to continue: " confirm
        
        if [[ "$confirm" != "DEPLOY" ]]; then
            log_info "Production deployment cancelled"
            exit 0
        fi
        
        # Check if deployment is from main branch
        local current_branch=$(git branch --show-current)
        if [[ "$current_branch" != "main" ]]; then
            log_error "Production deployments must be from 'main' branch"
            log_info "Current branch: $current_branch"
            exit 1
        fi
        
        # Check if there are any recent commits
        local commits_ahead=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "0")
        if [[ "$commits_ahead" -gt 0 ]]; then
            log_warning "Local branch is $commits_ahead commits ahead of origin/main"
            read -p "Push changes to remote? (y/N): " push_confirm
            if [[ $push_confirm == [yY] ]]; then
                git push origin main
            fi
        fi
        
        log_info "Production safety checks passed"
    fi
}

# Deploy to Elastic Beanstalk
deploy_to_eb() {
    log_info "Deploying to Elastic Beanstalk..."
    
    # Show deployment info
    echo "Deployment Details:"
    echo "  Environment: $ENV"
    echo "  EB Environment: $EB_ENV"
    echo "  Git Branch: $GIT_BRANCH"
    echo "  Commit: $(git rev-parse --short HEAD)"
    echo "  Message: $(git log -1 --pretty=%B | head -n1)"
    echo ""
    
    log_info "Build process will execute:"
    echo "  1. Install all dependencies (including dev dependencies)"
    echo "  2. Build Next.js application"
    echo "  3. Remove dev dependencies to save space"
    echo "  4. Verify build output (.next directory)"
    echo "  5. Fix file permissions"
    echo ""
    
    # Deploy with timeout
    log_info "Starting deployment (timeout: ${TIMEOUT}s)..."
    
    if timeout $TIMEOUT eb deploy $EB_ENV --verbose; then
        log_success "Deployment completed successfully!"
    else
        local exit_code=$?
        if [[ $exit_code -eq 124 ]]; then
            log_error "Deployment timed out after ${TIMEOUT} seconds"
        else
            log_error "Deployment failed with exit code: $exit_code"
        fi
        
        log_info "Checking deployment logs..."
        eb logs $EB_ENV --all || true
        exit 1
    fi
}

# Verify deployment
verify_deployment() {
    log_info "Verifying deployment..."
    
    # Get environment URL
    local env_url=$(eb status $EB_ENV | grep "CNAME" | awk '{print $2}')
    
    if [[ -n "$env_url" ]]; then
        local full_url="https://$env_url"
        log_info "Testing application at: $full_url"
        
        # Test main page
        if curl -f -s --max-time 30 "$full_url" > /dev/null; then
            log_success "Main page accessible"
        else
            log_warning "Main page not accessible"
        fi
        
        # Test health endpoint
        if curl -f -s --max-time 10 "$full_url/api/health" > /dev/null; then
            log_success "Health endpoint accessible"
        else
            log_warning "Health endpoint not accessible"
        fi
        
        echo ""
        log_success "🌐 Application URL: $full_url"
        log_success "📊 Health Check: $full_url/api/health"
        
        # Show environment health
        log_info "Environment health summary:"
        eb health $EB_ENV || true
        
    else
        log_warning "Could not determine environment URL"
    fi
}

# Post-deployment actions
post_deployment_actions() {
    log_info "Post-deployment actions..."
    
    # Create deployment tag
    local timestamp=$(date +"%Y%m%d-%H%M%S")
    local tag_name="deploy-${ENV}-${timestamp}"
    
    log_info "Creating deployment tag: $tag_name"
    git tag -a "$tag_name" -m "Deployment to $ENV on $(date)"
    git push origin "$tag_name" || log_warning "Failed to push tag to remote"
    
    # Log deployment
    echo "$(date): Deployed to $ENV ($EB_ENV) - $(git rev-parse --short HEAD)" >> deployment.log
    
    log_success "Post-deployment actions completed"
}

# Rollback on failure
rollback_deployment() {
    log_error "Deployment failed. Initiating rollback..."
    
    # Get previous version
    local previous_version=$(eb appversion-list $EB_ENV | head -n 2 | tail -n 1 | awk '{print $1}')
    
    if [[ -n "$previous_version" ]]; then
        log_info "Rolling back to previous version: $previous_version"
        eb deploy $EB_ENV --version $previous_version
        log_success "Rollback completed"
    else
        log_warning "No previous version found for rollback"
    fi
}

# Performance benchmark
run_performance_check() {
    if command -v curl &> /dev/null; then
        log_info "Running basic performance check..."
        
        local env_url=$(eb status $EB_ENV | grep "CNAME" | awk '{print $2}')
        if [[ -n "$env_url" ]]; then
            local response_time=$(curl -o /dev/null -s -w "%{time_total}" "https://$env_url")
            log_info "Response time: ${response_time}s"
            
            if (( $(echo "$response_time > 5" | bc -l) )); then
                log_warning "Slow response time detected: ${response_time}s"
            else
                log_success "Good response time: ${response_time}s"
            fi
        fi
    fi
}

# Main execution
main() {
    local ENV=$1
    
    echo -e "${BLUE}🚀 Intelligent Deployment Script${NC}"
    echo "================================="
    echo ""
    
    validate_environment $ENV
    echo ""
    
    check_environment_status
    echo ""
    
    validate_git_branch
    echo ""
    
    test_build_locally
    echo ""
    
    production_safety_checks
    echo ""
    
    # Deploy with error handling
    if deploy_to_eb; then
        echo ""
        verify_deployment
        echo ""
        run_performance_check
        echo ""
        post_deployment_actions
        echo ""
        
        log_success "🎉 Deployment to $ENV completed successfully!"
        
    else
        echo ""
        rollback_deployment
        exit 1
    fi
}

# Error handling
trap 'log_error "Deployment script failed at line $LINENO"' ERR

# Execute main function
main "$@"