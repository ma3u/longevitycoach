#!/bin/bash

# Script to set up branch protection rules for the repository
# Requires GitHub CLI (gh) to be installed and authenticated

set -e

# Define the repository owner and name
REPO_OWNER="longevitycoach"
REPO_NAME="longevitycoach"

# Define protected branches
PROTECTED_BRANCHES=("main" "develop")

# Function to set branch protection
set_branch_protection() {
  local branch=$1
  
  echo "Setting up protection for branch: $branch"
  
  # Apply branch protection rules
  gh api \
    --method PUT \
    -H "Accept: application/vnd.github.v3+json" \
    "/repos/$REPO_OWNER/$REPO_NAME/branches/$branch/protection" \
    --input .github/branch-protection.json
    
  echo "Protection rules applied to $branch"
}

# Main script
echo "Setting up branch protection for $REPO_OWNER/$REPO_NAME"

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "Error: GitHub CLI (gh) is not installed."
    echo "Please install it from https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated with GitHub CLI
if ! gh auth status &> /dev/null; then
    echo "Error: Not authenticated with GitHub CLI."
    echo "Please run 'gh auth login' to authenticate."
    exit 1
fi

# Apply protection to each branch
for branch in "${PROTECTED_BRANCHES[@]}"; do
  set_branch_protection "$branch"
done

echo "Branch protection setup complete!"
