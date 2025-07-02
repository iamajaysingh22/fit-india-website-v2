# Fitness App - AWS Elastic Beanstalk Deployment

Simple and reliable deployment setup for the fitness app landing page.

## 🚀 Quick Start

### 1. Prerequisites
- AWS Account with CLI configured (`aws configure`)
- Node.js 18+ installed
- Git repository initialized

### 2. One-Time Setup
```bash
./setup.sh
```
This will:
- Install EB CLI if needed
- Initialize Elastic Beanstalk application
- Create production environment
- Set initial environment variables

### 3. Deploy Your App
```bash
./deploy.sh
```
This will:
- Test build locally
- Commit any changes
- Deploy to AWS EB
- Open the live app

### 4. If Issues Occur
```bash
./debug.sh
```
This will:
- Check environment status
- Test URL accessibility
- Show recent logs
- Provide troubleshooting steps

## 📋 Common Commands

| Command | Description |
|---------|-------------|
| `./setup.sh` | Initial setup (run once) |
| `./deploy.sh` | Deploy changes |
| `./debug.sh` | Troubleshoot issues |
| `./set-env.sh` | Update environment variables |
| `eb status` | Check environment status |
| `eb logs` | View application logs |
| `eb ssh` | Access server directly |
| `eb open` | Open app in browser |

## 🔧 Configuration Files

- **`.elasticbeanstalk/config.yml`** - EB application settings
- **`.ebextensions/01-node-settings.config`** - Environment variables and proxy
- **`.ebextensions/02-build.config`** - Build process during deployment
- **`.ebextensions/03-nginx.config`** - Nginx configuration for performance
- **`.ebignore`** - Files to exclude from deployment

## 🐛 Troubleshooting

### 502 Bad Gateway Error
```bash
# Check if app is running on correct port
eb ssh
ps aux | grep node
netstat -tlnp | grep 8081
```

**Fix**: Ensure app starts on port 8081 (set in environment variables)

### Build Failures
```bash
# Test build locally
npm run build

# Check build logs on server
eb logs --all | grep -i error
```

**Fix**: Usually missing dependencies or TypeScript errors

### Static Files Not Loading
```bash
# Check nginx configuration
eb ssh
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

**Fix**: Verify `.next/static` directory exists after build

### App Won't Start
```bash
# Check environment variables
eb printenv

# Check application logs
eb logs --all | tail -50
```

**Fix**: Ensure `NODE_ENV=production` and `PORT=8081` are set

## 📊 Monitoring

### Health Check
```bash
eb health --refresh
```

### Performance Monitoring
```bash
# CPU and memory usage
eb ssh
top

# Disk usage
df -h
```

### Application Logs
```bash
# Real-time logs
eb logs --all -f

# Specific log files
eb ssh
tail -f /var/log/eb-engine.log
tail -f /var/log/nginx/access.log
```

## 🔄 Common Workflows

### Deploy New Features
1. Make code changes
2. Test locally: `npm run dev`
3. Deploy: `./deploy.sh`
4. Verify: `eb open`

### Update Environment Variables
1. Run: `./set-env.sh`
2. Or manually: `eb setenv KEY=value`
3. App restarts automatically

### Rollback Deployment
```bash
# List previous versions
eb list

# Deploy specific version
eb deploy --version-label=previous-version-name
```

### Scale Application
```bash
# Change instance type
eb config

# Auto scaling (in EB console)
# Set min/max instances based on load
```

## 🏗️ Architecture

```
Internet → Load Balancer → Nginx → Node.js App (Port 8081)
                      ↓
                  Static Files (/static, /public)
```

## 📈 Performance Tips

1. **Enable CloudFront** for static assets
2. **Use RDS** for database (if needed)
3. **Configure Auto Scaling** for traffic spikes
4. **Monitor CloudWatch** metrics
5. **Set up SSL** certificate for HTTPS

## 🔐 Security

- Environment variables stored securely in EB
- HTTPS enforced (configure SSL certificate)
- Security headers configured in nginx
- No sensitive data in code repository

## 💰 Cost Optimization

- **t3.medium** instance for production (can scale down for dev)
- **Auto scaling** to handle traffic efficiently
- **Reserved instances** for predictable workloads
- **Monitor billing** in AWS Console

## 🆘 Emergency Procedures

### App Down
```bash
# Quick restart
eb deploy --timeout 5

# If that fails, rebuild environment
eb rebuild
```

### Critical Issue
```bash
# Rollback to previous working version
eb deploy --version-label=previous-working-version

# If environment is corrupted
eb terminate
./setup.sh  # Recreate environment
```

## 📞 Support

For deployment issues:
1. Run `./debug.sh` for diagnostics
2. Check AWS EB logs: `eb logs --all`
3. Review configuration files in `.ebextensions/`
4. Test build locally: `npm run build`

---

**Built for**: Next.js 15.3.4 + TypeScript + Tailwind CSS  
**Platform**: Amazon Linux 2023 + Node.js 18  
**Region**: Asia Pacific (Mumbai) - ap-south-1