# Longevity Coach - Documentation Map

This document provides a comprehensive mapping of all documentation in the Longevity Coach project, including file locations, purposes, and relationships between documents.

## Table of Contents
- [Core Documentation](#core-documentation)
- [Project Documentation](#project-documentation)
- [Development Documentation](#development-documentation)
- [Architecture](#architecture)
- [Decision Records](#decision-records)
- [Domain Knowledge](#domain-knowledge)
- [Planning](#planning)
- [Contribution Guidelines](#contribution-guidelines)
- [Documentation Standards](#documentation-standards)
- [Documentation Gaps](#documentation-gaps)

## Core Documentation

| Document | Location | Description | Last Updated |
|----------|----------|-------------|--------------|
| README | [/README.md](/README.md) | Main project overview and entry point | 2025-06-11 |
| Setup Guide | [/docs/setup-guide.md](/docs/setup-guide.md) | Development environment setup | 2025-06-11 |
| Code of Conduct | [/CODE_OF_CONDUCT.md](/CODE_OF_CONDUCT.md) | Community standards | 2025-06-11 |
| Contributing | [/CONTRIBUTING.md](/CONTRIBUTING.md) | Contribution guidelines | 2025-06-11 |
| Glossary | [/docs/glossary.md](/docs/glossary.md) | Technical terms and definitions | 2025-06-11 |

## Project Documentation

| Document | Location | Description | Last Updated |
|----------|----------|-------------|--------------|
| Memory Bank | [/memory-bank/README.md](/memory-bank/README.md) | Central knowledge repository | 2025-06-11 |
| Project Vision | [/memory-bank/project-vision.md](/memory-bank/project-vision.md) | Long-term project vision and goals | 2025-06-11 |
| Development Phases | [/memory-bank/development-phases/README.md](/memory-bank/development-phases/README.md) | Project milestones and phases | 2025-06-11 |
| Project Context | [/memory-bank/project-context.md](/memory-bank/project-context.md) | Project background and context | 2025-06-11 |

## Development Documentation

| Document | Location | Description | Last Updated |
|----------|----------|-------------|--------------|
| Development Phases | [/memory-bank/development-phases/checklist.md](/memory-bank/development-phases/checklist.md) | Development progress tracker | 2025-06-11 |
| System Patterns | [/memory-bank/system-patterns.md](/memory-bank/system-patterns.md) | Common system patterns and practices | 2025-06-11 |
| Conventions | [/memory-bank/conventions.md](/memory-bank/conventions.md) | Coding and documentation standards | 2025-06-11 |

## Architecture

| Document | Location | Description | Last Updated |
|----------|----------|-------------|--------------|
| Architecture Overview | [/memory-bank/architecture/README.md](/memory-bank/architecture/README.md) | System architecture overview | 2025-06-11 |
| API Architecture | [/memory-bank/architecture/api-architecture.md](/memory-bank/architecture/api-architecture.md) | API design and specifications | 2025-06-11 |
| Database Architecture | [/memory-bank/architecture/database-architecture.md](/memory-bank/architecture/database-architecture.md) | Database design and schema | 2025-06-11 |

## Decision Records

| Document | Location | Description | Last Updated |
|----------|----------|-------------|--------------|
| Decision Log | [/memory-bank/decision-log.md](/memory-bank/decision-log.md) | Index of all architectural decisions | 2025-06-11 |
| DEC-001 | [/memory-bank/decisions/dec-001-mcp-architecture.md](/memory-bank/decisions/dec-001-mcp-architecture.md) | MCP agent architecture | 2025-06-11 |
| DEC-002 | [/memory-bank/decisions/dec-002-memory-management-standards.md](/memory-bank/decisions/dec-002-memory-management-standards.md) | Memory management standards | 2025-06-11 |
| DEC-011 | [/memory-bank/decisions/dec-011-data-encryption.md](/memory-bank/decisions/dec-011-data-encryption.md) | Data encryption strategy | 2025-06-11 |

## Domain Knowledge

| Document | Location | Description | Last Updated |
|----------|----------|-------------|--------------|
| Expert Methodologies | [/memory-bank/domain-knowledge/expert-methodologies.md](/memory-bank/domain-knowledge/expert-methodologies.md) | Medical and scientific methodologies | 2025-06-11 |
| Clinical Guidelines | [/memory-bank/domain-knowledge/clinical-guidelines/README.md](/memory-bank/domain-knowledge/clinical-guidelines/README.md) | Clinical best practices | 2025-06-11 |
| HIPAA Compliance | [/memory-bank/domain-knowledge/regulations/hipaa-compliance.md](/memory-bank/domain-knowledge/regulations/hipaa-compliance.md) | Healthcare compliance standards | 2025-06-11 |

## Planning

| Document | Location | Description | Last Updated |
|----------|----------|-------------|--------------|
| Planning Overview | [/memory-bank/planning/README.md](/memory-bank/planning/README.md) | Planning process and resources | 2025-06-11 |
| Sprint 1 | [/memory-bank/planning/sprint-001-initial-setup.md](/memory-bank/planning/sprint-001-initial-setup.md) | Initial setup sprint details | 2025-06-11 |
| SDLC Process | [/memory-bank/planning/sdlc-001-github-sprint-management.md](/memory-bank/planning/sdlc-001-github-sprint-management.md) | Development lifecycle process | 2025-06-11 |
| Long-term Roadmap | [/memory-bank/planning/plan-002-long-term-roadmap.md](/memory-bank/planning/plan-002-long-term-roadmap.md) | Project roadmap | 2025-06-11 |

## Documentation Gaps

The following documentation areas have been identified as needing attention:

1. **User Documentation**
   - User guides and manuals
   - API documentation for external developers
   - System administration guides

2. **Testing**
   - Testing strategy and frameworks
   - Test coverage reports
   - E2E testing procedures

3. **Deployment**
   - Production deployment procedures
   - CI/CD pipeline documentation
   - Monitoring and alerting

4. **Security**
   - Security policies and procedures
   - Incident response plan
   - Compliance documentation

## Documentation Standards

1. All documentation should follow the [conventions](/memory-bank/conventions.md)
2. Use Markdown for all documentation
3. Include frontmatter with metadata (title, description, authors, dates)
4. Keep documentation up-to-date with code changes
5. Use relative links for internal documentation

## Updating This Document

When adding or updating documentation:
1. Update this mapping document
2. Ensure proper cross-linking
3. Update the "Last Updated" date
4. Add any new document categories if needed
