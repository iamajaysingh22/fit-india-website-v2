#!/bin/bash

echo "🔧 Setting environment variables for production..."

# Check if EB is available
if ! command -v eb &> /dev/null; then
    echo "❌ EB CLI not found. Please run './setup.sh' first"
    exit 1
fi

# Get current URL
URL=$(eb status | grep "CNAME:" | awk '{print $2}')

if [ -z "$URL" ]; then
    echo "❌ Could not determine app URL. Make sure environment is created."
    exit 1
fi

echo "🌐 Setting up environment variables for: https://$URL"

eb setenv \
  NODE_ENV=production \
  PORT=8081 \
  NPM_USE_PRODUCTION=false \
  NEXT_PUBLIC_APP_URL=https://$URL \
  NEXT_PUBLIC_API_URL=https://$URL/api

if [ $? -eq 0 ]; then
    echo "✅ Environment variables set successfully!"
    echo ""
    echo "📋 Current variables:"
    eb printenv
    echo ""
    echo "⚠️  Note: App will restart to apply new environment variables"
    echo "🔄 Restart usually takes 1-2 minutes"
else
    echo "❌ Failed to set environment variables"
    echo "💡 Try running: eb status"
    echo "   to check if environment is healthy"
fi