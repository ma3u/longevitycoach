---
trigger: always_on
---

# Secrets Management Rules for Windsurf IDE

## Overview
This document outlines the rules and best practices for managing secrets in the Longevity Coach project when using Windsurf IDE.

## Required Setup

### 1. Prerequisites
- 1Password CLI installed and authenticated
- GitHub CLI installed and authenticated
- Node.js 18+ with npm

### 2. Environment Configuration

#### .windsurf/config.json
```json
{
  "secrets": {
    "provider": "1password",
    "vault": "LongevityCoach",
    "envFile": ".env.windsurf",
    "autoLoad": true
  },
  "extensions": {
    "recommendations": [
      "1password.1password",
      "github.vscode-github-actions"
    ]
  }
}
```

## Workflow Rules

### 1. Development Environment Setup

#### 1.1 Initial Setup
```bash
# Clone the repository
gh repo clone ma3u/longevitycoach
cd longevitycoach

# Install dependencies
npm install

# Create local environment file
cp .env.example .env.windsurf

# Edit .env.windsurf to use 1Password references
your_editor .env.windsurf
```

#### 1.2 Starting Development
```bash
# Load environment and start dev server
op run --env-file=.env.windsurf --no-masking -- npm run dev
```

### 2. Secret Management

#### 2.1 Adding a New Secret
1. Add the secret to 1Password in the LongevityCoach vault
2. Update `.env.example` with the new variable name and 1Password reference
3. Update any relevant documentation

#### 2.2 Accessing Secrets in Code
```javascript
// Good - using environment variables
const apiKey = process.env.PERPLEXITY_API_KEY;

// Bad - hardcoded secrets
const apiKey = 'pplx-1234567890';
```

### 3. Security Rules

#### 3.1 Prohibited Actions
- ❌ Never commit `.env` files
- ❌ Never hardcode secrets in source code
- ❌ Never log sensitive information
- ❌ Don't share secrets in unencrypted channels

#### 3.2 Required Actions
- ✅ Use 1Password references in `.env` files
- ✅ Document all required environment variables in `.env.example`
- ✅ Use secure methods to pass secrets to subprocesses
- ✅ Rotate secrets every 90 days

## Troubleshooting

### Common Issues

#### 1. Missing Secrets
```bash
# Verify 1Password is authenticated
op whoami

# Check if secret exists
op item get "Secret Name" --vault=LongevityCoach
```

#### 2. Permission Issues
- Ensure your 1Password account has access to the LongevityCoach vault
- Verify your SSH key is added to your GitHub account

## Best Practices

### 1. Development
- Use `op run` to start your development server
- Keep `.env.windsurf` in your `.gitignore`
- Use descriptive names for secrets
- Group related secrets together in 1Password

### 2. Code Reviews
- Verify no secrets are committed
- Check that all required environment variables are documented
- Ensure proper error handling for missing secrets

### 3. Documentation
- Document all required environment variables
- Include setup instructions in README.md
- Keep this document up to date

## Reference

### 1. Useful Commands
```bash
# List all secrets in 1Password
op item list --vault=LongevityCoach

# Get a specific secret
op item get "Secret Name" --vault=LongevityCoach --fields=credential

# Update a secret
op item edit "Secret Name" --vault=LongevityCoach credential=new-value
```

### 2. Related Documentation
- [1Password CLI Documentation](https://developer.1password.com/docs/cli/)
- [GitHub Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Windsurf IDE Documentation](https://docs.windsurf.dev)
