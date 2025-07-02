#!/bin/bash

# Elastic Beanstalk Deployment Script for Next.js App
# This script helps ensure proper deployment and troubleshooting

echo "🚀 Starting Elastic Beanstalk deployment..."

# Check if EB CLI is installed
if ! command -v eb &> /dev/null; then
    echo "❌ EB CLI not found. Please install it first:"
    echo "pip install awsebcli"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

# Clean up any previous builds
echo "🧹 Cleaning up previous builds..."
rm -rf .next/
rm -rf node_modules/

# Install dependencies and build locally to verify
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies."
    exit 1
fi

# Build the application locally to check for errors
echo "🔧 Building application locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Local build failed. Please fix build errors before deploying."
    exit 1
fi

echo "✅ Local build successful!"

# Clean up local build for deployment (EB will rebuild)
echo "🧹 Cleaning local build for deployment..."
rm -rf .next/
rm -rf node_modules/

# Deploy to Elastic Beanstalk
echo "🚀 Deploying to Elastic Beanstalk..."
eb deploy

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "⏳ Waiting for application to start..."
    sleep 30
    echo "🔍 Checking application health..."
    eb health
    echo ""
    echo "📝 Useful commands for troubleshooting:"
    echo "  eb logs                    - View application logs"
    echo "  eb health                  - Check application health"
    echo "  eb status                  - Check environment status"
    echo "  eb open                    - Open application in browser"
    echo "  eb ssh                     - SSH into EC2 instance"
    echo ""
    echo "🔍 Testing health endpoint..."
    APP_URL=$(eb status | grep "CNAME" | awk '{print $2}')
    if [ ! -z "$APP_URL" ]; then
        echo "Testing: https://$APP_URL/api/health"
        curl -s "https://$APP_URL/api/health" | jq . || echo "Health endpoint test failed"
    fi
else
    echo "❌ Deployment failed!"
    echo "🔍 Checking logs for errors..."
    eb logs
    exit 1
fi
