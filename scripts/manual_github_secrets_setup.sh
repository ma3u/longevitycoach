#!/bin/bash
# Script to manually set up GitHub Secrets

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if GitHub CLI is available
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI is not installed. Please install it first:${NC}"
    echo "brew install gh"
    exit 1
fi

# Check GitHub authentication
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}🔑 Authenticating with GitHub...${NC}"
    if ! gh auth login; then
        echo -e "${RED}❌ GitHub authentication failed. Please try again.${NC}"
        exit 1
    fi
fi

# Define the repository
REPO_OWNER="ma3u"
REPO_NAME="longevitycoach"

# Function to set a GitHub secret
set_github_secret() {
    local secret_name=$1
    local secret_value=$2
    
    echo -e "\n${YELLOW}🔧 Setting GitHub secret: ${secret_name}${NC}"
    
    # Skip if secret is empty
    if [ -z "$secret_value" ]; then
        echo -e "${RED}❌ Secret value is empty. Skipping.${NC}"
        return 1
    fi
    
    # Set the secret
    if echo -n "$secret_value" | gh secret set "$secret_name" --repo "$REPO_OWNER/$REPO_NAME"; then
        echo -e "${GREEN}✅ Successfully set ${secret_name}${NC}"
        return 0
    else
        echo -e "${RED}❌ Failed to set ${secret_name}${NC}"
        return 1
    fi
}

echo -e "\n${YELLOW}🚀 Starting GitHub Secrets Setup${NC}"
echo -e "${YELLOW}================================${NC}"

# GitHub PAT
echo -e "\n${YELLOW}=== GitHub Access Token ===${NC}"
echo "This will be stored as GH_ACCESS_TOKEN (not GITHUB_* as it's a reserved prefix)"
read -s -p "Enter your GitHub Personal Access Token: " GITHUB_PAT
echo
set_github_secret "GH_ACCESS_TOKEN" "$GITHUB_PAT"

# Perplexity API Key
echo -e "\n${YELLOW}=== Perplexity API Key ===${NC}"
read -s -p "Enter your Perplexity API Key: " PERPLEXITY_API_KEY
echo
set_github_secret "PERPLEXITY_API_KEY" "$PERPLEXITY_API_KEY"

# Supabase Access Token
echo -e "\n${YELLOW}=== Supabase Access Token ===${NC}"
read -s -p "Enter your Supabase Access Token: " SUPABASE_ACCESS_TOKEN
echo
set_github_secret "SUPABASE_ACCESS_TOKEN" "$SUPABASE_ACCESS_TOKEN"

# Firecrawl API Key
echo -e "\n${YELLOW}=== Firecrawl API Key ===${NC}"
read -s -p "Enter your Firecrawl API Key: " FIRECRAWL_API_KEY
echo
set_github_secret "FIRECRAWL_API_KEY" "$FIRECRAWL_API_KEY"

# Firecrawl Config
echo -e "\n${YELLOW}=== Firecrawl Config ===${NC}"
echo "Enter your Firecrawl Config (press Ctrl+D when done):"
FIRECRAWL_CONFIG=$(</dev/stdin)
set_github_secret "FIRECRAWL_CONFIG" "$FIRECRAWL_CONFIG"

echo -e "\n${GREEN}✨ GitHub Secrets setup complete!${NC}"
echo -e "\nYou can verify the secrets were set by running:"
echo "gh secret list --repo $REPO_OWNER/$REPO_NAME"
