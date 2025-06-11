#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const MEMORY_BANK_DIR = path.join(__dirname, '../memory-bank');
const IGNORE_DIRS = ['node_modules', '.git', '.github'];

// Track renames for updating references
const renameMap = new Map();

// Helper function to get file content
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

// Helper function to write file content
function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error.message);
    return false;
  }
}

// Rename a file and update references
function renameFile(oldPath, newFilename) {
  const dir = path.dirname(oldPath);
  const newPath = path.join(dir, newFilename);
  const relativeOldPath = path.relative(process.cwd(), oldPath);
  const relativeNewPath = path.relative(process.cwd(), newPath);
  
  try {
    // Skip if the new filename is the same as the old one
    if (oldPath === newPath) {
      return false;
    }
    
    // Check if the new file already exists
    if (fs.existsSync(newPath)) {
      console.warn(`⚠️  Skipping ${relativeOldPath} -> ${relativeNewPath} (target already exists)`);
      return false;
    }
    
    // Rename the file
    fs.renameSync(oldPath, newPath);
    console.log(`✅ Renamed ${relativeOldPath} -> ${relativeNewPath}`);
    
    // Add to rename map for reference updates
    renameMap.set(
      path.basename(oldPath),
      path.basename(newPath)
    );
    
    return true;
  } catch (error) {
    console.error(`❌ Error renaming ${relativeOldPath} -> ${relativeNewPath}:`, error.message);
    return false;
  }
}

// Update references to renamed files
function updateReferences(filePath) {
  const content = readFile(filePath);
  if (!content) return;
  
  let updatedContent = content;
  let updated = false;
  
  // Update markdown links
  for (const [oldName, newName] of renameMap.entries()) {
    // Update direct filename references
    const oldNameNoExt = oldName.replace(/\.md$/, '');
    const newNameNoExt = newName.replace(/\.md$/, '');
    
    // Update markdown links
    const linkRegex = new RegExp(`\[([^\]]*)\]\(([^)]*${oldNameNoExt}[^)]*)\)`, 'g');
    updatedContent = updatedContent.replace(linkRegex, (match, text, url) => {
      const newUrl = url.replace(oldNameNoExt, newNameNoExt);
      updated = true;
      return `[${text}](${newUrl})`;
    });
    
    // Update direct filename references in content
    if (updatedContent.includes(oldName)) {
      updatedContent = updatedContent.replace(new RegExp(oldName, 'g'), newName);
      updated = true;
    }
  }
  
  // Write back if changes were made
  if (updated) {
    writeFile(filePath, updatedContent);
    console.log(`✅ Updated references in ${path.relative(process.cwd(), filePath)}`);
  }
}

// Process a single file for renaming
function processFile(filePath) {
  const filename = path.basename(filePath);
  const dirname = path.dirname(filePath);
  
  // Skip files that don't need renaming
  if (!/\.md$/i.test(filename)) return;
  
  // Skip files that already follow the DEC-###- pattern
  if (/^DEC-\d{3}-/i.test(filename)) return;
  
  // Skip non-decision files in the decisions directory
  if (dirname.endsWith('decisions') && !/^(ARCH|DB|DEP|MEM|SEC)-/i.test(filename)) {
    return;
  }
  
  let newFilename = filename;
  
  // Rename decision records
  if (dirname.endsWith('decisions')) {
    const match = filename.match(/^(ARCH|DB|DEP|MEM|SEC)-(\d{3})-(.*)$/i);
    if (match) {
      const [_, prefix, number, rest] = match;
      newFilename = `DEC-${number}-${rest}`.toLowerCase();
    } else {
      // For files in decisions/ that don't match the pattern but should be decisions
      newFilename = `DEC-${filename}`.toLowerCase();
    }
  } else {
    // For other markdown files, just convert to lowercase
    newFilename = filename.toLowerCase();
  }
  
  // Only rename if the filename would change
  if (newFilename !== filename) {
    renameFile(filePath, newFilename);
  }
}

// Process all markdown files in the memory bank
export function processMemoryBank() {
  // First pass: rename files
  const walkSync = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (!IGNORE_DIRS.includes(entry.name)) {
          walkSync(fullPath);
        }
      } else if (entry.isFile() && /\.md$/i.test(entry.name)) {
        processFile(fullPath);
      }
    }
  };
  
  console.log('🔍 Renaming files...');
  walkSync(MEMORY_BANK_DIR);
  
  // Second pass: update references
  if (renameMap.size > 0) {
    console.log('\n🔄 Updating references...');
    const updateReferencesInFile = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          if (!IGNORE_DIRS.includes(entry.name)) {
            updateReferencesInFile(fullPath);
          }
        } else if (entry.isFile() && /\.(md|mdx|txt)$/i.test(entry.name)) {
          updateReferences(fullPath);
        }
      }
    };
    
    updateReferencesInFile(MEMORY_BANK_DIR);
  }
  
  console.log('\n✨ File renaming complete!');
  
  if (renameMap.size > 0) {
    console.log('\nRenamed files:');
    for (const [oldName, newName] of renameMap.entries()) {
      console.log(`  ${oldName} -> ${newName}`);
    }
  } else {
    console.log('\nNo files needed to be renamed.');
  }
}

// Run the script
processMemoryBank();

export default processMemoryBank;
