/** @type {import('next').NextConfig} */
const path = require('path');

// Check if we're building for GitHub Pages
const isGithubPages = process.env.NODE_ENV === 'production';
// Update this to match your repository name
const repoName = 'longevitycoach';
const basePath = isGithubPages ? `/${repoName}` : '';

const nextConfig = {
  // Base path for GitHub Pages
  basePath: basePath,
  // Asset prefix for static assets
  assetPrefix: basePath,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Enable static export
  output: 'export',
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Webpack configuration
  webpack: (config, { isServer: _isServer }) => {
    // Add path aliases to webpack
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    // Important: return the modified config
    return config;
  },
};

// Log the configuration for debugging
console.log('Next.js Config:', {
  basePath: nextConfig.basePath,
  isGithubPages,
  nodeEnv: process.env.NODE_ENV
});

module.exports = nextConfig;
