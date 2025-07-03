export default function handler(req, res) {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    region: process.env.AWS_REGION || 'ap-south-1',
    instance: process.env.EC2_INSTANCE_ID || 'local',
    deployment: {
      environment: process.env.ENVIRONMENT || 'local',
      build_id: process.env.BUILD_ID || 'dev-build',
      deployed_at: process.env.DEPLOYED_AT || new Date().toISOString()
    },
    dependencies: {
      node_version: process.version,
      platform: process.platform,
      arch: process.arch
    },
    performance: {
      memory_usage: process.memoryUsage(),
      cpu_usage: process.cpuUsage()
    }
  };
  
  try {
    // Additional health checks can be added here
    // - Database connectivity
    // - External service availability
    // - Cache connectivity
    // - File system checks
    
    // Check if Next.js build exists
    const fs = require('fs');
    const path = require('path');
    const buildPath = path.join(process.cwd(), '.next');
    
    healthCheck.build_status = {
      exists: fs.existsSync(buildPath),
      build_id_file: fs.existsSync(path.join(buildPath, 'BUILD_ID'))
    };
    
    // Determine overall health
    if (healthCheck.build_status.exists && healthCheck.build_status.build_id_file) {
      healthCheck.status = 'healthy';
      res.status(200).json(healthCheck);
    } else {
      healthCheck.status = 'degraded';
      healthCheck.message = 'Build artifacts missing';
      res.status(503).json(healthCheck);
    }
    
  } catch (error) {
    healthCheck.status = 'unhealthy';
    healthCheck.message = error.message;
    healthCheck.error = {
      name: error.name,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
    res.status(503).json(healthCheck);
  }
}