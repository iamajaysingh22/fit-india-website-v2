#!/bin/bash

echo "🔍 Debugging AWS Elastic Beanstalk deployment..."

# Check if EB is available
if ! command -v eb &> /dev/null; then
    echo "❌ EB CLI not found. Please run './setup.sh' first"
    exit 1
fi

echo "📊 Environment Status:"
eb status

echo -e "\n📋 Environment Variables:"
eb printenv

echo -e "\n🏥 Health Status:"
eb health --refresh

echo -e "\n📜 Recent Logs (last 50 lines):"
eb logs --all | tail -50

echo -e "\n🌐 Testing URL accessibility:"
URL=$(eb status | grep "CNAME:" | awk '{print $2}')
if [ ! -z "$URL" ]; then
    echo "Testing: https://$URL"
    
    # Test HTTP response
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://$URL" -m 10)
    echo "HTTP Status Code: $HTTP_CODE"
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ URL is accessible"
    elif [ "$HTTP_CODE" = "502" ]; then
        echo "❌ 502 Bad Gateway - App is not responding on port 8081"
    elif [ "$HTTP_CODE" = "503" ]; then
        echo "❌ 503 Service Unavailable - App may be starting up"
    else
        echo "⚠️  Unexpected response code: $HTTP_CODE"
    fi
else
    echo "❌ Could not determine URL from eb status"
fi

echo -e "\n🔧 Configuration Check:"
echo "Checking critical files..."

# Check if build files exist
if [ -d ".next" ]; then
    echo "✅ .next directory exists (local build)"
    echo "   Size: $(du -sh .next | cut -f1)"
else
    echo "❌ .next directory missing - run 'npm run build'"
fi

# Check package.json scripts
if grep -q '"start":.*\$PORT' package.json; then
    echo "✅ package.json has correct start script with \$PORT"
else
    echo "❌ package.json start script issue"
    echo "   Should be: \"start\": \"next start -p \$PORT\""
fi

# Check ebextensions
if [ -d ".ebextensions" ]; then
    echo "✅ .ebextensions directory exists"
    echo "   Files: $(ls .ebextensions/ | tr '\n' ' ')"
else
    echo "❌ .ebextensions directory missing"
fi

echo -e "\n💡 Common fixes:"
echo "1. Check if Node.js app is running:"
echo "   eb ssh"
echo "   ps aux | grep node"
echo ""
echo "2. Check port 8081:"
echo "   eb ssh"
echo "   netstat -tlnp | grep 8081"
echo ""
echo "3. Check build files on server:"
echo "   eb ssh"
echo "   ls -la /var/app/current/.next"
echo ""
echo "4. Manual build test on server:"
echo "   eb ssh"
echo "   cd /var/app/current && npm run build"
echo ""
echo "5. Check nginx logs:"
echo "   eb ssh"
echo "   sudo tail -f /var/log/nginx/error.log"
echo ""
echo "6. Check application logs:"
echo "   eb logs --all"

echo -e "\n🔄 Quick fixes to try:"
echo "1. Redeploy: eb deploy"
echo "2. Restart environment: eb deploy --timeout 10"
echo "3. Rebuild environment: eb rebuild"

echo -e "\n📋 Environment Info:"
eb list
echo ""
echo "Platform: $(eb status | grep Platform | awk '{print $2}')"
echo "Region: $(eb status | grep Region | awk '{print $2}')"