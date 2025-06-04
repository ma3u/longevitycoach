# SEC-001: Secrets Management with 1Password and GitHub Secrets

## Status
Proposed

## Context
We need a secure and maintainable way to manage secrets across different environments (local development, CI/CD pipelines, and production). The current setup uses 1Password for local development, but we need to extend this to CI/CD workflows.

## Decision
Implement a hybrid secrets management approach using:
1. **1Password** for local development
2. **GitHub Secrets** for CI/CD pipelines
3. **Environment-specific .env files** with 1Password references

## Rationale
- **Security**: Minimize secret exposure and rotation overhead
- **Developer Experience**: Streamline local development setup
- **CI/CD Integration**: Enable secure secret access in GitHub Actions
- **Auditability**: Track secret usage and access
- **Compliance**: Meet security and audit requirements

## Implementation

### Local Development
1. Store all secrets in 1Password with standardized naming
2. Use `op` CLI with `op run` to inject secrets at runtime
3. Maintain `.env.example` with 1Password reference format

### CI/CD Pipeline
1. Store production secrets in GitHub Secrets
2. Map GitHub Secrets to environment variables in workflows
3. Use `op` CLI in CI for development/staging environments

### Required Changes
1. Update documentation for secret management
2. Add GitHub Actions workflow for secret validation
3. Create secret rotation procedures

## Consequences
### Positive
- Centralized secret management
- Reduced risk of secret leakage
- Simplified onboarding for new developers
- Consistent secret handling across environments

### Negative
- Additional setup for local development
- Need to maintain multiple secret stores
- Learning curve for 1Password CLI

## Related Decisions
- [DB-001: TimescaleDB Selection](./DB-001-timescaledb-selection.md)

## Date
2025-06-03
