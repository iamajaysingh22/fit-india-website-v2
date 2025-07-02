#!/bin/bash
set -e

echo "🚀 Starting deployment to AWS Elastic Beanstalk..."

# Check if EB CLI is installed
if ! command -v eb &> /dev/null; then
    echo "❌ EB CLI not found. Please run './setup.sh' first"
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not in a git repository. Please run 'git init' first."
    echo "Then add your files: git add . && git commit -m 'Initial commit'"
    exit 1
fi

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "📝 Committing changes..."
    git add .
    git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || {
        echo "⚠️  No changes to commit or commit failed"
    }
fi

# Test build locally first
echo "🔨 Testing build locally..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed locally. Fix errors before deploying."
    echo "Common issues:"
    echo "- Missing dependencies: npm install"
    echo "- TypeScript errors: npm run lint"
    echo "- Environment variables missing"
    exit 1
fi

echo "✅ Build successful locally"
echo "📦 Build size:"
du -sh .next

# Check EB status
echo "🌍 Checking environment status..."
eb status

# Deploy to EB
echo "📤 Deploying to Elastic Beanstalk..."
echo "This may take 3-5 minutes..."

eb deploy --timeout 10

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    
    # Get the URL
    URL=$(eb status | grep "CNAME:" | awk '{print $2}')
    if [ ! -z "$URL" ]; then
        echo "🌐 Your app is live at: https://$URL"
        echo ""
        echo "🔍 Testing URL..."
        curl -I "https://$URL" -m 10 || echo "⚠️  URL might still be starting up"
        echo ""
    fi
    
    echo "📊 Environment status:"
    eb status
    
    echo ""
    echo "🎉 Deployment complete!"
    echo "🌐 Opening your app..."
    eb open
else
    echo "❌ Deployment failed!"
    echo ""
    echo "🔍 Checking logs for errors..."
    eb logs --all | tail -20
    echo ""
    echo "💡 Troubleshooting steps:"
    echo "1. Check logs: eb logs"
    echo "2. Check status: eb status"
    echo "3. Run debug script: ./debug.sh"
    echo "4. Check build locally: npm run build"
    exit 1
fi