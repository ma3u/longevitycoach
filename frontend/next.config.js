/** @type {import('next').NextConfig} */

// Check if we're building for GitHub Pages
const isGithubPages = process.env.NODE_ENV === 'production';
// Update this to match your repository name
const repoName = 'longevitycoach';
const basePath = isGithubPages ? `/${repoName}` : '';

const nextConfig = {
  // Base path for GitHub Pages
  basePath,
  // Asset prefix for static assets
  assetPrefix: basePath,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Enable static export
  output: 'export',
  
  // Disable server-side rendering features
  reactStrictMode: true,
  swcMinify: true,
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add path aliases to webpack
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };

    // Important: return the modified config
    return config;
  },
};

// Log the configuration for debugging
console.log('Next.js Config:', {
  basePath,
  isGithubPages,
  nodeEnv: process.env.NODE_ENV,
});

module.exports = nextConfig;
