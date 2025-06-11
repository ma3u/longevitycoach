#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const MEMORY_BANK_DIR = path.join(__dirname, '../memory-bank');
const IGNORE_DIRS = ['node_modules', '.git', '.github'];

// Helper functions
function getFileStats(filePath) {
  const stats = fs.statSync(filePath);
  const gitCreated = getGitCreatedTime(filePath);
  const gitUpdated = getGitUpdatedTime(filePath);
  
  return {
    created: gitCreated || stats.birthtime.toISOString().split('T')[0],
    updated: gitUpdated || stats.mtime.toISOString().split('T')[0]
  };
}

function getGitCreatedTime(filePath) {
  try {
    const relativePath = path.relative(process.cwd(), filePath);
    const cmd = `git log --diff-filter=A --follow --format=%ad --date=short -- "${relativePath}" | tail -1`;
    return execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
  } catch (e) {
    return null;
  }
}

function getGitUpdatedTime(filePath) {
  try {
    const relativePath = path.relative(process.cwd(), filePath);
    const cmd = `git log -1 --format=%ad --date=short -- "${relativePath}"`;
    return execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
  } catch (e) {
    return null;
  }
}

function getTitleFromFilename(filename) {
  // Remove extension and split by hyphens/underscores
  const name = path.basename(filename, path.extname(filename));
  return name
    .split(/[-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getCategoryFromPath(filePath) {
  const relativePath = path.relative(MEMORY_BANK_DIR, path.dirname(filePath));
  if (relativePath === '.') return 'General';
  return relativePath
    .split(path.sep)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' > ');
}

function generateFrontmatter(filePath, stats) {
  const title = getTitleFromFilename(filePath);
  const category = getCategoryFromPath(filePath);
  
  return `---
title: "${title}"
description: "${category} documentation"
created: "${stats.created}"
updated: "${stats.updated}"
authors:
  - "System"
status: "draft"
related: []
tags:
  - "${category.toLowerCase().split(' > ')[0]}"
---

`;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if file already has frontmatter
    if (content.startsWith('---')) {
      const endOfFrontmatter = content.indexOf('---', 3);
      if (endOfFrontmatter !== -1) {
        console.log(`ℹ️  Skipping ${filePath} (already has frontmatter)`);
        return;
      }
    }
    
    const stats = getFileStats(filePath);
    const frontmatter = generateFrontmatter(filePath, stats);
    
    // Preserve any shebang
    let newContent = '';
    let bodyContent = content;
    
    if (content.startsWith('#!')) {
      const endOfShebang = content.indexOf('\n');
      if (endOfShebang !== -1) {
        newContent = content.substring(0, endOfShebang + 1) + '\n';
        bodyContent = content.substring(endOfShebang + 1);
      }
    }
    
    newContent += frontmatter + bodyContent.trim() + '\n';
    
    // Create backup
    fs.writeFileSync(`${filePath}.bak`, content, 'utf8');
    
    // Write new content
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    console.log(`✅ Added frontmatter to ${filePath}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Process directory recursively
function processDirectory(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.includes(entry.name)) {
        processDirectory(fullPath);
      }
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.md') {
      processFile(fullPath);
    }
  }
}

// Main execution
console.log('🔍 Adding frontmatter to markdown files...\n');
processDirectory(MEMORY_BANK_DIR);
console.log('\n✨ Frontmatter addition complete!');
