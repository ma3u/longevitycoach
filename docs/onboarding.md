# Longevity Coach - Team Onboarding Guide

Welcome to the Longevity Coach team! This guide will help you get set up and productive as quickly as possible.

## First Day Checklist

### Before You Start
- [ ] Complete HR onboarding (if applicable)
- [ ] Set up your work email and accounts
- [ ] Request access to necessary tools and systems
- [ ] Schedule 1:1 with your onboarding buddy

### Development Environment Setup
- [ ] Install required software (from [Setup Guide](../docs/setup-guide.md))
- [ ] Clone the repository
- [ ] Set up environment variables
- [ ] Install dependencies
- [ ] Run the application locally

### Access & Accounts
- [ ] GitHub access with appropriate permissions
- [ ] 1Password setup and access to shared vaults
- [ ] Project management tool access (e.g., Linear, Jira)
- [ ] Communication tools (Slack, email groups)

## Development Environment

### Recommended Tools
- **Code Editor**: VS Code with recommended extensions
- **Terminal**: iTerm2 (macOS), Windows Terminal (Windows)
- **Version Control**: Git with SSH keys
- **Containerization**: Docker (if applicable)
- **API Testing**: Postman or Insomnia

### VS Code Extensions
- ESLint
- Prettier
- GitLens
- Docker
- EditorConfig
- Markdown All in One

## Team Communication

### Channels
- **General Discussion**: #general
- **Development**: #dev
- **Design**: #design
- **Support**: #support

### Meetings
- **Daily Standup**: Weekdays at 10:00 AM (timezone)
- **Sprint Planning**: Every other Monday at 1:00 PM
- **Retrospective**: Last Friday of each sprint at 2:00 PM

## Project Structure

```
longevitycoach/
├── frontend/           # Frontend application
├── backend/            # Backend services
├── docs/               # Project documentation
├── memory-bank/        # Project knowledge base
├── tests/              # Test suites
└── scripts/            # Development scripts
```

## Development Workflow

### Branch Naming
Format: `type/description`

Types:
- `feat/`: New features
- `fix/`: Bug fixes
- `docs/`: Documentation updates
- `style/`: Code style changes
- `refactor/`: Code refactoring
- `test/`: Test updates
- `chore/`: Maintenance tasks

### Pull Requests
1. Create a feature branch from `main`
2. Make your changes with clear, atomic commits
3. Push your branch and create a PR
4. Request reviews from at least one team member
5. Address all review comments
6. Ensure all tests pass
7. Get approval before merging

## Learning Resources

### Project-Specific
- [Project Vision](../memory-bank/project-vision.md)
- [Architecture Decision Records](../memory-bank/decisions/)
- [Coding Standards](../docs/standards/coding-standards.md)

### General Development
- [Git Documentation](https://git-scm.com/doc)
- [JavaScript Best Practices](https://github.com/airbnb/javascript)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)

## Getting Help

### Who to Ask
- **Technical Questions**: Your onboarding buddy or team lead
- **HR Questions**: HR department
- **Access Issues**: IT support

### Support Channels
- **Slack**: #help channel
- **Email**: support@longevitycoach.com
- **Emergency**: On-call engineer (contact info in 1Password)

## 30-60-90 Day Plan

### First 30 Days
- Complete onboarding tasks
- Set up development environment
- Complete initial training
- Make first contribution

### Days 31-60
- Take ownership of small features
- Participate in code reviews
- Attend team ceremonies
- Begin on-call rotation (if applicable)

### Days 61-90
- Lead a small feature
- Mentor new team members
- Contribute to technical documentation
- Provide feedback on onboarding process

## Feedback

We value your feedback on the onboarding process. After 30 days, you'll receive a survey to help us improve the experience for future team members.

---
Last updated: June 11, 2025
