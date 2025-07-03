#!/bin/bash
set -e

# Comprehensive Troubleshooting Tool for Elastic Beanstalk Environments
# Automated diagnosis and resolution of common issues

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
ENVIRONMENTS=("dev-fit-india-website" "test-fit-india-website" "prod-fit-india-website")
LOG_LINES=100

# Logging functions
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_debug() { echo -e "${PURPLE}[DEBUG]${NC} $1"; }

# Show usage
show_usage() {
    echo "Usage: $0 [environment] [options]"
    echo ""
    echo "Environments:"
    echo "  dev-fit-india-website   - Development environment"
    echo "  test-fit-india-website  - Test environment"
    echo "  prod-fit-india-website  - Production environment"
    echo ""
    echo "Options:"
    echo "  --quick      Quick health check"
    echo "  --detailed   Comprehensive analysis"
    echo "  --fix        Attempt automatic repairs"
    echo "  --logs       Show recent logs"
    echo "  --all        Check all environments"
    echo ""
    echo "Examples:"
    echo "  $0 dev-fit-india-website --detailed"
    echo "  $0 prod-fit-india-website --fix"
    echo "  $0 --all --quick"
}

# Validate environment
validate_environment() {
    local env=$1
    
    if [[ "$env" == "--all" ]]; then
        return 0
    fi
    
    if [[ ! " ${ENVIRONMENTS[@]} " =~ " ${env} " ]]; then
        log_error "Invalid environment: $env"
        show_usage
        exit 1
    fi
    
    if ! eb list | grep -q "$env"; then
        log_error "Environment '$env' does not exist"
        exit 1
    fi
}

# Quick health check
quick_health_check() {
    local env=$1
    
    log_info "🚀 Quick Health Check: $env"
    echo ""
    
    # Basic status
    local status=$(eb status $env | grep "Status:" | awk '{print $2}')
    local health=$(eb status $env | grep "Health:" | awk '{print $2}')
    
    echo "Status: $status"
    echo "Health: $health"
    
    case $health in
        "Green") log_success "Environment is healthy ✅" ;;
        "Yellow") log_warning "Environment has warnings ⚠️" ;;
        "Red") log_error "Environment has critical issues ❌" ;;
        *) log_warning "Unknown health status: $health" ;;
    esac
    
    # Quick URL test
    local url=$(eb status $env | grep "CNAME:" | awk '{print $2}')
    if [[ -n "$url" ]]; then
        log_info "Testing application accessibility..."
        if curl -f -s --max-time 10 "https://$url" > /dev/null; then
            log_success "Application is accessible"
        else
            log_error "Application is not accessible"
        fi
    fi
    
    echo ""
}

# Detailed analysis
detailed_analysis() {
    local env=$1
    
    log_info "🔍 Detailed Analysis: $env"
    echo "════════════════════════════════════════════════════════"
    
    # Environment information
    echo ""
    log_info "📊 Environment Information"
    eb status $env --verbose
    
    # Application health
    echo ""
    log_info "🏥 Application Health"
    eb health $env --refresh
    
    # Recent events
    echo ""
    log_info "📝 Recent Events"
    eb events $env | head -20
    
    # Configuration analysis
    echo ""
    log_info "⚙️ Configuration Analysis"
    analyze_configuration $env
    
    # Resource utilization
    echo ""
    log_info "📈 Resource Analysis"
    analyze_resources $env
    
    # Log analysis
    echo ""
    log_info "📋 Log Analysis"
    analyze_logs $env
    
    # Common issues check
    echo ""
    log_info "🔍 Common Issues Check"
    check_common_issues $env
    
    echo ""
    log_info "✅ Detailed analysis completed"
}

# Analyze configuration
analyze_configuration() {
    local env=$1
    
    # Check environment variables
    log_debug "Checking environment variables..."
    eb printenv $env | head -10
    
    # Check instance type
    local instance_type=$(eb status $env | grep "Instance Type" | awk '{print $3}' || echo "Unknown")
    log_debug "Instance Type: $instance_type"
    
    # Check platform version
    local platform=$(eb status $env | grep "Platform:" | cut -d: -f2 | xargs)
    log_debug "Platform: $platform"
    
    # Validate configuration files
    log_debug "Validating configuration files..."
    if [[ -d ".ebextensions" ]]; then
        log_debug "Found .ebextensions directory"
        find .ebextensions -name "*.config" | while read -r config_file; do
            log_debug "  Config: $config_file"
        done
    else
        log_warning "No .ebextensions directory found"
    fi
}

# Analyze resources
analyze_resources() {
    local env=$1
    
    # This would normally query CloudWatch metrics
    log_debug "Resource utilization analysis would show:"
    log_debug "  - CPU utilization trends"
    log_debug "  - Memory usage patterns"
    log_debug "  - Network I/O metrics"
    log_debug "  - Request count and latency"
    
    # Check scaling configuration
    local env_type=$(eb status $env | grep "Environment Type" | cut -d: -f2 | xargs)
    log_debug "Environment Type: $env_type"
    
    if [[ "$env_type" == "LoadBalanced" ]]; then
        log_debug "Auto-scaling is enabled"
    else
        log_debug "Single instance deployment"
    fi
}

# Analyze logs
analyze_logs() {
    local env=$1
    
    log_debug "Analyzing recent logs..."
    
    # Get recent logs
    local temp_log="/tmp/eb_logs_${env}_$(date +%s).log"
    eb logs $env --all > "$temp_log" 2>/dev/null || {
        log_warning "Could not retrieve logs"
        return
    }
    
    # Count error types
    local error_count=$(grep -i "error" "$temp_log" | wc -l | xargs)
    local warning_count=$(grep -i "warning" "$temp_log" | wc -l | xargs)
    
    log_debug "Found $error_count errors and $warning_count warnings in recent logs"
    
    # Show recent errors
    if [[ $error_count -gt 0 ]]; then
        log_warning "Recent errors:"
        grep -i "error" "$temp_log" | tail -5 | while read -r line; do
            echo "  $line"
        done
    fi
    
    # Clean up
    rm -f "$temp_log"
}

# Check common issues
check_common_issues() {
    local env=$1
    
    local issues_found=0
    
    # Check 1: 502 Bad Gateway
    log_debug "Checking for 502 Bad Gateway issues..."
    local url=$(eb status $env | grep "CNAME:" | awk '{print $2}')
    if [[ -n "$url" ]]; then
        local response_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://$url" || echo "000")
        if [[ "$response_code" == "502" ]]; then
            log_error "502 Bad Gateway detected"
            echo "  Possible causes:"
            echo "    - Application not starting properly"
            echo "    - Port configuration mismatch"
            echo "    - Application crashed"
            issues_found=$((issues_found + 1))
        fi
    fi
    
    # Check 2: Build failures
    log_debug "Checking for build failures..."
    if eb events $env | grep -q "build.*failed"; then
        log_error "Build failures detected"
        echo "  Check deployment logs for build errors"
        issues_found=$((issues_found + 1))
    fi
    
    # Check 3: Memory issues
    log_debug "Checking for memory issues..."
    if eb events $env | grep -i "memory"; then
        log_warning "Memory-related events found"
        echo "  Consider upgrading instance type or optimizing memory usage"
        issues_found=$((issues_found + 1))
    fi
    
    # Check 4: SSL/TLS issues
    log_debug "Checking SSL configuration..."
    if [[ -n "$url" ]]; then
        if ! openssl s_client -connect "$url:443" -servername "$url" </dev/null 2>/dev/null | grep -q "Verify return code: 0"; then
            log_warning "SSL certificate issues detected"
            issues_found=$((issues_found + 1))
        fi
    fi
    
    # Check 5: Configuration validation
    log_debug "Checking configuration validation..."
    if eb events $env | grep -q "configuration.*failed"; then
        log_error "Configuration validation failures"
        echo "  Check .ebextensions files for syntax errors"
        issues_found=$((issues_found + 1))
    fi
    
    if [[ $issues_found -eq 0 ]]; then
        log_success "No common issues detected"
    else
        log_warning "Found $issues_found potential issues"
    fi
}

# Automatic fixes
attempt_automatic_fixes() {
    local env=$1
    
    log_info "🔧 Attempting Automatic Fixes: $env"
    echo "════════════════════════════════════════════════════════"
    
    local fixes_applied=0
    
    # Fix 1: Restart application
    log_info "Restarting application..."
    if eb restart $env; then
        log_success "Application restarted"
        fixes_applied=$((fixes_applied + 1))
    else
        log_error "Failed to restart application"
    fi
    
    # Fix 2: Rebuild environment (if issues persist)
    local health=$(eb status $env | grep "Health:" | awk '{print $2}')
    if [[ "$health" == "Red" ]]; then
        log_warning "Environment health is Red. Consider rebuilding..."
        read -p "Rebuild environment? This will cause downtime (y/N): " rebuild_confirm
        if [[ $rebuild_confirm == [yY] ]]; then
            log_info "Rebuilding environment..."
            if eb rebuild $env; then
                log_success "Environment rebuilt"
                fixes_applied=$((fixes_applied + 1))
            else
                log_error "Failed to rebuild environment"
            fi
        fi
    fi
    
    # Fix 3: Clear application cache (if applicable)
    log_info "Clearing application caches..."
    # This would depend on your application's cache implementation
    log_debug "Cache clearing would be application-specific"
    
    if [[ $fixes_applied -gt 0 ]]; then
        log_success "Applied $fixes_applied fixes"
        log_info "Waiting for changes to take effect..."
        sleep 30
        
        # Re-check health
        local new_health=$(eb status $env | grep "Health:" | awk '{print $2}')
        log_info "New health status: $new_health"
    else
        log_warning "No automatic fixes were applied"
    fi
}

# Show logs
show_logs() {
    local env=$1
    
    log_info "📋 Recent Logs: $env"
    echo "════════════════════════════════════════════════════════"
    
    # Show different log types
    echo ""
    log_info "Application Logs:"
    eb logs $env | grep -E "(ERROR|WARN|error|warn)" | tail -$LOG_LINES || log_warning "No application logs available"
    
    echo ""
    log_info "Web Server Logs:"
    eb logs $env --all | grep -E "nginx|apache" | tail -10 || log_debug "No web server logs in recent output"
    
    echo ""
    log_info "Deployment Logs:"
    eb events $env | head -20
}

# Process all environments
process_all_environments() {
    local mode=$1
    
    log_info "🌐 Processing All Environments"
    echo "════════════════════════════════════════════════════════"
    
    for env in "${ENVIRONMENTS[@]}"; do
        if eb list | grep -q "$env"; then
            echo ""
            case $mode in
                "quick") quick_health_check "$env" ;;
                "detailed") detailed_analysis "$env" ;;
                "logs") show_logs "$env" ;;
                *) quick_health_check "$env" ;;
            esac
        else
            log_warning "Environment $env does not exist"
        fi
    done
}

# Generate troubleshooting report
generate_report() {
    local env=$1
    local report_file="troubleshoot_report_${env}_$(date +%Y%m%d_%H%M%S).txt"
    
    log_info "📄 Generating troubleshooting report..."
    
    {
        echo "Troubleshooting Report for $env"
        echo "Generated on: $(date)"
        echo "========================================"
        echo ""
        
        echo "Environment Status:"
        eb status $env
        echo ""
        
        echo "Environment Health:"
        eb health $env
        echo ""
        
        echo "Recent Events:"
        eb events $env | head -20
        echo ""
        
        echo "Configuration:"
        eb printenv $env
        echo ""
        
    } > "$report_file"
    
    log_success "Report saved to: $report_file"
}

# Main execution
main() {
    local env=""
    local mode="quick"
    local generate_report_flag=false
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --quick) mode="quick"; shift ;;
            --detailed) mode="detailed"; shift ;;
            --fix) mode="fix"; shift ;;
            --logs) mode="logs"; shift ;;
            --all) env="--all"; shift ;;
            --report) generate_report_flag=true; shift ;;
            --help) show_usage; exit 0 ;;
            -*) log_error "Unknown option: $1"; show_usage; exit 1 ;;
            *) env="$1"; shift ;;
        esac
    done
    
    echo -e "${BLUE}🔧 Elastic Beanstalk Troubleshooting Tool${NC}"
    echo "════════════════════════════════════════════════════════"
    echo "$(date)"
    echo ""
    
    # Check prerequisites
    if ! command -v eb >/dev/null 2>&1; then
        log_error "EB CLI not found. Please install it first."
        exit 1
    fi
    
    # Handle no environment specified
    if [[ -z "$env" ]]; then
        log_error "Environment not specified"
        show_usage
        exit 1
    fi
    
    # Validate environment
    validate_environment "$env"
    
    # Execute based on mode
    if [[ "$env" == "--all" ]]; then
        process_all_environments "$mode"
    else
        case $mode in
            "quick") quick_health_check "$env" ;;
            "detailed") detailed_analysis "$env" ;;
            "fix") attempt_automatic_fixes "$env" ;;
            "logs") show_logs "$env" ;;
            *) quick_health_check "$env" ;;
        esac
        
        # Generate report if requested
        if [[ "$generate_report_flag" == true ]]; then
            generate_report "$env"
        fi
    fi
    
    echo ""
    log_success "🎉 Troubleshooting completed!"
    
    # Provide next steps
    echo ""
    log_info "💡 Next Steps:"
    if [[ "$mode" == "quick" ]]; then
        echo "  • For detailed analysis: $0 $env --detailed"
    fi
    if [[ "$mode" != "fix" ]]; then
        echo "  • To attempt fixes: $0 $env --fix"
    fi
    echo "  • View logs: $0 $env --logs"
    echo "  • Generate report: $0 $env --report"
    echo "  • Deploy latest: ./scripts/deploy-to-env.sh ${env//-fit-india-website/}"
}

# Error handling
trap 'log_error "Troubleshooting script failed at line $LINENO"' ERR

# Execute main function
main "$@"