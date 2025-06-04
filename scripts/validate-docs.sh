#!/bin/bash

# Validate Markdown files
function validate_markdown() {
    echo "🔍 Validating Markdown files..."
    find memory-bank -name "*.md" -type f -print0 | while IFS= read -r -d $'\0' file; do
        # Check for front matter in documentation files
        if [[ "$file" == *"/domain-knowledge/"* ]]; then
            if ! grep -q '^---' "$file"; then
                echo "❌ Missing front matter in $file"
                exit 1
            fi
        fi
        
        # Run markdownlint
        markdownlint "$file" --config .markdownlint.json
    done
}

# Validate ADR format
function validate_adrs() {
    echo "📝 Validating ADR format..."
    find memory-bank/decisions -name "*.md" -type f | while read -r file; do
        if ! grep -q '^# .*[0-9]+-' "$file"; then
            echo "❌ Invalid ADR format in $file"
            exit 1
        fi
        
        # Check required sections
        local sections=("Status" "Context" "Decision" "Rationale" "Consequences")
        for section in "${sections[@]}"; do
            if ! grep -q "^## $section" "$file"; then
                echo "❌ Missing '$section' section in $file"
                exit 1
            fi
        done
    done
}

# Validate links
function validate_links() {
    echo "🔗 Validating internal links..."
    find memory-bank -name "*.md" -type f -print0 | while IFS= read -r -d $'\0' file; do
        # Check for broken relative links
        grep -o '\[.*\](\([^)]*\))' "$file" | while read -r link; do
            link_path=$(echo "$link" | sed -n 's/.*(\([^)]*\))/\1/p')
            
            # Skip external links
            [[ $link_path == http* ]] && continue
            
            # Handle anchor links
            if [[ $link_path == *#* ]]; then
                local anchor=${link_path#*#}
                local file_path=${link_path%#*}
                
                # If file path is empty, it's an anchor in the same file
                if [[ -z "$file_path" ]]; then
                    if ! grep -q "^##* $anchor" "$file"; then
                        echo "❌ Broken anchor link: $link in $file"
                        exit 1
                    fi
                else
                    if ! grep -q "^##* $anchor" "$(dirname "$file")/$file_path"; then
                        echo "❌ Broken anchor link: $link in $file"
                        exit 1
                    fi
                fi
            else
                if [[ ! -f "$(dirname "$file")/$link_path" ]]; then
                    echo "❌ Broken link: $link in $file"
                    exit 1
                fi
            fi
        done
    done
}

# Main execution
echo "🚀 Starting documentation validation..."
validate_markdown
validate_adrs
validate_links

echo "✅ All documentation validation passed!"
