#!/bin/bash
# Script to migrate secrets from 1Password to GitHub Secrets

# Check if 1Password CLI is available
if ! command -v op &> /dev/null; then
    echo "1Password CLI is not installed. Please install it first."
    exit 1
fi

# Check if GitHub CLI is available
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI is not installed. Please install it first:"
    echo "brew install gh"
    exit 1
fi

# Check if already logged in to GitHub
if ! gh auth status &> /dev/null; then
    echo "Please authenticate with GitHub:"
    gh auth login
fi

# Define the repository
REPO_OWNER="ma3u"
REPO_NAME="longevitycoach"

# Function to set a GitHub secret
set_github_secret() {
    local secret_name=$1
    local secret_value=$2
    
    echo "Setting GitHub secret: $secret_name"
    echo "$secret_value" | gh secret set "$secret_name" --repo "$REPO_OWNER/$REPO_NAME"
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully set $secret_name"
    else
        echo "❌ Failed to set $secret_name"
    fi
}

# Create a temporary file for the secret values
TEMP_FILE=$(mktemp)

# Export secrets from 1Password and set them in GitHub
echo "Migrating secrets from 1Password to GitHub..."

# GitHub PAT
GITHUB_PAT=$(op item get jzweglffnockiskklngdpy7tiy --fields credential)
set_github_secret "GITHUB_PAT" "$GITHUB_PAT"

# Perplexity API Key
PERPLEXITY_API_KEY=$(op item get rqpjddoksxxeklfhuxd4c5ax3e --fields credential)
set_github_secret "PERPLEXITY_API_KEY" "$PERPLEXITY_API_KEY"

# Supabase Access Token
SUPABASE_ACCESS_TOKEN=$(op item get woustoosso55f5wpprivvjhule --fields credential)
set_github_secret "SUPABASE_ACCESS_TOKEN" "$SUPABASE_ACCESS_TOKEN"

# Firecrawl API Key
FIRECRAWL_API_KEY=$(op item get 2sr6ljymrwkh2sx4v5276xokvu --fields api_key)
set_github_secret "FIRECRAWL_API_KEY" "$FIRECRAWL_API_KEY"

# Firecrawl Config
FIRECRAWL_CONFIG=$(op item get 2sr6ljymrwkh2sx4v5276xokvu --fields config)
set_github_secret "FIRECRAWL_CONFIG" "$FIRECRAWL_CONFIG"

# Clean up
rm -f "$TEMP_FILE"
echo "Secret migration complete!"
