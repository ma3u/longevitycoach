---
title: "Mem 001 Memory Management"
description: "Decisions documentation"
created: 2025-06-11
updated: 2025-06-11
authors: 
status: draft
related: []
tags: 
---

# Memory Management System

## Overview
This document outlines the standardized approach to memory management in the Longevity Coach project, including the relationship between different memory storage systems.

## Primary Memory System: Memory-Bank

### Purpose
The `memory-bank` directory serves as the single source of truth for all project knowledge, decisions, and documentation.

### Structure
- `/decisions` - Architecture Decision Records (ADRs) and technical decisions
- `/domain-knowledge` - Business logic, clinical guidelines, and domain expertise
- `/architecture` - System architecture documentation
- `/project-phases` - Documentation organized by project phases
- `/checkpoints` - Project checkpoints and milestones

## GitHub as Secondary Reference

### GitHub Discussions
- Used for open-ended discussions and brainstorming
- Questions and answers about the project
- Community engagement and feedback

### GitHub Issues
- Task and bug tracking
- Feature requests
- Project management

## Synchronization Process

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

## Best Practices

1. **Single Source of Truth**:
   - Memory-bank is the authoritative source
   - GitHub content should be mirrored to memory-bank when relevant

2. **Cross-Referencing**:
   - Always include GitHub issue/PR numbers in related memory-bank documents
   - Link back to memory-bank documents from GitHub discussions when relevant

3. **Ownership**:
   - Team members are responsible for ensuring their discussions/decisions are properly documented in memory-bank
   - PR reviews should verify that memory-bank updates are included when relevant

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

## Review and Maintenance

- Regular audits of memory-bank content
- Cleanup of outdated GitHub discussions
- Periodic review of memory management practices
