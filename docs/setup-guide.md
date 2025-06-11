# Longevity Coach - Setup Guide

This guide will help you set up the Longevity Coach development environment on your local machine, including the recommended Windsurf IDE and Memory Bank configuration.

## Table of Contents

- [System Requirements](#system-requirements)
- [Prerequisites](#prerequisites)
- [Recommended Development Environment](#recommended-development-environment)
- [Installation Steps](#installation-steps)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Memory Bank Setup](#memory-bank-setup)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)


## System Requirements

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher (included with Node.js)
- Git
- A code editor (VS Code recommended)
- 1Password (for secret management)

## Prerequisites

1. **Install Node.js and npm**
   - Download and install from [Node.js official website](https://nodejs.org/)
   - Verify installation:

     ```bash
     node --version
     npm --version
     ```


2. **Install Git**
   - Download from [Git's official website](https://git-scm.com/)
   - Configure your Git identity:

     ```bash
     git config --global user.name "Your Name"
     git config --global user.email "your.email@example.com"
     ```


3. **Install 1Password**
   - Download from [1Password's website](https://1password.com/)
   - Sign in to your 1Password account
   - Install the command-line tool:

     ```bash
     # For macOS (using Homebrew)
     brew install --cask 1password/tap/1password-cli
     ```

## Recommended Development Environment

### Windsurf IDE (Recommended)

Windsurf IDE is our recommended development environment as it provides seamless integration with our Memory Bank system and AI-assisted development features.

1. **Install Windsurf IDE**
   - Download from [Windsurf IDE](https://windsurf.dev)
   - Follow the installation instructions for your operating system

2. **Configure for Longevity Coach**
   - Open Windsurf IDE
   - Install recommended extensions:
     - ESLint
     - Prettier
     - TypeScript Vue Plugin (Volar)
     - GitHub Copilot (optional but recommended)
   - Clone the repository using Windsurf's Git integration

3. **Memory Bank Integration**
   - The Memory Bank is automatically detected in the `memory-bank/` directory
   - Use the Memory Bank view to navigate documentation and decisions
   - Enable AI context awareness for better code suggestions

4. **Key Shortcuts**
   - `Cmd/Ctrl + Shift + P` - Open command palette
   - `Cmd/Ctrl + P` - Quick open files
   - `Cmd/Ctrl + Shift + F` - Search across files
   - `F1` - Show all commands

5. **Recommended Settings**
   - Enable Auto Save
   - Set up TypeScript validation
   - Configure Prettier as default formatter


## Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/longevitycoach/longevitycoach.git
   cd longevitycoach
   ```


2. **Set up environment variables**
   - Create a `.env` file in the project root
   - Add the following environment variables:
     ```
     NODE_ENV=development
     NEXT_PUBLIC_API_URL=http://localhost:3000/api
     ```

3. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

4. **Set up 1Password CLI**
   ```bash
   # Sign in to 1Password
   eval $(op signin)

   # Verify access
   op vault list
   ```

## Configuration

### Frontend Configuration

1. **Environment Variables**
   - Copy `.env.example` to `.env.local` in the frontend directory
   - Update the variables as needed

2. **API Configuration**
   - Ensure the API URL points to your local development server
   - Configure any feature flags as needed

### Backend Configuration

1. **Database Setup**
   - Install and configure PostgreSQL
   - Create a new database
   - Update the database connection string in your environment variables

2. **Authentication**
   - Set up authentication providers (if applicable)
   - Configure OAuth credentials

## Running the Application

### Development Mode

1. **Start the development server**
   ```bash
   # From the frontend directory
   cd frontend
   npm run dev
   ```

2. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

1. **Build the application**
   ```bash
   # From the project root
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## Memory Bank Setup

The Memory Bank is our central knowledge repository for architectural decisions, domain knowledge, and project documentation. It's automatically integrated with Windsurf IDE.

### Accessing the Memory Bank

1. **In Windsurf IDE**
   - Open the Memory Bank view from the sidebar
   - Browse documentation by category
   - Use the search functionality to find specific information

2. **Web Interface**
   - The Memory Bank is also accessible via GitHub at `memory-bank/`
   - View rendered markdown files directly on GitHub

### Contributing to the Memory Bank

1. **Documentation Structure**
   - `architecture/` - System design and technical specifications
   - `decisions/` - Architectural Decision Records (ADRs)
   - `domain-knowledge/` - Healthcare expertise and regulations
   - `planning/` - Project planning and documentation

2. **Adding New Content**
   - Create new markdown files in the appropriate directory
   - Follow the existing templates and conventions
   - Include frontmatter with metadata (title, description, tags)

3. **Updating Documentation**
   - Keep documentation up-to-date with code changes
   - Reference related issues and PRs
   - Use clear, concise language

4. **Best Practices**
   - Keep lines under 100 characters
   - Use descriptive headings and lists
   - Include code examples where helpful
   - Add diagrams for complex concepts

## Troubleshooting

### Common Issues

1. **Dependency Issues**
   ```bash
   # Clear npm cache and reinstall dependencies
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

2. **Environment Variables Not Loading**
   - Ensure the `.env` file is in the correct location
   - Verify variable names match those expected by the application
   - Restart your development server after making changes

3. **Database Connection Issues**
   - Verify the database server is running
   - Check connection strings and credentials
   - Ensure the database user has the correct permissions

### Getting Help

If you encounter issues not covered in this guide:
1. Check the [GitHub Issues](https://github.com/longevitycoach/longevitycoach/issues)
2. Search the [documentation](https://github.com/longevitycoach/longevitycoach#readme)
3. Ask for help in the project's discussion forum

## Next Steps

- [Contribution Guidelines](../CONTRIBUTING.md)
- [Code of Conduct](../CODE_OF_CONDUCT.md)
- [Project Wiki](https://github.com/longevitycoach/longevitycoach/wiki)

---
Last updated: June 11, 2025
