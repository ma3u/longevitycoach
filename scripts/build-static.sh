#!/bin/bash
set -e

# Navigate to the frontend directory
cd "$(dirname "$0")/../frontend"

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm ci
fi

# Build the static site
echo "Building static site..."
npm run build

# Create docs directory in the root if it doesn't exist
mkdir -p ../docs

# Copy static files to docs directory
echo "Copying static files to docs directory..."
cp -R out/* ../docs/

echo "Static site built successfully in the docs directory!"
