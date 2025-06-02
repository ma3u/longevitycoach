# Contributing to Longevity Coach

Thank you for your interest in contributing to our project! This document outlines the process for contributing to the Longevity Coach codebase.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/longevitycoach.git
   cd longevitycoach
   ```
3. **Set up the development environment**
   ```bash
   # Install dependencies
   cd frontend
   npm install
   ```

## Branch Strategy

We follow a feature branch workflow:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes
- `release/*` - Release preparation

### Branch Naming Convention

```
type/[ticket-id]-short-description
```

Example: `feature/123-add-user-authentication`

## Development Workflow

1. Create a new branch from `develop`
2. Make your changes
3. Write tests for your changes
4. Ensure all tests pass
5. Update documentation as needed
6. Submit a pull request

## Pull Request Process

1. Ensure your branch is up to date with `develop`
2. Run all tests
3. Update the CHANGELOG.md if applicable
4. Submit your PR with a clear description
5. Request reviews from relevant team members
6. Address any feedback
7. Once approved, squash and merge

## Code Style

- Follow the existing code style
- Keep functions small and focused
- Write meaningful commit messages
- Document public APIs
- Add comments for complex logic

## Testing

- Write unit tests for new features
- Ensure all tests pass before submitting a PR
- Update tests when fixing bugs
- Test in multiple environments

## Code Review

- Be constructive and kind
- Focus on the code, not the person
- Suggest improvements, not just point out issues
- Respond to feedback promptly

## Reporting Issues

When creating an issue, please include:

- A clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

## License

By contributing, you agree that your contributions will be licensed under the project's [LICENSE](LICENSE) file.
