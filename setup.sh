#!/bin/bash
set -e

echo "🏗️  Setting up AWS Elastic Beanstalk for fitness app..."

# Check prerequisites
echo "Checking prerequisites..."

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install it first."
    echo "Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check EB CLI
if ! command -v eb &> /dev/null; then
    echo "❌ EB CLI not found. Installing..."
    pip install awsebcli --upgrade --user
    
    # Add to PATH if not already there
    if ! command -v eb &> /dev/null; then
        echo "⚠️  Please add EB CLI to your PATH:"
        echo "export PATH=\$PATH:\$HOME/.local/bin"
        echo "Then run this script again."
        exit 1
    fi
fi

# Check if AWS is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS not configured. Please run 'aws configure' first."
    echo "You'll need:"
    echo "- AWS Access Key ID"
    echo "- AWS Secret Access Key"
    echo "- Default region (e.g., ap-south-1)"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js version $NODE_VERSION detected. Recommended: Node.js 18+"
fi

# Initialize EB if not already done
if [ ! -d ".elasticbeanstalk" ]; then
    echo "🔧 Initializing Elastic Beanstalk..."
    eb init --platform "Node.js 22 running on 64bit Amazon Linux 2023" --region ap-south-1 fit-india-website-v2
fi

# Create environment if not exists
echo "🌍 Checking for existing environment..."
if ! eb list | grep -q "fitness-app-production"; then
    echo "🏗️  Creating production environment..."
    eb create fitness-app-production \
        --instance-type t3.medium \
        --platform "64bit Amazon Linux 2023 v6.6.0 running Node.js 22" \
        --envvars NODE_ENV=production,PORT=8081,NPM_USE_PRODUCTION=false
    
    echo "✅ Environment created successfully!"
else
    echo "✅ Environment already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run './deploy.sh' to deploy your app"
echo "2. Run './debug.sh' if you encounter issues"
echo ""
echo "Useful commands:"
echo "- eb status    # Check environment status"
echo "- eb logs      # View application logs"
echo "- eb open      # Open app in browser"