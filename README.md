# Longevity Coach

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Windsurf IDE](https://img.shields.io/badge/IDE-Windsurf-0078d7.svg)](https://windsurf.dev)

A comprehensive health and wellness platform focused on longevity and preventive care, helping users track biomarkers, analyze health trends, and receive personalized recommendations for optimal healthspan.

## 📚 Documentation

- [Setup Guide](docs/setup-guide.md) - Get started with development environment setup
- [Architecture](memory-bank/architecture/README.md) - System design and technical specifications
- [Contributing](CONTRIBUTING.md) - How to contribute to the project
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community guidelines and standards
- [Memory Bank](memory-bank/README.md) - Project knowledge base and decisions

A comprehensive health and wellness platform focused on longevity and preventive care, helping users track biomarkers, analyze health trends, and receive personalized recommendations for optimal healthspan.

## 🌟 Key Features

### 🔍 Health Insights
- **Biomarker Tracking**: Monitor key health indicators over time
- **Trend Analysis**: Visualize health data with interactive charts
- **Reference Ranges**: Compare results against optimal health ranges
- **Risk Assessment**: Identify potential health risks early

### 🎯 Personalized Guidance
- **Custom Recommendations**: Tailored health and lifestyle suggestions
- **Goal Setting**: Define and track health objectives
- **Actionable Insights**: Data-driven guidance for improvement
- **Progress Tracking**: Monitor improvements over time

### 📊 Data Integration
- **Lab Result Import**: Connect with major laboratories
- **Wearable Sync**: Import data from health devices
- **FHIR Support**: Standardized health data exchange
- **Secure Storage**: HIPAA-compliant data management

### 📱 User Experience
- **Responsive Design**: Works on all devices
- **Dark/Light Mode**: Choose your preferred theme
- **Data Export**: Download your health records
- **Reminders**: Never miss a health check-up

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18.0.0 or later
- [npm](https://www.npmjs.com/) 9.0.0 or later
- [1Password CLI](https://1password.com/downloads/command-line/) (for secret management)
- [Docker](https://www.docker.com/) (for local development)
- [Windsurf IDE](https://windsurf.dev) (recommended)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/longevitycoach/longevitycoach.git
   cd longevitycoach
   ```

2. **Set up your development environment**
   - Follow the [Setup Guide](docs/setup-guide.md) for detailed instructions
   - Recommended: Use Windsurf IDE for the best development experience

3. **Install dependencies**
   ```bash
   npm install
   cd frontend
   npm install
   cd ..
   ```

4. **Configure environment**
   ```bash
   # Set up 1Password CLI
   eval $(op signin)
   op run --env-file=.env.example --no-masking -- npm run dev
   ```

5. **Start the development server**
   ```bash
   # From the project root
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

6. **Run tests**
   ```bash
   # Run all tests
   npm test
   
   # Run specific test files
   npm test -- path/to/test/file.test.ts
   ```

## 🏗️ Project Structure

```
longevitycoach/
├── .github/            # GitHub workflows and templates
│   └── workflows/      # CI/CD workflows
│   └── ISSUE_TEMPLATE/ # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md
├── .windsurf/          # Windsurf IDE configuration
├── docs/               # Documentation files
│   ├── setup-guide.md
│   └── onboarding.md
├── frontend/           # Frontend application
│   ├── public/        # Static files
│   ├── src/           # Source code
│   │   ├── app/       # Next.js app router
│   │   ├── components/# Reusable UI components
│   │   ├── lib/       # Utility functions
│   │   └── styles/    # Global styles
│   └── tests/         # Test files
├── memory-bank/        # Project knowledge base
│   ├── architecture/  # System design docs
│   ├── decisions/     # ADRs
│   ├── planning/      # Project planning
│   └── README.md
├── .editorconfig      # Editor configuration
├── .eslintrc.json     # ESLint configuration
├── .gitignore         # Git ignore rules
├── .prettierrc        # Prettier config
├── CONTRIBUTING.md    # Contribution guidelines
├── CODE_OF_CONDUCT.md # Community standards
└── package.json       # Project dependencies
```

## 🛠️ Development

### Code Style
- [Prettier](https://prettier.io/) for consistent code formatting
- [ESLint](https://eslint.org/) for code quality and best practices
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Conventional Commits](https://www.conventionalcommits.org/) for commit messages

### Development Workflow

1. **Before starting work**
   - Check the [Memory Bank](memory-bank/README.md) for relevant decisions and context
   - Review open issues and discussions
   - Create a new branch following our naming convention:
     ```
     feature/description-of-feature
     bugfix/description-of-fix
     docs/description-of-changes
     ```

2. **Making changes**
   - Write clear, focused commits
   - Include tests for new functionality
   - Update documentation as needed
   - Follow our [Contribution Guidelines](CONTRIBUTING.md)

3. **Submitting changes**
   - Push your branch to the remote repository
   - Open a Pull Request with a clear description
   - Reference any related issues
   - Request reviews from relevant team members

### Testing

We use a comprehensive testing strategy including:

- Unit tests for individual components and functions
- Integration tests for API endpoints
- End-to-end tests for critical user flows
- Performance benchmarks for key operations

Run tests with:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm run test:coverage
```

### Memory Bank

The [Memory Bank](memory-bank/README.md) is our central knowledge repository containing:

- [Architecture Decisions](memory-bank/decisions/)
- [System Design](memory-bank/architecture/)
- [Domain Knowledge](memory-bank/domain-knowledge/)
- [Planning Documents](memory-bank/planning/)

All significant decisions and architectural changes should be documented here.
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and commit them with a descriptive message
3. Push your branch and open a pull request

### Testing
- Unit tests: `npm test`

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Report bugs** - Open an issue with detailed reproduction steps
2. **Suggest enhancements** - Propose new features or improvements
3. **Submit code** - Send a pull request following our [Contribution Guidelines](CONTRIBUTING.md)
4. **Improve documentation** - Help make our docs better
5. **Answer questions** - Help others in our community

### First Time Contributors

New to open source? Check out our [Good First Issues](https://github.com/longevitycoach/longevitycoach/contribute) to get started.

### Code Review Process

1. Create a pull request with a clear description of changes
2. Ensure all tests pass and code coverage remains high
3. Request reviews from relevant team members
4. Address all review feedback
5. Once approved, a maintainer will merge your changes

For more details, see our [Contribution Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For support or questions, please open an issue or contact us at support@longevitycoach.app

---

## Project Status

### Current State (June 2025)

- **Active Development**: Currently in initial development phase (Sprint 1)
- **Core Infrastructure**: In progress
- **CI/CD Pipeline**: Under development
- **Documentation**: Being established

### Key Metrics

| Category | Status |
|----------|--------|
| **Sprint Progress** | Sprint 1 in progress |
| **Open Issues** | 11 |
| **Closed Issues** | 0 |
| **Test Coverage** | TBD |
| **Latest Release** | Pre-release |

### Recent Updates

- **Project Structure**: Initialized with Next.js and TypeScript
- **Memory Bank**: Basic implementation in progress
- **Documentation**: Initial setup complete
- **CI/CD**: Pipeline configuration started

### Next Steps

1. Complete Memory Bank system implementation
2. Set up automated testing
3. Implement initial static pages
4. Configure CI/CD pipeline
5. Enhance documentation

### Prerequisites

- Node.js 18.0.0 or later
- npm 9.0.0 or later
- Git
- 1Password CLI (for secrets management)

### Development Setup

#### Backup and Version Control

This project uses **GitHub's version control system** as the primary backup mechanism. Here's what you need to know:

1. **No Local Backups**: `.bak` files are excluded from version control (see [.gitignore](.gitignore)).
2. **File Recovery**: Use Git's history to recover previous versions of files:

   ```bash
   # View file history
   git log -- path/to/file
   
   # Restore a specific version
   git checkout <commit-hash> -- path/to/file
   ```

3. **Documentation**: For details on the backup strategy, see [DEC-011: Data Encryption and Backup Strategy](memory-bank/decisions/dec-011-data-encryption.md).

#### Setting Up Your Development Environment

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/longevitycoach.git
   cd longevitycoach
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies (Husky, lint-staged)
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Set up environment variables**

   ```bash
   # Copy the example environment file
   cp .env.local.example .env.local
   
   # Update the environment variables in .env.local as needed
   ```

4. **Start the development server**

   ```bash
   # From the project root
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

### Available Scripts

From the project root:

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

From the frontend directory:

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

### Code Quality

- **ESLint**: Code linting with TypeScript and React plugins
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on git staged files

### Git Hooks

Pre-commit hooks are set up to:

- Run ESLint on staged files
- Format code with Prettier

### Browser Support

The application supports the latest versions of:

- Chrome
- Firefox
- Safari
- Edge

## Project Structure

```text
.
├── frontend/              # Frontend Next.js application
│   ├── src/               # Source files
│   │   ├── app/           # App router pages
│   │   ├── components/    # Reusable components
│   │   ├── features/      # Feature modules
│   │   ├── lib/           # Utility functions
│   │   └── styles/        # Global styles
│   ├── public/            # Static files
│   └── ...
├── scripts/              # Utility scripts
└── memory-bank/          # Project documentation and planning
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
- GitHub CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ma3u/longevitycoach.git
   cd longevitycoach
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment:

   ```bash
   cp .env.example .env.local
   # The .env.local file contains 1Password references that will be resolved at runtime
   ```

4. Sign in to 1Password (run this in your terminal):

   ```bash
   eval $(op signin)
   # This will open a browser window for authentication
   ```

5. Start the development server:

   ```bash
   # Run with 1Password environment variables
   op run --env-file=.env.local \
     --no-masking -- \
     npm run dev
   ```

## Memory Bank

This project uses GitHub as a memory bank for tracking decisions, progress, and system patterns. See the `memory-bank` directory for more information.

## Secrets Management

We use 1Password for secure secret management with biometric authentication support. All sensitive credentials are stored in 1Password and referenced in `.env.local`.

### Prerequisites

1. Install 1Password Desktop App (version 8.10.0 or later)
2. Install 1Password CLI:

   ```bash
   # macOS
   brew install --cask 1password/tap/1password-cli
   ```

### 1Password Setup

1. **Enable Developer Settings**:
   - Open 1Password desktop app
   - Go to Settings > Developer
   - Enable both options:
     - ☑️ Connect with 1Password CLI
     - ☑️ Enable SSH Agent

2. **Configure Shell**:

   Add these lines to your `~/.zshrc` or `~/.bash_profile`:

   ```bash
   # 1Password SSH Agent
   export SSH_AUTH_SOCK=~/Library/Group\ Containers/2BUA8C4S2C.com.1password/t/agent.sock
   export OP_BIOMETRIC_UNLOCK_ENABLED=true
   
   # 1Password signin alias
   alias opsignin='eval $(op signin)'
   ```

3. **Apply Changes**:

   ```bash
   # For zsh
   source ~/.zshrc
   
   # OR for bash
   # source ~/.bash_profile
   ```

### Development Workflow

1. **Sign in** (using Touch ID):

   ```bash
   opsignin
   ```

2. **Run with secrets**:

   ```bash
   op run --env-file=.env.local \
     --no-masking -- \
     npm run dev
   ```

### Security Rules

- 🔒 Never commit `.env` files
- 🔑 Use 1Password references in configuration
- 🔄 Rotate secrets every 90 days
- 🔐 Use biometric authentication for CLI access

For detailed information, see [Secrets Management Documentation](docs/adr/0002-secrets-management.md).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.

## Project Status

Active development in progress. See the [project board](https://github.com/ma3u/longevitycoach/projects/1) for current status.
