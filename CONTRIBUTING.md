# Contributing to Longevity Coach

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/your-username/longevitycoach/pulls)
[![GitHub issues](https://img.shields.io/github/issues/your-username/longevitycoach)](https://github.com/your-username/longevitycoach/issues)
[![License](https://img.shields.io/github/license/your-username/longevitycoach)](LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

Thank you for your interest in contributing to Longevity Coach! We're excited to have you on board. This guide will help you get started with contributing to our project following our development workflow.

> **Note**: Before you start, please read our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to fostering a welcoming and inclusive community.

## Table of Contents

- [Development Workflow](#development-workflow)
  - [Branching Strategy](#branching-strategy)
  - [Making Changes](#making-changes)
  - [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
  - [Creating a Pull Request](#creating-a-pull-request)
  - [Code Review Process](#code-review-process)
  - [Merging and Deployment](#merging-and-deployment)
- [Code Quality](#code-quality)
  - [Testing](#testing)
  - [Linting and Formatting](#linting-and-formatting)
- [Documentation](#documentation)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)
- [Community](#community)
- [Need Help?](#need-help)

## Development Workflow

We follow the [GitHub Flow](https://guides.github.com/introduction/flow/) for our development process. Here's how it works:

### Branching Strategy

1. **Main Branches**
   - `main`: Production-ready code. Always deployable.
   - `develop`: Integration branch for features. Deployed to staging.

2. **Feature Branches**
   - Create a new branch for each feature or bugfix
   - Use the naming convention: `type/issue-number-short-description`
   - Types: `feature/`, `bugfix/`, `hotfix/`, `docs/`

Example:
```bash
git checkout -b feature/123-add-user-authentication
```

### Making Changes

1. **Start with an Issue**
   - Every change should have a corresponding issue
   - Assign the issue to yourself
   - Use the issue number in your branch name

2. **Keep Changes Focused**
   - One feature/bugfix per pull request
   - Keep changes small and focused
   - Avoid mixing unrelated changes

### Commit Guidelines

- Write clear, concise commit messages
- Use the conventional commit format:
  ```
  type(scope): short description
  
  More detailed description if needed
  
  Refs: #issue-number
  ```
  
  Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(auth): add login form component

- Create login form with email/password fields
- Add form validation
- Style according to design system

Refs: #123
```

## Pull Request Process

### Creating a Pull Request

1. **When to Create a PR**
   - When the feature is complete and ready for review
   - For early feedback (mark as Draft PR)

2. **PR Requirements**
   - Link to the related issue
   - Clear description of changes
   - Screenshots/GIFs for UI changes
   - Update relevant documentation
   - All tests passing
   - Code follows project standards

3. **PR Template**
   We provide a PR template that includes:
   - Description of changes
   - Related issues
   - Type of change
   - Checklist for quality assurance
   - Screenshots (if applicable)

### Code Review Process

1. **Reviewers**
   - At least one approval required before merging
   - Assign appropriate reviewers
   - Use GitHub's review tools

2. **Review Guidelines**
   - Check for code quality and consistency
   - Verify tests are present and passing
   - Ensure documentation is updated
   - Look for potential security issues

3. **Addressing Feedback**
   - Push new commits to address feedback
   - Resolve conversations when addressed
   - Request re-review if needed

### Merging and Deployment

- Use "Squash and merge" for feature branches
- Delete the branch after merging
- PRs merged to `main` are automatically deployed
- Monitor for issues after deployment

## Code Quality

### Testing

- Write unit tests for new features
- Update tests when fixing bugs
- Ensure all tests pass before creating a PR
- Test in multiple environments if applicable

### Linting and Formatting

- Run linter before committing
- Follow the project's coding style
- Use Prettier for consistent formatting
- Fix all warnings and errors

## Documentation

- Update documentation when adding new features
- Keep documentation in sync with code changes
- Follow the documentation style guide
- Add examples where helpful

## Reporting Issues

When reporting issues, please include:

1. Clear description of the problem
2. Steps to reproduce
3. Expected vs actual behavior
4. Environment details
5. Screenshots or logs if applicable

## Feature Requests

We welcome feature requests! Please:

1. Check if a similar feature already exists
2. Explain the problem it solves
3. Describe your proposed solution
4. Include any relevant examples

## Community

- Join our [Discord/Slack]() channel
- Follow us on [Twitter]()
- Read our [blog]()

## Need Help?

If you have questions or need help:

1. Check the [documentation](/docs/)
2. Search existing issues
3. Ask in our [community chat]()
4. Open an issue if you've found a bug

---

Thank you for contributing to Longevity Coach! Your contributions help make this project better for everyone.
   cd longevitycoach
   ```

3. **Set up the development environment**

   ```bash
   # Install dependencies
   npm install
   
   # Set up environment variables
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Workflow

### Branch Strategy

We follow the [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) branching model:

- `main` - Production-ready code (protected branch)
- `develop` - Integration branch for features (protected branch)
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes
- `release/*` - Release preparation

### Branch Naming Convention

```bash
type/[ticket-id]-short-description
```

Examples:

- `feature/123-add-user-authentication`
- `bugfix/124-fix-login-error`
- `hotfix/125-security-patch`

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/123-descriptive-name
   ```

2. **Make your changes**
   - Follow the [code style guide](#code-style)
   - Write tests for new features
   - Update documentation as needed

3. **Run tests**
   ```bash
   # Run all tests
   npm test

   # Run tests in watch mode
   npm test -- --watch

   # Run specific test file
   npm test -- path/to/test/file.test.ts
   ```

4. **Lint your code**
   ```bash
   # Lint your code
   npm run lint
   ```

### Committing Changes

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Commit Types**:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Example**:

```bash
feat(auth): add Google OAuth login

Add support for Google OAuth authentication using NextAuth.js.

Closes #123
```

## Pull Request Process

1. **Update your fork**
   ```bash
   git fetch upstream
   git checkout develop
   git merge upstream/develop
   git checkout your-branch
   git rebase develop
   ```

2. **Run all tests and linters**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

3. **Update CHANGELOG.md** if your changes are user-facing

4. **Create a Pull Request**
   - Target the `develop` branch
   - Fill out the PR template
   - Link related issues using keywords (e.g., "Closes #123")
   - Request reviews from relevant team members
   - Ensure all CI checks pass

5. **Address review feedback**
   - Make requested changes
   - Push updates to your branch
   - The PR will automatically update

## Code Review Guidelines

### As a Reviewer
- Be kind and constructive
- Focus on the code, not the person
- Explain the "why" behind requested changes
- Suggest improvements, not just point out issues
- Acknowledge good practices

### As a Contributor
- Be open to feedback
- Ask questions if something isn't clear
- Keep discussions focused on the code
- Address all feedback before marking as resolved
- Keep commits focused and atomic

## Documentation

### Memory Bank System

The Memory Bank is our central knowledge repository located in the `memory-bank/` directory.

#### Key Components

- **Decisions**: Architectural Decision Records (ADRs) in `decisions/`
- **Planning**: Project planning documents in `planning/`
- **Architecture**: System design documents in `architecture/`
- **Domain Knowledge**: Healthcare expertise and regulations in `domain-knowledge/`

#### Creating a New Decision Record

1. Use the automated script:
   ```bash
   node scripts/create-decision-record.mjs <id> "<title>" "<description>"
   ```
   Example:
   ```bash
   node scripts/create-decision-record.mjs 012 "API Versioning" "Approach for versioning our REST API"
   ```

2. The script will:
   - Create a new decision record with proper frontmatter
   - Add an entry to the decision log
   - Use the correct naming convention: `dec-<id>-<kebab-case-title>.md`

#### Documentation Standards

- Follow [conventions.md](memory-bank/conventions.md)
- Keep lines under 120 characters
- Use proper heading hierarchy
- Include required frontmatter
- Update relevant indexes

#### Validation

Before committing changes, run:
```bash
node scripts/validate-memory-bank.js
```

## Code Style

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow [TypeScript style guide](https://google.github.io/styleguide/tsguide.html)
- Use ESLint and Prettier for consistent formatting
- Keep functions small and focused (max 50 lines)
- Use meaningful variable and function names

### React/Next.js

- Use functional components with hooks
- Follow the [React Hooks API Reference](https://react.dev/reference/react)
- Use TypeScript interfaces for props and state
- Keep components small and focused
- Use [Next.js App Router](https://nextjs.org/docs/app) conventions

### Testing

- Write tests using Jest and React Testing Library
- Follow [Testing Library best practices](https://testing-library.com/docs/guiding-principles/)
- Aim for high test coverage (minimum 80%)
- Test behavior, not implementation
- Use [MSW](https://mswjs.io/) for API mocking

## Reporting Issues

Found a bug? Please help us by [submitting an issue](https://github.com/your-username/longevitycoach/issues/new/choose).

### Before Submitting an Issue
1. Check if the issue has already been reported
2. Update to the latest version
3. Try to reproduce the issue in a clean environment

### Issue Template

```markdown
## Description

## Steps to Reproduce

1. 
2. 
3. 

## Expected Behavior

## Actual Behavior

## Environment

- OS: [e.g., macOS 14.0, Windows 11]
- Browser: [e.g., Chrome 115, Safari 16.6]
- Node.js Version: [e.g., 18.16.0]
- npm Version: [e.g., 9.5.1]

## Additional Information

- Screenshots
- Error messages
- Related issues/PRs
```

## Feature Requests

Have an idea for a new feature? [Submit a feature request](https://github.com/your-username/longevitycoach/issues/new?template=feature_request.md).

### Before Submitting a Feature Request
1. Check if the feature has already been requested
2. Consider if it aligns with the project's goals
3. Be specific about the problem you're trying to solve

## Community

- Join our [Discord server](https://discord.gg/example)
- Follow us on [Twitter](https://twitter.com/longevitycoach)
- Read our [blog](https://blog.longevitycoach.app)

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
