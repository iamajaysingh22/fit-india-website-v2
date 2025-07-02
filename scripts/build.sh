#!/bin/bash
set -e

echo "Starting build process..."

# Install dependencies
npm ci --only=production

# Build the application
npm run build

echo "Build completed successfully!"