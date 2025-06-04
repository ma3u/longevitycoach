# DEP-001: GitHub Pages Setup for Documentation

## Decision

Use GitHub Pages to host the project's documentation and static website, serving content from the `docs` directory on the `gh-pages` branch.

## Context

We need a reliable way to:
- Host project documentation
- Showcase the project
- Provide a public-facing interface
- Automate deployment from the main branch

## Considered Options

1. **GitHub Pages with `gh-pages` branch**
   - Pros: Native GitHub integration, simple setup, automatic SSL
   - Cons: Limited to static content

2. **Vercel/Netlify**
   - Pros: More features, serverless functions
   - Cons: Additional service to manage, potential costs at scale

3. **Self-hosted solution**
   - Pros: Full control
   - Cons: Maintenance overhead, additional costs

## Decision Rationale

Chose GitHub Pages because:
- Native integration with GitHub
- Automatic SSL certificates
- Simple setup and maintenance
- Sufficient for current documentation needs
- No additional costs or services required

## Implementation Details

- **Source**: `docs/` directory on `main` branch
- **Deployment**: Automated via GitHub Actions to `gh-pages` branch
- **Custom Domain**: Configured via CNAME
- **Workflow**: `.github/workflows/gh-pages.yml`

## Status

✅ Implemented

## Related

- PR: #4 - GitHub Pages Setup
- Issue: #5 - Set up GitHub Pages for documentation

## Notes

- The site is available at: https://ma3u.github.io/longevitycoach/
- Updates are automatically deployed on push to `main`
- Custom domain can be configured via repository settings
