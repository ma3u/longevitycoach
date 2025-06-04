# Longevity Coach - Project Website

This directory contains the source code for the Longevity Coach project website, hosted on GitHub Pages.

## Project Structure

- `index.html` - Main landing page
- `style.css` - Styling for the website
- `script.js` - JavaScript functionality
- `presentation/` - Interactive presentation slides
- `_config.yml` - GitHub Pages configuration
- `CNAME` - Custom domain configuration
- `.nojekyll` - Ensures proper static file serving

## Local Development

1. Clone the repository
2. Navigate to the `docs` directory
3. Start a local server:

   ```bash
   python -m http.server 8000
   ```

4. Open `http://localhost:8000` in your browser

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment is handled by the GitHub Actions workflow in `.github/workflows/gh-pages.yml`.

### Deployment Process

1. Push changes to the `main` branch
2. GitHub Actions builds and deploys the `docs/` directory to the `gh-pages` branch
3. GitHub Pages serves the content from the `gh-pages` branch

## GitHub Pages Configuration

- **Source**: `docs/` directory on `main` branch
- **Deployment**: Automated via GitHub Actions to `gh-pages` branch
- **Custom Domain**: Configured via CNAME
- **Workflow**: `.github/workflows/gh-pages.yml`

## Custom Domain

The site is configured to use `longevitycoach.app`. To update the domain, modify the `CNAME` file.

## Related Documentation

- [GitHub Pages Setup Decision (DEP-001)](../memory-bank/decisions/DEP-001-github-pages-setup.md)
- [GitHub Actions Workflow](../.github/workflows/gh-pages.yml)

## License

This project is proprietary and confidential. All rights reserved.
