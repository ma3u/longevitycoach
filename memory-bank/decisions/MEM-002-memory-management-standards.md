# Memory Management Standards

## Overview
This document defines the standards for memory management in the Longevity Coach project, ensuring consistency across all development activities.

## Primary Memory System

### Memory-Bank Directory
- The `memory-bank` directory is the single source of truth for all project knowledge
- All decisions, architecture, and domain knowledge must be documented here
- Follow the established directory structure and naming conventions

### Memory Bank Structure
- `/decisions` - Architecture Decision Records (ADRs) and technical decisions
- `/domain-knowledge` - Business logic, clinical guidelines, and domain expertise
- `/architecture` - System architecture documentation
- `/project-phases` - Documentation organized by project phases
- `/checkpoints` - Project checkpoints and milestones

## Secondary References

### GitHub Discussions
- Used for open-ended discussions and brainstorming
- Questions and answers about the project
- Community engagement and feedback

### GitHub Issues
- Task and bug tracking
- Feature requests
- Project management

## Synchronization Requirements

### From GitHub to Memory-Bank
1. **When to Sync**: After any significant discussion or resolution in GitHub
2. **Process**:
   - Extract key decisions and information
   - Create or update relevant files in memory-bank
   - Add cross-references to GitHub (links)
   - Follow the established file naming and organization conventions

### From Memory-Bank to GitHub
1. **When to Create Issues**:
   - When action items are identified in memory-bank documents
   - When new features or changes are proposed
   - When documentation needs review or discussion

## Documentation Standards

### Memory-Bank Documents
- Use Markdown format (.md)
- Follow the established templates
- Include metadata (author, date, status)
- Use clear, descriptive filenames with appropriate prefixes

### GitHub Content
- Use templates for issues and discussions
- Label and categorize content appropriately
- Reference related memory-bank documents

## Compliance and Review

### Required Reviews
- All memory-bank updates must be reviewed in pull requests
- At least one other team member must approve changes

### Regular Audits
- Monthly review of memory-bank content
- Quarterly cleanup of outdated information
- Annual comprehensive review of all documentation

## Implementation Guidelines

### For Developers
1. Always check the memory-bank before starting work
2. Update relevant documentation as part of each PR
3. Reference memory-bank documents in code comments when applicable

### For Reviewers
1. Verify that PRs include necessary documentation updates
2. Ensure memory-bank changes follow standards
3. Check for proper cross-referencing between systems

## Change Management

### Versioning
- Use semantic versioning for major documentation updates
- Maintain a changelog for significant changes
- Keep backward compatibility when possible

### Deprecation Policy
- Mark deprecated content clearly
- Provide migration guides when making breaking changes
- Remove deprecated content only after sufficient notice
