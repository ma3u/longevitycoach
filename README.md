# Longevity Coach

A comprehensive health and wellness platform focused on longevity and preventive care.

## Features

- Blood test tracking and analysis
- Health metrics monitoring
- Personalized recommendations
- Data visualization

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- 1Password CLI (for secrets management)
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
