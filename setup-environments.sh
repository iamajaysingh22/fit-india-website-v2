#!/bin/bash

echo "🏗️ Setting up AWS Elastic Beanstalk Environments"
echo "=================================================="

# Check if EB CLI is installed
if ! command -v eb &> /dev/null; then
    echo "❌ EB CLI is not installed. Please install it first:"
    echo "   pip install awsebcli"
    exit 1
fi

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI is not configured. Please run: aws configure"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Create TEST environment
echo "🧪 Creating TEST environment..."
echo "This will take 5-10 minutes..."
eb create test-fit-india-website \
  --cfg test-config \
  --instance_type t3.micro \
  --platform "64bit Amazon Linux 2023 v6.6.0 running Node.js 22" \
  --region ap-south-1

if [ $? -eq 0 ]; then
    echo "✅ TEST environment created successfully!"
    TEST_URL=$(eb status test-fit-india-website | grep "CNAME" | awk '{print $2}')
    echo "🌐 TEST URL: https://$TEST_URL"
else
    echo "❌ Failed to create TEST environment"
    exit 1
fi

echo ""

# Create DEVELOPMENT environment
echo "👩‍💻 Creating DEVELOPMENT environment..."
echo "This will take 5-10 minutes..."
eb create dev-fit-india-website \
  --cfg dev-config \
  --instance_type t3.micro \
  --platform "64bit Amazon Linux 2023 v6.6.0 running Node.js 22" \
  --region ap-south-1

if [ $? -eq 0 ]; then
    echo "✅ DEVELOPMENT environment created successfully!"
    DEV_URL=$(eb status dev-fit-india-website | grep "CNAME" | awk '{print $2}')
    echo "🌐 DEV URL: https://$DEV_URL"
else
    echo "❌ Failed to create DEVELOPMENT environment"
    exit 1
fi

echo ""

# Create PRODUCTION environment
echo "🌐 Creating PRODUCTION environment..."
echo "This will take 5-10 minutes..."
eb create prod-fit-india-website \
  --cfg prod-config \
  --instance_type t3.small \
  --platform "64bit Amazon Linux 2023 v6.6.0 running Node.js 22" \
  --region ap-south-1

if [ $? -eq 0 ]; then
    echo "✅ PRODUCTION environment created successfully!"
    PROD_URL=$(eb status prod-fit-india-website | grep "CNAME" | awk '{print $2}')
    echo "🌐 PROD URL: https://$PROD_URL"
else
    echo "❌ Failed to create PRODUCTION environment"
    exit 1
fi

echo ""
echo "🎉 All environments created successfully!"
echo "========================================"
echo "📝 Next steps:"
echo "1. Update environment URLs in environments/.env.* files"
echo "2. Test deployments: npm run deploy:test"
echo "3. Check environments: eb list"
echo ""
echo "🌐 Your environments:"
echo "   TEST: https://$TEST_URL"
echo "   DEV:  https://$DEV_URL"
echo "   PROD: https://$PROD_URL"