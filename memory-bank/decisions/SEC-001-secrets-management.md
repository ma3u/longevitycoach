# SEC-001: Secrets Management with 1Password and GitHub Secrets

## Status
✅ Accepted

## Context
The Longevity Coach platform requires secure handling of sensitive information including API keys, database credentials, and service tokens. We need a consistent approach that works across different environments (local development, CI/CD, production) while maintaining security best practices.

## Decision
Implement a multi-layered secrets management strategy using:

1. **1Password** as the primary secrets store
2. **GitHub Secrets** for CI/CD workflows
3. **Environment variables** with `.env` files for local development
4. **Windsurf IDE** integration for secure access

## Rationale
- **Security**: Minimize secret exposure and rotation overhead
- **Developer Experience**: Streamline local development setup
- **CI/CD Integration**: Enable secure secret access in GitHub Actions
- **Auditability**: Track secret usage and access
- **Compliance**: Meet security and audit requirements

## Implementation

### 1. Secrets Storage Hierarchy

```mermaid
graph TD
    A[1Password Vault] -->|Sync| B[GitHub Secrets]
    A -->|Inject| C[Local .env]
    A -->|Access| D[Windsurf IDE]
    B -->|Inject| E[GitHub Actions]
    C -->|Load| F[Local Development]
    D -->|Access| G[Windsurf Development]
```

### 2. Local Development Setup

#### Prerequisites
- 1Password CLI installed and authenticated
- GitHub CLI installed and authenticated
- Node.js 18+

#### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ma3u/longevitycoach.git
   cd longevitycoach
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with 1Password references (op://...)
   ```

4. **Load secrets**
   ```bash
   # Install 1Password CLI if not already installed
   brew install --cask 1password-cli
   
   # Sign in to 1Password
   op signin
   
   # Load environment variables
   eval $(op run --env-file=.env --no-masking -- npm run dev)
   ```

### 3. GitHub Actions Workflow

Secrets are automatically injected into GitHub Actions workflows using GitHub Secrets. The workflow uses the `op` CLI to fetch additional secrets from 1Password when needed.

### 4. Windsurf IDE Integration

Windsurf IDE is configured to:
- Access 1Password via the `op` CLI
- Automatically load environment variables
- Provide secure secret injection for development

## Rules for Developers

### 1. Never commit secrets
- ✅ DO: Add all secret files to `.gitignore`
- ❌ DON'T: Commit `.env` files or any hardcoded secrets

### 2. Use 1Password references
```env
# Good
DATABASE_URL=op://LongevityCoach/development/DATABASE_URL/credential

# Bad
DATABASE_URL=postgres://user:password@localhost:5432/db
```

### 3. Environment Variables
- Use `.env.example` as a template
- Document all required variables
- Keep sensitive values in 1Password

## Consequences
### Positive
- Centralized secret management
- Reduced risk of secret leakage
- Simplified onboarding for new developers
- Consistent secret handling across environments
- Secure development workflow integration

### Negative
- Additional setup for local development
- Need to maintain multiple secret stores
- Learning curve for 1Password CLI
- Dependence on 1Password service availability

## Related Decisions
- [DB-001: TimescaleDB Selection](./DB-001-timescaledb-selection.md)

## Date
2025-06-04
