# Memory Bank

This directory serves as the central hub for project knowledge, decisions, and patterns. It's designed to help maintain context and share knowledge across the team, with a focus on healthcare compliance and AI-assisted development.

## Structure

### Core Directories
- `decisions/` - Architectural and technical decisions with impact analysis
- `checkpoints/` - Versioned project milestones and rollback points
- `domain-knowledge/` - Healthcare-specific guidelines and regulations
- `development-phases/` - Project roadmap and phase tracking
- `systemPatterns.md` - System architecture and design patterns

### File Descriptions
- `decisions/`: Contains decision records following the ADR (Architectural Decision Record) pattern
- `checkpoints/`: Tracks project state at key milestones with rollback capabilities
- `domain-knowledge/`: Houses healthcare regulations, clinical guidelines, and FHIR resources
- `development-phases/`: Documents project phases, goals, and completion criteria
- `systemPatterns.md`: Documents recurring architectural patterns and best practices

## How to Use

### For New Team Members
1. Start with `development-phases/README.md` for project status
2. Review `systemPatterns.md` for architectural patterns
3. Check `decisions/` for key technical decisions

### During Development
1. Create a decision record for significant choices
2. Update checkpoints at milestones
3. Reference domain knowledge when implementing features
4. Document new patterns in `systemPatterns.md`

### For AI Assistance
- Reference relevant context from the memory bank
- Update documentation when adding new patterns or decisions
- Use checkpoints to manage complex changes

## GitHub Integration

This memory bank is version controlled with Git and stored in GitHub. Follow these practices:

- Reference related issues/PRs in commit messages
- Keep files focused and well-organized
- Use clear, descriptive names and headings
- Link between related files using relative paths
- Review and update during sprint planning and retrospectives
- Follow the PR template for memory bank changes
