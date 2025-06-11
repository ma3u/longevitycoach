#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const MEMORY_BANK_DIR = path.join(__dirname, '../memory-bank');
const ALLOWED_STATUSES = ['draft', 'review', 'approved', 'deprecated'];
const REQUIRED_FRONTMATTER_FIELDS = ['title', 'description', 'created', 'status'];

// Track validation results
let hasErrors = false;
const results = {
  checked: 0,
  errors: 0,
  warnings: 0,
  files: {}
};

// Helper functions
function logError(file, message) {
  if (!results.files[file]) {
    results.files[file] = { errors: [], warnings: [] };
  }
  results.files[file].errors.push(message);
  results.errors++;
  hasErrors = true;
  console.error(`❌ [${file}] ${message}`);
}

function logWarning(file, message) {
  if (!results.files[file]) {
    results.files[file] = { errors: [], warnings: [] };
  }
  results.files[file].warnings.push(message);
  results.warnings++;
  console.warn(`⚠️  [${file}] ${message}`);
}

function validateFrontmatter(filePath, content) {
  const relativePath = path.relative(process.cwd(), filePath);
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontmatterMatch) {
    logError(relativePath, 'Missing frontmatter');
    return null;
  }

  try {
    const frontmatter = frontmatterMatch[1];
    const data = {};
    
    // Parse YAML frontmatter
    frontmatter.split('\n').forEach(line => {
      // Skip empty lines and comments
      if (!line.trim() || line.trim().startsWith('#')) return;
      
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) return; // Skip lines without a colon
      
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove any trailing comments
      const commentIndex = value.indexOf(' #');
      if (commentIndex !== -1) {
        value = value.substring(0, commentIndex).trim();
      }
      
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.substring(1, value.length - 1);
      }
      
      data[key] = value;
    });

    // Validate required fields
    REQUIRED_FRONTMATTER_FIELDS.forEach(field => {
      if (!data[field]) {
        logError(relativePath, `Missing required frontmatter field: ${field}`);
      }
    });

    // Validate status
    if (data.status && !ALLOWED_STATUSES.includes(data.status)) {
      logError(relativePath, `Invalid status: ${data.status}. Must be one of: ${ALLOWED_STATUSES.join(', ')}`);
    }

    // Validate dates
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (data.created && !dateRegex.test(data.created)) {
      logError(relativePath, `Invalid created date format: ${data.created}. Use YYYY-MM-DD`);
    }
    if (data.updated && !dateRegex.test(data.updated)) {
      logError(relativePath, `Invalid updated date format: ${data.updated}. Use YYYY-MM-DD`);
    }

    return data;
  } catch (error) {
    logError(relativePath, `Error parsing frontmatter: ${error.message}`);
    return null;
  }
}

function validateFileNaming(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  const fileName = path.basename(filePath);
  const dirName = path.dirname(filePath).split(path.sep).pop();
  
  // Skip non-markdown files
  if (path.extname(fileName) !== '.md') {
    return;
  }

  // Check for uppercase letters
  if (fileName !== fileName.toLowerCase()) {
    logWarning(relativePath, 'Filename contains uppercase letters. Use kebab-case.');
  }

  // Check for spaces
  if (fileName.includes(' ')) {
    logError(relativePath, 'Filename contains spaces. Use hyphens instead.');
  }

  // Check decision record naming
  if (dirName === 'decisions' && !/^DEC-\d{3}-[a-z0-9-]+\.md$/i.test(fileName)) {
    logError(relativePath, 'Decision records should follow the pattern: DEC-###-short-description.md');
  }
}

function validateMarkdown(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  try {
    // Check for broken markdown links
    const content = fs.readFileSync(filePath, 'utf8');
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const [fullMatch, text, link] = match;
      
      // Skip external links
      if (link.startsWith('http')) continue;
      
      // Handle anchor links
      const [filePathPart] = link.split('#');
      if (!filePathPart) continue;
      
      const absolutePath = path.resolve(path.dirname(filePath), filePathPart);
      
      if (!fs.existsSync(absolutePath)) {
        logError(relativePath, `Broken link: ${link} (${text})`);
      }
    }
  } catch (error) {
    logError(relativePath, `Error validating markdown: ${error.message}`);
  }
}

// Main validation function
function validateFile(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    results.checked++;
    
    // Skip files that don't need validation
    if (path.basename(filePath) === 'README.md') return;
    
    // Validate file naming
    validateFileNaming(filePath);
    
    // Only validate markdown files
    if (path.extname(filePath) === '.md') {
      validateFrontmatter(filePath, content);
      validateMarkdown(filePath);
    }
  } catch (error) {
    logError(relativePath, `Error reading file: ${error.message}`);
  }
}

// Process directory recursively
function processDirectory(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    
    // Skip node_modules and .git directories
    if (entry.isDirectory()) {
      if (['node_modules', '.git'].includes(entry.name)) continue;
      processDirectory(fullPath);
    } else if (entry.isFile()) {
      validateFile(fullPath);
    }
  }
}

// Run validation
console.log('🔍 Validating Memory Bank files...\n');
processDirectory(MEMORY_BANK_DIR);

// Print summary
console.log('\n📊 Validation Summary:');
console.log(`✅ Checked ${results.checked} files`);
console.log(`❌ Found ${results.errors} errors`);
console.log(`⚠️  Found ${results.warnings} warnings\n`);

// Print detailed errors if any
if (hasErrors) {
  console.log('📋 Detailed Errors:');
  for (const [file, { errors }] of Object.entries(results.files)) {
    if (errors.length > 0) {
      console.log(`\n${file}:`);
      errors.forEach(error => console.log(`  - ${error}`));
    }
  }
  console.log('');
}

// Exit with appropriate status code
process.exit(hasErrors ? 1 : 0);
