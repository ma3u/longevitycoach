#!/bin/bash

# Fix markdown linting issues in system-patterns.md
FILE="memory-bank/system-patterns.md"
TEMP_FILE="${FILE}.tmp"

# Create a backup
cp "$FILE" "${FILE}.bak"

# Process the file
{
  # Fix multiple top-level headings by removing the second one
  awk '/^# / { if (++count > 1) next } { print }' "$FILE" |
  # Fix line length by wrapping at 120 characters
  fold -s -w 120 |
  # Add blank lines around headings
  sed -E 's/^(#+) (.+)/\n\1 \2\n/g' |
  # Add blank lines around lists
  sed -E ':a;N;$!ba; s/([^\n])\n([*-])/\1\n\n\2/g' |
  sed -E ':a;N;$!ba; s/([*-].*)\n([^\n])/\1\n\n\2/g' |
  # Clean up multiple blank lines
  cat -s
} > "$TEMP_FILE"

# Replace original file if changes were made
if ! cmp -s "$FILE" "$TEMP_FILE"; then
  mv "$TEMP_FILE" "$FILE"
  echo "Fixed markdown linting issues in $FILE"
  echo "Original file backed up to ${FILE}.bak"
else
  rm "$TEMP_FILE"
  echo "No markdown linting issues found in $FILE"
fi
