#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const MEMORY_BANK_DIR = path.join(__dirname, '../memory-bank');
const IGNORE_DIRS = ['node_modules', '.git', '.github'];
const ALLOWED_STATUSES = ['draft', 'review', 'approved', 'deprecated'];

// Process each markdown file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file has frontmatter
    if (!content.startsWith('---')) {
      console.log(`ℹ️  Skipping ${filePath} (no frontmatter found)`);
      return;
    }

    // Extract frontmatter
    const endOfFrontmatter = content.indexOf('---', 3);
    if (endOfFrontmatter === -1) {
      console.log(`⚠️  Skipping ${filePath} (malformed frontmatter)`);
      return;
    }

    const frontmatterContent = content.substring(4, endOfFrontmatter).trim();
    let frontmatter = {};
    let newFrontmatter = [];
    let hasChanges = false;

    // Parse frontmatter
    frontmatterContent.split('\n').forEach(line => {
      if (line.includes(':')) {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
        frontmatter[key.trim()] = value;
      }
    });

    // Process each field
    for (const [key, value] of Object.entries(frontmatter)) {
      let newValue = value;
      
      // Fix date fields (remove quotes)
      if (key === 'created' || key === 'updated') {
        const cleanValue = value.replace(/^['"]|['"]$/g, '');
        if (cleanValue !== value) {
          newValue = cleanValue;
          hasChanges = true;
        }
      }
      
      // Fix status field
      if (key === 'status') {
        const cleanValue = value.replace(/^['"]|['"]$/g, '').toLowerCase();
        if (!ALLOWED_STATUSES.includes(cleanValue)) {
          newValue = 'draft';
          hasChanges = true;
        } else if (cleanValue !== value) {
          newValue = cleanValue;
          hasChanges = true;
        }
      }
      
      newFrontmatter.push(`${key}: ${newValue}`);
    }

    // Only update if changes were made
    if (hasChanges) {
      const newContent = `---
${newFrontmatter.join('\n')}
---${content.substring(endOfFrontmatter + 3)}`;
      
      // Create backup
      fs.writeFileSync(`${filePath}.bak`, content, 'utf8');
      
      // Write updated content
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Updated frontmatter in ${filePath}`);
    } else {
      console.log(`ℹ️  No changes needed for ${filePath}`);
    }
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
console.log('🔍 Fixing frontmatter in markdown files...\n');
processDirectory(MEMORY_BANK_DIR);
console.log('\n✨ Frontmatter fixes complete!');
