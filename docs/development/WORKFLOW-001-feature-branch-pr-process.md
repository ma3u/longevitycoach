---
title: "Feature Branch and Pull Request Process"
description: "Standard workflow for feature development and code review using GitHub"
created: 2025-06-11
updated: 2025-06-11
authors: "Longevity Coach Team"
status: draft
related: 
  - "SDLC-001-github-sprint-management.md"
tags: ["workflow", "git", "code-review", "sdlc"]
---

# Feature Branch and Pull Request Process

## Overview
This document defines the standard workflow for developing new features and managing changes through pull requests (PRs) in the Longevity Coach project. This process ensures code quality, facilitates code reviews, and enables clear release notes.

## Table of Contents
- [1. Branching Strategy](#1-branching-strategy)
- [2. Creating a Feature Branch](#2-creating-a-feature-branch)
- [3. Development Workflow](#3-development-workflow)
- [4. Creating a Pull Request](#4-creating-a-pull-request)
- [5. Code Review Process](#5-code-review-process)
- [6. Merging and Deployment](#6-merging-and-deployment)
- [7. Release Notes](#7-release-notes)

## 1. Branching Strategy

### Main Branches
- `main`: Production-ready code. Always deployable.
- `develop`: Integration branch for features. Deployed to staging environment.

### Supporting Branches
- `feature/`: New features and enhancements
- `bugfix/`: Bug fixes
- `hotfix/`: Critical production fixes
- `release/`: Release preparation

## 2. Creating a Feature Branch

### Naming Convention
```
feature/[issue-id]-short-description
bugfix/[issue-id]-short-description
hotfix/[issue-id]-short-description
```

### Steps
1. Ensure your local `main` is up to date:
   ```bash
   git checkout main
   git pull origin main
   ```

2. Create and switch to a new branch:
   ```bash
   git checkout -b feature/123-add-user-authentication
   ```

## 3. Development Workflow

### Commit Guidelines
- Write clear, concise commit messages
- Reference the issue number in each commit
- Keep commits focused and atomic
- Use the imperative mood ("Add" not "Added" or "Adds")

Example:
```
git commit -m "feat(auth): add login form component

- Create login form with email/password fields
- Add form validation
- Style according to design system

Refs: #123"
```

### Keeping Your Branch Updated
Regularly rebase on `main` to avoid merge conflicts:
```bash
git fetch origin
git rebase origin/main
```

## 4. Creating a Pull Request

### When to Create a PR
- When the feature is complete and ready for review
- For early feedback on work in progress (mark as Draft PR)

### PR Requirements
- Link to the related issue
- Clear description of changes
- Screenshots/GIFs for UI changes
- Update relevant documentation
- All tests passing
- Code follows project standards

### PR Template
```markdown
## Description
[Brief description of changes]

## Related Issues
Fixes #123

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules

## Screenshots (if applicable)
[Add screenshots here if relevant]
```

## 5. Code Review Process

### Reviewers
- At least one approval required before merging
- Assign reviewers based on code ownership
- Use GitHub's review tools for comments and suggestions

### Review Guidelines
- Check for code quality and consistency
- Verify tests are present and passing
- Ensure documentation is updated
- Look for potential security issues
- Check for performance implications

### Addressing Feedback
1. Push new commits to address feedback
2. Resolve conversations when addressed
3. Request re-review if needed

## 6. Merging and Deployment

### Merge Process
- Use "Squash and merge" for feature branches
- Delete the branch after merging
- Ensure the PR is linked to the issue

### Deployment
- PRs merged to `main` are automatically deployed to production
- Use feature flags for gradual rollouts
- Monitor for issues after deployment

## 7. Release Notes

### Automatic Generation
- Use GitHub's "Generate release notes" feature
- Include PR titles and descriptions
- Group by feature/bugfix/etc.

### Manual Additions
- Breaking changes
- Migration instructions
- Known issues

## Windsurf Integration

### Branch Protection Rules
- Require pull request reviews before merging
- Require status checks to pass before merging
- Require linear history
- Do not allow bypassing the above settings

### Required Checks
- Linting
- Unit tests
- E2E tests
- Build verification

## Best Practices

### Keep PRs Small
- Focus on a single feature or fix
- Aim for under 500 lines of changes
- Split large features into smaller, reviewable chunks

### Meaningful Descriptions
- Explain the "why" not just the "what"
- Document any technical decisions
- Include testing instructions

### Clean History
- Interactive rebase to clean up WIP commits
- Use `git commit --fixup` and `git rebase -i --autosquash`

## Troubleshooting

### Merge Conflicts
1. Rebase on the latest `main`
2. Resolve conflicts
3. Continue rebase
4. Force push if needed (only on your feature branch)

### Stale Branches
- Delete merged branches
- Regularly clean up abandoned branches
- Use `git remote prune origin` to clean up local refs
