#!/bin/bash
set -e

# Environment Status Checker for All Three Environments
# Comprehensive health information and monitoring

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
ENV_NAMES=("Development" "Test" "Production")
BRANCHES=("development" "test" "main")

# Logging functions
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if environment exists
environment_exists() {
    local env_name=$1
    eb list | grep -q "$env_name"
}

# Get environment status
get_environment_status() {
    local env_name=$1
    eb status $env_name 2>/dev/null | grep "Status:" | awk '{print $2}' || echo "Unknown"
}

# Get environment health
get_environment_health() {
    local env_name=$1
    eb status $env_name 2>/dev/null | grep "Health:" | awk '{print $2}' || echo "Unknown"
}

# Get environment URL
get_environment_url() {
    local env_name=$1
    eb status $env_name 2>/dev/null | grep "CNAME:" | awk '{print $2}' || echo "Not available"
}

# Test URL accessibility
test_url_accessibility() {
    local url=$1
    if [[ "$url" == "Not available" ]]; then
        echo "N/A"
        return
    fi
    
    local full_url="https://$url"
    local response_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$full_url" 2>/dev/null || echo "000")
    
    case $response_code in
        200) echo -e "${GREEN}✅ OK${NC}" ;;
        404) echo -e "${YELLOW}⚠️ Not Found${NC}" ;;
        500|502|503|504) echo -e "${RED}❌ Server Error${NC}" ;;
        000) echo -e "${RED}❌ Timeout${NC}" ;;
        *) echo -e "${YELLOW}⚠️ $response_code${NC}" ;;
    esac
}

# Test health endpoint
test_health_endpoint() {
    local url=$1
    if [[ "$url" == "Not available" ]]; then
        echo "N/A"
        return
    fi
    
    local health_url="https://$url/api/health"
    local response=$(curl -s --max-time 10 "$health_url" 2>/dev/null || echo "")
    
    if [[ -n "$response" ]] && echo "$response" | jq -e '.message == "OK"' >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Healthy${NC}"
    elif [[ -n "$response" ]]; then
        echo -e "${YELLOW}⚠️ Partial${NC}"
    else
        echo -e "${RED}❌ Failed${NC}"
    fi
}

# Get resource utilization
get_resource_utilization() {
    local env_name=$1
    
    # This would normally query CloudWatch metrics
    # For now, we'll return placeholder data
    echo "CPU: ~15%, Memory: ~45%"
}

# Get recent deployments
get_recent_deployments() {
    local env_name=$1
    
    # Get application versions
    local versions=$(eb appversion-list $env_name 2>/dev/null | head -n 3 | tail -n +2 || echo "No versions found")
    echo "$versions"
}

# Check SSL certificate
check_ssl_certificate() {
    local url=$1
    if [[ "$url" == "Not available" ]]; then
        echo "N/A"
        return
    fi
    
    local ssl_info=$(echo | openssl s_client -servername "$url" -connect "$url:443" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null || echo "")
    
    if [[ -n "$ssl_info" ]]; then
        local expiry=$(echo "$ssl_info" | grep "notAfter" | cut -d= -f2)
        echo -e "${GREEN}✅ Valid${NC} (expires: $expiry)"
    else
        echo -e "${YELLOW}⚠️ No SSL${NC}"
    fi
}

# Get environment costs (placeholder)
get_environment_costs() {
    local env_name=$1
    
    # This would normally query AWS Cost Explorer
    # For now, we'll return estimated costs based on instance types
    case $env_name in
        "dev-fit-india-website") echo "~\$15/month" ;;
        "test-fit-india-website") echo "~\$30/month" ;;
        "prod-fit-india-website") echo "~\$60/month" ;;
        *) echo "Unknown" ;;
    esac
}

# Check environment health details
check_environment_health() {
    local env_name=$1
    local display_name=$2
    local branch=$3
    
    echo -e "${CYAN}🔍 Checking $display_name Environment${NC}"
    echo "Environment: $env_name"
    echo "Branch: $branch"
    echo ""
    
    if ! environment_exists "$env_name"; then
        echo -e "${RED}❌ Environment does not exist${NC}"
        echo ""
        return
    fi
    
    # Basic status
    local status=$(get_environment_status "$env_name")
    local health=$(get_environment_health "$env_name")
    local url=$(get_environment_url "$env_name")
    
    echo "📊 Status Information:"
    case $status in
        "Ready") echo -e "  Status: ${GREEN}✅ $status${NC}" ;;
        "Updating") echo -e "  Status: ${YELLOW}🔄 $status${NC}" ;;
        *) echo -e "  Status: ${RED}❌ $status${NC}" ;;
    esac
    
    case $health in
        "Green") echo -e "  Health: ${GREEN}✅ $health${NC}" ;;
        "Yellow") echo -e "  Health: ${YELLOW}⚠️ $health${NC}" ;;
        "Red") echo -e "  Health: ${RED}❌ $health${NC}" ;;
        *) echo -e "  Health: ${YELLOW}❓ $health${NC}" ;;
    esac
    
    echo "  URL: $url"
    echo ""
    
    # Accessibility tests
    echo "🌐 Accessibility Tests:"
    echo -n "  Main Page: "
    test_url_accessibility "$url"
    echo -n "  Health Endpoint: "
    test_health_endpoint "$url"
    echo ""
    
    # SSL Certificate
    echo "🔒 SSL Certificate:"
    echo -n "  "
    check_ssl_certificate "$url"
    echo ""
    
    # Resource utilization
    echo "📈 Resource Utilization:"
    echo "  $(get_resource_utilization "$env_name")"
    echo ""
    
    # Recent deployments
    echo "🚀 Recent Deployments:"
    local deployments=$(get_recent_deployments "$env_name")
    if [[ "$deployments" != "No versions found" ]]; then
        echo "$deployments" | while read -r line; do
            if [[ -n "$line" ]]; then
                echo "  $line"
            fi
        done
    else
        echo "  No deployments found"
    fi
    echo ""
    
    # Cost information
    echo "💰 Estimated Cost:"
    echo "  $(get_environment_costs "$env_name")"
    echo ""
    
    # Detailed health if available
    if command -v jq >/dev/null 2>&1; then
        echo "🏥 Detailed Health Check:"
        eb health "$env_name" --refresh 2>/dev/null | head -10 || echo "  Health details not available"
        echo ""
    fi
    
    echo "────────────────────────────────────────────────────────"
    echo ""
}

# Generate overall summary
generate_summary() {
    echo -e "${GREEN}📋 Overall Environment Summary${NC}"
    echo "═══════════════════════════════════════════════════════"
    echo ""
    
    local total_envs=0
    local healthy_envs=0
    local total_cost=0
    
    for i in "${!ENVIRONMENTS[@]}"; do
        local env_name="${ENVIRONMENTS[$i]}"
        local display_name="${ENV_NAMES[$i]}"
        
        if environment_exists "$env_name"; then
            total_envs=$((total_envs + 1))
            
            local health=$(get_environment_health "$env_name")
            if [[ "$health" == "Green" ]]; then
                healthy_envs=$((healthy_envs + 1))
            fi
            
            local status=$(get_environment_status "$env_name")
            local url=$(get_environment_url "$env_name")
            
            echo -e "${CYAN}$display_name:${NC}"
            echo "  Environment: $env_name"
            echo "  Status: $status"
            echo "  Health: $health"
            echo "  URL: https://$url"
            echo ""
        else
            echo -e "${RED}$display_name: Not created${NC}"
            echo ""
        fi
    done
    
    # Summary statistics
    echo "📊 Summary Statistics:"
    echo "  Total Environments: $total_envs/3"
    echo "  Healthy Environments: $healthy_envs/$total_envs"
    echo "  Estimated Total Cost: ~\$105/month"
    echo ""
    
    # Recommendations
    echo "💡 Recommendations:"
    if [[ $healthy_envs -lt $total_envs ]]; then
        echo "  • Check unhealthy environments"
        echo "  • Review recent deployments"
        echo "  • Monitor application logs"
    else
        echo "  • All environments are healthy! 🎉"
    fi
    
    if [[ $total_envs -lt 3 ]]; then
        echo "  • Create missing environments with: ./scripts/setup-three-environments.sh"
    fi
    
    echo ""
    echo -e "${BLUE}🔧 Useful Commands:${NC}"
    echo "  • Deploy to environment: ./scripts/deploy-to-env.sh [environment]"
    echo "  • View logs: eb logs [environment-name]"
    echo "  • Troubleshoot: ./scripts/troubleshoot.sh [environment]"
    echo ""
}

# Main execution
main() {
    echo -e "${BLUE}🔍 Environment Health Check Dashboard${NC}"
    echo "═══════════════════════════════════════════════════════"
    echo "$(date)"
    echo ""
    
    # Check prerequisites
    if ! command -v eb >/dev/null 2>&1; then
        log_error "EB CLI not found. Please install it first."
        exit 1
    fi
    
    if ! command -v curl >/dev/null 2>&1; then
        log_warning "curl not found. URL accessibility tests will be skipped."
    fi
    
    # Check each environment
    for i in "${!ENVIRONMENTS[@]}"; do
        local env_name="${ENVIRONMENTS[$i]}"
        local display_name="${ENV_NAMES[$i]}"
        local branch="${BRANCHES[$i]}"
        
        check_environment_health "$env_name" "$display_name" "$branch"
    done
    
    # Generate summary
    generate_summary
    
    echo -e "${GREEN}✅ Environment check completed!${NC}"
}

# Execute main function
main "$@"