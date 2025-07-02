import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations for EB
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Static file serving
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
