#!/usr/bin/env node

import { writeFile, mkdir, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const decisionsDir = join(rootDir, 'memory-bank', 'decisions');
const decisionLogPath = join(rootDir, 'memory-bank', 'decision-log.md');

// Parse command line arguments
const [id, title, ...rest] = process.argv.slice(2);
const description = rest.join(' ');

if (!id || !title || !description) {
  console.error('Usage: node create-decision-record.mjs <id> <title> <description>');
  console.error('Example: node create-decision-record.mjs 009 "Component Library Selection" "Selecting the UI component library for the frontend"');
  process.exit(1);
}

// Generate the filename
const paddedId = id.toString().padStart(3, '0');
const kebabTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
const filename = `dec-${paddedId}-${kebabTitle}.md`;
const filePath = join(decisionsDir, filename);

// Get current date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Generate frontmatter
const frontmatter = `---
title: "${title}"
description: "${description}"
created: ${today}
updated: ${today}
authors: ""
status: "proposed"
related: []
tags: []
---

# ${title}

## Context

What is the issue that we're seeing that is motivating this decision or change?

## Decision

What is the change that we're proposing and/or doing?

## Consequences

What becomes easier or more difficult to do because of this change?

## Related Decisions

- [DEC-000: Template Decision](./dec-000-template-decision.md)
`;

// Create the decision record file
async function createDecisionRecord() {
  try {
    // Check if file already exists
    try {
      await readFile(filePath);
      console.error(`Error: File ${filename} already exists`);
      process.exit(1);
    } catch (err) {
      // File doesn't exist, continue
    }

    // Create decisions directory if it doesn't exist
    await mkdir(decisionsDir, { recursive: true });

    // Write the decision record file
    await writeFile(filePath, frontmatter, 'utf8');
    console.log(`Created decision record: ${filePath}`);

    // Update decision log
    await updateDecisionLog({
      id: paddedId,
      title,
      filename,
      date: today
    });

  } catch (error) {
    console.error('Error creating decision record:', error);
    process.exit(1);
  }
}

// Update the decision log with the new decision
async function updateDecisionLog({ id, title, filename, date }) {
  try {
    let logContent = await readFile(decisionLogPath, 'utf8');
    
    // Find the first table row to insert after the header
    const insertPoint = logContent.indexOf('| --- | --- | --- | --- | --- |') + 1;
    const before = logContent.slice(0, insertPoint);
    const after = logContent.slice(insertPoint);
    
    // Create the new row
    const newRow = `\n| ${id} | [${title}](./decisions/${filename}) | ${date} | proposed | |`;
    
    // Insert the new row
    const updatedContent = before + newRow + after;
    
    // Write the updated content back to the file
    await writeFile(decisionLogPath, updatedContent, 'utf8');
    console.log(`Updated decision log: ${decisionLogPath}`);
    
  } catch (error) {
    console.error('Error updating decision log:', error);
    // Don't fail the whole process if we can't update the log
  }
}

// Run the script
createDecisionRecord();
