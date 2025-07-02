#!/bin/bash
set -e

echo "🔧 Fixing Node.js 22 deployment issues..."

# Check if EB is available
if ! command -v eb &> /dev/null; then
    echo "❌ EB CLI not found. Please run './setup.sh' first"
    exit 1
fi

echo "📋 Current environment info:"
eb status || echo "No environment found"

echo ""
echo "🔄 Updating environment to Node.js 22..."

# Option 1: Try to update the platform version
echo "Attempting to update platform version..."
eb platform select "64bit Amazon Linux 2023 v6.6.0 running Node.js 22" || echo "Platform update failed"

# Set environment variables for Node.js 22
echo "🔧 Setting environment variables..."
eb setenv \
  NODE_ENV=production \
  PORT=8081 \
  NPM_USE_PRODUCTION=false \
  NODE_OPTIONS="--max-old-space-size=4096"

echo ""
echo "✅ Configuration updated!"
echo ""
echo "💡 If deployment still fails, you may need to:"
echo "1. Terminate current environment: eb terminate"
echo "2. Recreate with Node.js 22: ./setup.sh"
echo "3. Deploy: ./deploy.sh"
echo ""
echo "🚀 Try deploying now: ./deploy.sh"