# Deployment Guide - AWS Elastic Beanstalk

## Prerequisites

1. **AWS CLI** installed and configured
2. **EB CLI** installed (`pip install awsebcli`)
3. **Node.js 18+** and npm

## Deployment Steps

### 1. Initialize Elastic Beanstalk (First time only)

```bash
eb init
```

Select:
- **Platform**: Node.js
- **Platform version**: Node.js 18 running on 64bit Amazon Linux 2
- **Application name**: fit-india-website
- **Environment name**: fit-india-website-prod

### 2. Set Environment Variables in EB Console

Go to AWS EB Console → Configuration → Environment Properties and add:

```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api
NEXT_PUBLIC_GA_ID=your-ga-id
CONTACT_FORM_EMAIL=contact@fitindia.com
SENDGRID_API_KEY=your-sendgrid-key
```

### 3. Deploy Application

```bash
# Build locally to test
npm run build

# Deploy to EB
eb deploy
```

### 4. Check Deployment Status

```bash
eb status
eb logs
eb open
```

## Configuration Files Included

- **`.ebextensions/nodejs.config`**: Environment variables configuration
- **`.platform/hooks/prebuild/01_node_install.sh`**: Build script that runs before deployment
- **`.platform/hooks/postdeploy/01_restart_app.sh`**: Post-deployment script for permissions
- **`.platform/nginx/conf.d/default.conf`**: Nginx configuration for caching and compression
- **`Procfile`**: Specifies the start command for the application
- **`.ebignore`**: Files to exclude from deployment
- **`package.json`**: Proper start script with PORT variable

## Common Issues & Solutions

### 1. Configuration Validation Error
- **Issue**: `Unknown or duplicate parameter: NodeVersion` or `NodeCommand`
- **Solution**: Use `Procfile` instead of `NodeCommand` in .ebextensions for Amazon Linux 2

### 2. NODE_ENV Warning
- **Issue**: Non-standard NODE_ENV value warning
- **Solution**: Remove NODE_ENV from .env files, let Next.js manage it

### 3. Production Build Missing
- **Issue**: "Could not find a production build" error
- **Solution**: Build happens on server via prebuild hook

### 4. Port Issues
- **Issue**: App not accessible
- **Solution**: Use `next start -p $PORT` in package.json

### 5. Memory Issues
- **Issue**: Build fails due to insufficient memory
- **Solution**: Upgrade EB instance type or add swap memory

### 6. Dependencies Missing
- **Issue**: Module not found errors
- **Solution**: Ensure all dependencies are in package.json dependencies (not devDependencies)

### 7. Platform Hook Failures
- **Issue**: Prebuild hooks fail
- **Solution**: Check logs with `eb logs` and ensure scripts have proper permissions

## Environment Variables Best Practices

1. **Never commit**: `.env.local`, `.env.*.local`
2. **Use EB Console**: Set production variables in EB environment properties
3. **Prefix public vars**: Use `NEXT_PUBLIC_` for client-side variables
4. **Let Next.js manage**: Don't manually set NODE_ENV

## Monitoring & Logs

```bash
# View application logs
eb logs --all

# SSH into instance (if enabled)
eb ssh

# Monitor health
eb health
```

## Rolling Back

```bash
# List deployments
eb list

# Deploy previous version
eb deploy --version-label=<previous-version>
```

## Custom Domain Setup

1. Go to EB Console → Configuration → Load balancer
2. Add SSL certificate
3. Update Route 53 or DNS provider
4. Update `NEXT_PUBLIC_APP_URL` environment variable

## Performance Optimization

1. **Enable gzip**: Already configured in next.config.ts
2. **CDN**: Consider CloudFront for static assets
3. **Caching**: Configure browser and server caching
4. **Instance type**: Choose appropriate instance size
5. **Auto Scaling**: Configure based on traffic patterns