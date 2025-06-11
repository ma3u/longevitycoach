# Decision Log

This file serves as an index for all Architectural Decision Records (ADRs) and key decisions made during the project.

## How to Use
- Each entry links to a detailed ADR in the `decisions/` directory
- Entries are sorted by date (newest first)
- Use the table of contents for quick navigation

## Table of Contents
- [Architecture Decisions](#architecture-decisions)
- [Database Decisions](#database-decisions)
- [Security Decisions](#security-decisions)
- [UI/UX Decisions](#uiux-decisions)
- [Integration Decisions](#integration-decisions)

## Architecture Decisions

| ID | Title | Date | Status |
|----|-------|------|--------|
| [ARCH-001](./decisions/ARCH-001-mcp-architecture.md) | MCP Architecture Selection | 2025-06-02 | ✅ Accepted |
| [DB-001](./decisions/DB-001-timescaledb-selection.md) | TimescaleDB for Time-Series Data | 2025-06-02 | ✅ Accepted |

## Database Decisions

| ID | Title | Date | Status |
|----|-------|------|--------|
| [DB-001](./decisions/DB-001-timescaledb-selection.md) | TimescaleDB for Time-Series Data | 2025-06-02 | ✅ Accepted |

## Security Decisions

*No security decisions documented yet.*

## UI/UX Decisions

*No UI/UX decisions documented yet.*

## Integration Decisions

*No integration decisions documented yet.*

## Adding a New Decision

1. Create a new markdown file in `decisions/` using the template:
   ```
   cp templates/decision-template.md decisions/NEW-ID-short-title.md
   ```
2. Update this file with a reference to the new decision
3. Submit a pull request for review

## Review Process
- All decisions must be reviewed by at least one team member
- Decisions affecting multiple components require cross-team review
- Major architectural decisions require approval from the architecture board

---
*Last Updated: 2025-06-02*
