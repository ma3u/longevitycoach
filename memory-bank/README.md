# Longevity Coach Memory Bank

Central knowledge repository for the Longevity-Focused Blood Analysis Platform, integrating expert methodologies from Dr. Ulrich Strunz, Thiemo Osterhaus, and Helena Orfanos-Böckel with modern MCP architecture.

This directory serves as the central hub for project knowledge, decisions, and patterns. It's designed to help maintain context and share knowledge across the team, with a focus on healthcare compliance and AI-assisted development.

## 🏗️ Project Structure

### Core Directories
- `architecture/` - System design and technical specifications
  - `api-architecture.md` - API design and FHIR integration
  - `database-architecture.md` - Database schema and optimizations

- `decisions/` - Architectural Decision Records (ADRs)
  - `ARCH-001-mcp-architecture.md` - MCP agent architecture
  - [More decision records...]

- `checkpoints/` - Versioned project states
  - `checklist.md` - Development progress tracker
  - [Versioned checkpoints...]

- `domain-knowledge/` - Healthcare expertise
  - `expert-methodologies.md` - Strunz, Osterhaus, and Böckel protocols
  - `clinical-guidelines/` - Medical best practices
  - `regulations/` - HIPAA, GDPR compliance

- `project-phases/` - Implementation roadmap
  - `phase-1/` - MVP Frontend Development
  - `phase-2/` - Infrastructure & Compliance
  - `phase-3/` - Healthcare Standards
  - `phase-4/` - Analytics Engine
  - `phase-5/` - Integration & Testing

## 🚀 Getting Started

### For Developers
1. Review `project-phases/phase-1/README.md` for current focus
2. Check `checkpoints/checklist.md` for pending tasks
3. Follow patterns in `architecture/`
4. Document decisions in `decisions/`

### For Medical Experts
1. Review `domain-knowledge/expert-methodologies.md`
2. Validate biomarker ranges and protocols
3. Update clinical guidelines as needed

## 🔄 Development Workflow

1. **Start** with the phase-specific README
2. **Reference** relevant architecture docs
3. **Document** decisions using ADR format
4. **Update** checklists and progress
5. **Review** during sprint planning

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

## 🤖 AI Integration

This memory bank is optimized for AI-assisted development:
- Structured data for reliable parsing
- Clear decision trails
- Versioned knowledge
- Compliance-focused documentation
