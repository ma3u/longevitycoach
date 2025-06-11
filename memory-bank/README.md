---
title: "Memory Bank System"
description: "Central knowledge repository for the Longevity Coach platform"
created: 2025-06-02
updated: 2025-06-11
authors: "Longevity Coach Team"
status: active
related: []
tags: ["documentation", "knowledge-management", "architecture"]
---

# Longevity Coach Memory Bank

Central knowledge repository for the Longevity-Focused Blood Analysis Platform, integrating expert methodologies with modern architecture patterns.

This directory serves as the central hub for project knowledge, decisions, and patterns. It's designed to help maintain context and share knowledge across the team, with a focus on healthcare compliance and AI-assisted development.

## 🏗️ Project Structure

### Core Directories
- `architecture/` - System design and technical specifications
  - `api-architecture.md` - API design and FHIR integration
  - `database-architecture.md` - Database schema and optimizations

- `decisions/` - Architectural Decision Records (ADRs)
  - `dec-001-mcp-architecture.md` - MCP agent architecture
  - `dec-001-secrets-management.md` - Secrets management strategy
  - `dec-001-timescaledb-selection.md` - Database selection rationale
  - [More decision records...](decision-log.md)

- `planning/` - Project planning and documentation
  - `README.md` - Planning process and resources
  - `workflow.md` - Development workflow (Coming Soon)
  - `decision-making.md` - Decision making process (Coming Soon)

- `checkpoints/` - Versioned project states
  - `checklist.md` - Development progress tracker

- `domain-knowledge/` - Healthcare expertise
  - `expert-methodologies.md` - Medical protocols and best practices
  - `clinical-guidelines/` - Medical best practices
  - `regulations/` - HIPAA, GDPR compliance

## 📚 Documentation

- [Decision Log](decision-log.md) - All architectural decisions
- [conventions.md](conventions.md) - Documentation standards
- [broken-links.md](broken-links.md) - Tracking broken documentation links

## 🚀 Getting Started

### For Developers
1. Review the [decision log](decision-log.md) for key architectural decisions
2. Follow the documentation [conventions](conventions.md)
3. Check [broken-links.md](broken-links.md) for documentation issues

### Adding New Content

#### Creating New Documents

1. **Choose the appropriate directory** for your content:
   - `decisions/` for architectural decisions
   - `planning/` for project planning documents
   - `architecture/` for system design documents
   - `domain-knowledge/` for medical and domain expertise

2. **Follow the file naming convention**:

   - Use kebab-case (e.g., `my-document.md`)
   - For decisions: `dec-XXX-short-description.md`
   - For plans: `plan-XXX-short-description.md`
   - For SDLC: `sdlc-XXX-short-description.md`
   - For sprints: `sprint-XXX-short-description.md`


3. **Include required frontmatter**:

   ```yaml
   ---
   title: "Document Title"
   description: "Brief description of the document"
   created: YYYY-MM-DD
   updated: YYYY-MM-DD  # Update when making changes
   authors: "Comma-separated list of authors"
   status: "draft|review|approved|deprecated"
   related: []  # List of related document paths
   tags: ["tag1", "tag2"]  # Relevant tags for categorization
   ---
   ```

4. **Update relevant index files** (e.g., [decision-log.md](decision-log.md))
5. **Run the validation script**: `node scripts/validate-memory-bank.js`

### Documenting Decisions

When making architectural decisions:

1. Use the decision template from `templates/decision-template.md`
2. Include the following sections:
   - Status
   - Context
   - Decision
   - Consequences
   - Related Decisions
   - Date
3. Update the decision log with a brief summary

### Managing Dependencies

- Link related documents using relative paths
- Use the `related` frontmatter field to declare document relationships
- When referencing other documents, use the format: `[TITLE](relative/path/to/file.md)`

## 🔍 Validation & Quality Control

### Automated Validation
Run the validation script to check for documentation issues:

```bash
node scripts/validate-memory-bank.js
```

### Pre-commit Hooks

- Pre-commit hooks automatically validate files before each commit
- The following checks are performed:
  - File naming conventions (kebab-case)
  - Required frontmatter fields
  - Valid status values
  - Broken links
  - Markdown linting

### Manual Reviews

- All documentation should be peer-reviewed before merging to main
- Use GitHub pull requests for documentation changes
- Request reviews from relevant team members

## 🤝 Contributing

1. Create a new branch for your changes
2. Follow the established documentation standards
3. Update any affected documentation
4. Submit a pull request with a clear description of changes
4. Document decisions in `decisions/`

### For Medical Experts
1. Review `domain-knowledge/expert-methodologies.md`
2. Validate biomarker ranges and protocols
3. Update clinical guidelines as needed

## 🔄 Development Workflow

### Documenting Work
1. **Start** with the phase-specific README
2. **Reference** relevant architecture docs
3. **Document** decisions using ADR format
4. **Update** checklists and progress
5. **Review** during sprint planning

### Version Control

- All documentation is versioned in Git
- Use meaningful commit messages
- Reference related issues in commit messages (e.g., `#123`)
- Create feature branches for significant documentation changes

### Backup Strategy

- Documentation is backed up via GitHub's version control
- No local `.bak` files should be committed (see [DEC-011](./decisions/dec-011-data-encryption.md))
- Use Git history to track changes and recover previous versions

## 🔒 Compliance & Security

- All patient data handled per HIPAA/GDPR
- PII encrypted at rest and in transit
- Regular security audits
- Access controls and audit logging

## 📚 Resources

- [FHIR R4 Documentation](https://www.hl7.org/fhir/)
- [LOINC Codes](https://loinc.org/)
- [SNOMED CT](https://www.snomed.org/)
- [HIPAA Compliance Guide](https://www.hhs.gov/hipaa/index.html)

## 🤖 AI Integration & Automation

This memory bank is optimized for AI-assisted development:
- Structured data for reliable parsing
- Clear decision trails with context
- Versioned knowledge for historical reference
- Compliance-focused documentation

### AI-Assisted Features

- Automated validation of documentation standards
- Link checking and maintenance
- Frontmatter validation
- Template generation for new documents

### Best Practices for AI-Generated Content
1. Always review and validate AI-generated content
2. Ensure proper attribution for AI-assisted work
3. Maintain human oversight for critical documentation
4. Document AI usage in the `authors` field (e.g., "AI-assisted with human review")
