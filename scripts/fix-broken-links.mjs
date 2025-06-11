#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const MEMORY_BANK_DIR = path.join(__dirname, '../memory-bank');
const IGNORE_DIRS = ['node_modules', '.git', '.github'];

// Track broken links
const brokenLinks = new Map();

// Cache of existing files
const fileCache = new Map();

// Get all markdown files recursively
function getAllMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.includes(entry.name)) {
        files.push(...getAllMarkdownFiles(fullPath));
      }
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Check if a file exists (with caching)
function fileExists(filePath) {
  if (fileCache.has(filePath)) {
    return fileCache.get(filePath);
  }
  
  const exists = fs.existsSync(filePath);
  fileCache.set(filePath, exists);
  return exists;
}

// Resolve a link path relative to the current file
function resolveLinkPath(link, currentFilePath) {
  // Skip external links and anchors
  if (link.startsWith('http') || link.startsWith('#')) {
    return null;
  }
  
  // Handle relative paths
  const dir = path.dirname(currentFilePath);
  let resolvedPath;
  
  if (link.startsWith('/')) {
    // Path relative to memory-bank root
    resolvedPath = path.join(MEMORY_BANK_DIR, link);
  } else {
    // Path relative to current file
    resolvedPath = path.join(dir, link);
  }
  
  // Try with and without .md extension
  if (!resolvedPath.endsWith('.md')) {
    const withExt = `${resolvedPath}.md`;
    if (fileExists(withExt)) {
      return withExt;
    }
  }
  
  // Check if it's a directory with an index.md
  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
    const indexPath = path.join(resolvedPath, 'index.md');
    if (fileExists(indexPath)) {
      return indexPath;
    }
  }
  
  return fileExists(resolvedPath) ? resolvedPath : null;
}

// Process a single markdown file for broken links
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  let hasBrokenLinks = false;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const [fullMatch, text, link] = match;
    
    // Skip external links and anchors
    if (link.startsWith('http') || link.startsWith('#')) {
      continue;
    }
    
    // Check if the linked file exists
    const resolvedPath = resolveLinkPath(link, filePath);
    if (!resolvedPath) {
      if (!brokenLinks.has(filePath)) {
        brokenLinks.set(filePath, []);
      }
      brokenLinks.get(filePath).push({
        text,
        link,
        line: content.substring(0, match.index).split('\n').length
      });
      hasBrokenLinks = true;
    }
  }
  
  return hasBrokenLinks;
}

// Main function to find and fix broken links
async function findAndFixBrokenLinks() {
  console.log('🔍 Scanning for broken links...\n');
  
  // Get all markdown files
  const files = getAllMarkdownFiles(MEMORY_BANK_DIR);
  
  // Process each file
  for (const file of files) {
    processFile(file);
  }
  
  // Report broken links
  if (brokenLinks.size === 0) {
    console.log('✅ No broken links found!');
    return;
  }
  
  console.log(`❌ Found ${brokenLinks.size} files with broken links:\n`);
  
  // Generate report
  let report = '# Broken Links Report\n\n';
  
  for (const [file, links] of brokenLinks.entries()) {
    const relativePath = path.relative(process.cwd(), file);
    console.log(`📄 ${relativePath}`);
    report += `## ${relativePath}\n\n`;
    
    for (const link of links) {
      console.log(`  Line ${link.line}: [${link.text}](${link.link})`);
      report += `- Line ${link.line}: [${link.text}](${link.link})\n`;
    }
    
    console.log();
    report += '\n';
  }
  
  // Write report to file
  const reportPath = path.join(__dirname, '../memory-bank/BROKEN_LINKS.md');
  fs.writeFileSync(reportPath, report);
  console.log(`\n📝 Report saved to: ${path.relative(process.cwd(), reportPath)}`);
}

// Run the script
findAndFixBrokenLinks().catch(console.error);
