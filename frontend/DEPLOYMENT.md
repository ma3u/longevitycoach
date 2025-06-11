# Deployment Guide: GitHub Pages

This document outlines the requirements and steps for deploying the Longevity Coach frontend to GitHub Pages.

## GitHub Pages Limitations

GitHub Pages has several important limitations to be aware of:

1. **Static Only**: Only static assets (HTML, CSS, JavaScript) are supported
2. **No Server-Side Rendering (SSR)**: Next.js API routes and server components won't work
3. **No Server-Side Features**:
   - No environment variables at runtime
   - No database connections
   - No server-side authentication
   - No file system access
4. **Base Path Required**: Must handle being served from a subdirectory (e.g., `your-username.github.io/your-repo`)

## Implementation Requirements

### 1. Static Export

All pages must be statically generated using `next export`. This means:

- Use `getStaticProps` for data fetching
- Avoid `getServerSideProps` and API routes
- Use client-side data fetching for dynamic content

### 2. Base Path Configuration

Update `next.config.js` to handle the base path:

```javascript
const isGithubPages = process.env.NODE_ENV === 'production';
const basePath = isGithubPages ? '/your-repo-name' : '';

const nextConfig = {
  basePath,
  assetPrefix: basePath,
  // ... rest of your config
};
```

### 3. Link Handling

Always use the `Link` component from Next.js for internal links, but ensure paths are relative:

```jsx
import Link from 'next/link';

// Good - uses relative path
<Link href="/about">About</Link>

// Bad - includes base path
<Link href="/your-repo-name/about">About</Link>
```

### 4. Environment Variables

All environment variables must be available at build time. Use `NEXT_PUBLIC_` prefix for client-side variables:

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
```

### 5. Image Optimization

GitHub Pages doesn't support Next.js Image Optimization. Configure `next.config.js` to use a custom loader:

```javascript
module.exports = {
  images: {
    loader: 'imgix',
    path: '/',
  },
};
```

## Deployment Steps

1. **Build for Static Export**
   ```bash
   npm run build
   npm run export
   ```

2. **Create `.nojekyll` File**
   ```bash
   touch out/.nojekyll
   ```

3. **Deploy to GitHub Pages**
   - Push the `out` directory to the `gh-pages` branch
   - Or use GitHub Actions (recommended)

## GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: |
          npm run build
          npm run export
          touch out/.nojekyll
          
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: out
          branch: gh-pages
```

## Testing Locally

To test the static export locally:

```bash
# Build and export
npm run build
npm run export

# Serve the static files
npx serve@latest out
```

## Troubleshooting

### 404 Errors
- Ensure all links use relative paths
- Check that `basePath` is correctly set in `next.config.js`
- Verify the `assetPrefix` matches your repository name

### Images Not Loading
- Use the `unoptimized` prop for images
- Or configure a CDN for image optimization

### Environment Variables
- Remember that only `NEXT_PUBLIC_` variables are available in the browser
- All environment variables must be set in GitHub repository secrets for CI/CD

## Resources

- [Next.js Static Export](https://nextjs.org/docs/advanced-features/static-html-export)
- [GitHub Pages Deployment](https://nextjs.org/docs/deployment#github-pages)
- [Base Path Configuration](https://nextjs.org/docs/api-reference/next.config.js/basepath)
