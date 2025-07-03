#!/bin/bash
set -e

# Complete Three Elastic Beanstalk Environments Setup
# Automated Development, Test, and Production Pipeline for Fit India Website

# Color codes for better UX
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="fit-india-website"
REGION="ap-south-1"
KEYPAIR_NAME="fit-india-website-keypair"

echo -e "${BLUE}🏗️  Setting up Three Elastic Beanstalk Environments${NC}"
echo "=================================================="
echo -e "${CYAN}Project: ${PROJECT_NAME}${NC}"
echo -e "${CYAN}Region: ${REGION}${NC}"
echo ""

# Logging function
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if we're in the right directory
    if [[ ! -f "package.json" ]]; then
        log_error "package.json not found. Please run this script from the project root directory."
        exit 1
    fi
    
    # Check AWS CLI
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is not installed. Please install it first:"
        echo "  curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o 'awscliv2.zip'"
        echo "  unzip awscliv2.zip"
        echo "  sudo ./aws/install"
        exit 1
    fi
    
    # Check EB CLI
    if ! command -v eb &> /dev/null; then
        log_warning "EB CLI not found. Installing..."
        pip3 install awsebcli --upgrade --user || {
            log_error "Failed to install EB CLI. Please install manually:"
            echo "  pip3 install awsebcli --upgrade --user"
            exit 1
        }
    fi
    
    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS credentials not configured. Please run: aws configure"
        exit 1
    fi
    
    # Check Node.js version
    if ! command -v node &> /dev/null; then
        log_error "Node.js not found. Please install Node.js 22 or later."
        exit 1
    fi
    
    local node_version=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$node_version" -lt 22 ]; then
        log_error "Node.js version 22 or later required. Current version: $(node --version)"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Initialize EB application
initialize_eb_application() {
    log_info "Initializing Elastic Beanstalk application..."
    
    if [[ ! -d ".elasticbeanstalk" ]]; then
        log_info "Initializing new EB application..."
        eb init ${PROJECT_NAME} --platform "Node.js 22 running on 64bit Amazon Linux 2023" --region ${REGION}
    else
        log_info "EB application already initialized"
    fi
    
    log_success "EB application initialized"
}

# Create SSH keypair
create_ssh_keypair() {
    log_info "Setting up SSH keypair..."
    
    # Check if keypair already exists
    if aws ec2 describe-key-pairs --key-names ${KEYPAIR_NAME} --region ${REGION} &> /dev/null; then
        log_info "SSH keypair '${KEYPAIR_NAME}' already exists"
    else
        log_info "Creating SSH keypair '${KEYPAIR_NAME}'..."
        aws ec2 create-key-pair --key-name ${KEYPAIR_NAME} --region ${REGION} --query 'KeyMaterial' --output text > ~/.ssh/${KEYPAIR_NAME}.pem
        chmod 600 ~/.ssh/${KEYPAIR_NAME}.pem
        log_success "SSH keypair created and saved to ~/.ssh/${KEYPAIR_NAME}.pem"
    fi
}

# Setup Git branches
setup_git_branches() {
    log_info "Setting up Git branches..."
    
    # Get current branch
    current_branch=$(git branch --show-current)
    log_info "Current branch: ${current_branch}"
    
    # Create development branch if it doesn't exist
    if ! git show-ref --verify --quiet refs/heads/development; then
        log_info "Creating development branch..."
        git checkout -b development
        git push -u origin development
    else
        log_info "Development branch already exists"
    fi
    
    # Create test branch if it doesn't exist
    if ! git show-ref --verify --quiet refs/heads/test; then
        log_info "Creating test branch..."
        git checkout -b test
        git push -u origin test
    else
        log_info "Test branch already exists"
    fi
    
    # Switch back to main
    git checkout main
    
    log_success "Git branches configured"
}

# Create environment
create_environment() {
    local env_name=$1
    local instance_type=$2
    local environment_type=$3
    local node_env=$4
    local branch=$5
    
    log_info "Creating environment: ${env_name}"
    echo "  Instance Type: ${instance_type}"
    echo "  Environment Type: ${environment_type}"
    echo "  Node Environment: ${node_env}"
    echo "  Git Branch: ${branch}"
    
    # Check if environment already exists
    if eb list | grep -q "${env_name}"; then
        log_warning "Environment '${env_name}' already exists. Skipping creation."
        return 0
    fi
    
    # Switch to appropriate branch
    git checkout ${branch}
    
    # Create environment
    local create_cmd="eb create ${env_name} --instance_type ${instance_type} --region ${REGION}"
    
    if [[ "${environment_type}" == "SingleInstance" ]]; then
        create_cmd="${create_cmd} --single"
    fi
    
    log_info "Executing: ${create_cmd}"
    
    # Create environment with timeout
    timeout 1800 ${create_cmd} || {
        log_error "Environment creation timed out or failed for ${env_name}"
        return 1
    }
    
    # Wait for environment to be ready
    log_info "Waiting for environment to be ready..."
    eb status ${env_name} --verbose
    
    log_success "Environment '${env_name}' created successfully"
    
    # Get environment URL
    local env_url=$(eb status ${env_name} | grep "CNAME" | awk '{print $2}')
    if [[ -n "${env_url}" ]]; then
        log_success "Environment URL: https://${env_url}"
    fi
}

# Deploy health check endpoint
deploy_health_check() {
    log_info "Setting up health check endpoint..."
    
    # Create health check API endpoint
    mkdir -p src/pages/api
    cat > src/pages/api/health.js << 'EOF'
export default function handler(req, res) {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0'
  };
  
  try {
    res.status(200).json(healthCheck);
  } catch (error) {
    healthCheck.message = error;
    res.status(503).json(healthCheck);
  }
}
EOF
    
    log_success "Health check endpoint created at /api/health"
}

# Update environment URLs in config files
update_environment_urls() {
    log_info "Updating environment URLs in configuration files..."
    
    # Get environment URLs
    local dev_url=$(eb status dev-fit-india-website 2>/dev/null | grep "CNAME" | awk '{print $2}' || echo "dev-fit-india-website.ap-south-1.elasticbeanstalk.com")
    local test_url=$(eb status test-fit-india-website 2>/dev/null | grep "CNAME" | awk '{print $2}' || echo "test-fit-india-website.ap-south-1.elasticbeanstalk.com")
    local prod_url=$(eb status prod-fit-india-website 2>/dev/null | grep "CNAME" | awk '{print $2}' || echo "prod-fit-india-website.ap-south-1.elasticbeanstalk.com")
    
    # Update environment files
    sed -i.bak "s|NEXT_PUBLIC_APP_URL=.*|NEXT_PUBLIC_APP_URL=https://${dev_url}|g" environments/.env.development
    sed -i.bak "s|NEXT_PUBLIC_APP_URL=.*|NEXT_PUBLIC_APP_URL=https://${test_url}|g" environments/.env.test
    sed -i.bak "s|NEXT_PUBLIC_APP_URL=.*|NEXT_PUBLIC_APP_URL=https://${prod_url}|g" environments/.env.production
    
    # Update EB extension configs
    sed -i.bak "s|NEXT_PUBLIC_APP_URL:.*|NEXT_PUBLIC_APP_URL: https://${dev_url}|g" .ebextensions/dev/01-dev-node.config
    sed -i.bak "s|NEXT_PUBLIC_APP_URL:.*|NEXT_PUBLIC_APP_URL: https://${test_url}|g" .ebextensions/test/01-test-node.config
    sed -i.bak "s|NEXT_PUBLIC_APP_URL:.*|NEXT_PUBLIC_APP_URL: https://${prod_url}|g" .ebextensions/production/01-prod-node.config
    
    # Clean up backup files
    find . -name "*.bak" -delete
    
    log_success "Environment URLs updated"
}

# Generate deployment summary
generate_summary() {
    log_info "Generating deployment summary..."
    
    echo ""
    echo -e "${GREEN}🎉 Environment Setup Complete!${NC}"
    echo "=================================="
    
    echo ""
    echo -e "${CYAN}📊 Environment Summary:${NC}"
    
    if eb list | grep -q "dev-fit-india-website"; then
        local dev_status=$(eb status dev-fit-india-website 2>/dev/null | grep "Status:" | awk '{print $2}' || echo "Unknown")
        local dev_url=$(eb status dev-fit-india-website 2>/dev/null | grep "CNAME" | awk '{print $2}' || echo "Not available")
        echo -e "  ${YELLOW}🔧 Development:${NC}"
        echo -e "     Environment: dev-fit-india-website"
        echo -e "     Status: ${dev_status}"
        echo -e "     URL: https://${dev_url}"
        echo -e "     Branch: development"
    fi
    
    if eb list | grep -q "test-fit-india-website"; then
        local test_status=$(eb status test-fit-india-website 2>/dev/null | grep "Status:" | awk '{print $2}' || echo "Unknown")
        local test_url=$(eb status test-fit-india-website 2>/dev/null | grep "CNAME" | awk '{print $2}' || echo "Not available")
        echo -e "  ${BLUE}🧪 Test:${NC}"
        echo -e "     Environment: test-fit-india-website"
        echo -e "     Status: ${test_status}"
        echo -e "     URL: https://${test_url}"
        echo -e "     Branch: test"
    fi
    
    if eb list | grep -q "prod-fit-india-website"; then
        local prod_status=$(eb status prod-fit-india-website 2>/dev/null | grep "Status:" | awk '{print $2}' || echo "Unknown")
        local prod_url=$(eb status prod-fit-india-website 2>/dev/null | grep "CNAME" | awk '{print $2}' || echo "Not available")
        echo -e "  ${GREEN}🌐 Production:${NC}"
        echo -e "     Environment: prod-fit-india-website"
        echo -e "     Status: ${prod_status}"
        echo -e "     URL: https://${prod_url}"
        echo -e "     Branch: main"
    fi
    
    echo ""
    echo -e "${CYAN}🚀 Next Steps:${NC}"
    echo "  1. Test deployments:"
    echo "     ./scripts/deploy-to-env.sh development"
    echo "     ./scripts/deploy-to-env.sh test"
    echo "     ./scripts/deploy-to-env.sh production"
    echo ""
    echo "  2. Check environment status:"
    echo "     ./scripts/check-all-envs.sh"
    echo ""
    echo "  3. Monitor applications:"
    echo "     eb logs dev-fit-india-website"
    echo "     eb logs test-fit-india-website"
    echo "     eb logs prod-fit-india-website"
    echo ""
    echo -e "${GREEN}✨ Setup completed successfully!${NC}"
}

# Main execution function
main() {
    log_info "Starting automated three-environment setup..."
    echo ""
    
    # Check if user wants to proceed
    read -p "This will create three AWS Elastic Beanstalk environments. Continue? (y/N): " confirm
    if [[ $confirm != [yY] && $confirm != [yY][eE][sS] ]]; then
        log_info "Setup cancelled by user."
        exit 0
    fi
    
    check_prerequisites
    echo ""
    
    initialize_eb_application
    echo ""
    
    create_ssh_keypair
    echo ""
    
    setup_git_branches
    echo ""
    
    deploy_health_check
    echo ""
    
    # Create environments
    log_info "Creating environments (this will take 15-45 minutes)..."
    
    # Create development environment
    create_environment "dev-fit-india-website" "t3.micro" "SingleInstance" "development" "development"
    echo ""
    
    # Create test environment
    create_environment "test-fit-india-website" "t3.small" "SingleInstance" "test" "test"
    echo ""
    
    # Create production environment
    create_environment "prod-fit-india-website" "t3.medium" "LoadBalanced" "production" "main"
    echo ""
    
    update_environment_urls
    echo ""
    
    generate_summary
}

# Error handling
trap 'log_error "Script failed at line $LINENO. Exit code: $?"' ERR

# Execute main function
main "$@"