const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PLANNING_DIR = path.join(__dirname, '../memory-bank/planning');

// Function to convert filename to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase to kebab-case
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .toLowerCase(); // Convert to lowercase
}

// Get all files in the planning directory
const files = fs.readdirSync(PLANNING_DIR);

// Track renames
const renameMap = [];

// Process each file
files.forEach(file => {
  // Skip directories and already kebab-case files
  if (fs.statSync(path.join(PLANNING_DIR, file)).isDirectory()) return;
  if (file === file.toLowerCase()) return;
  
  // Generate new filename
  const newName = toKebabCase(file);
  
  // Skip if no change
  if (file === newName) return;
  
  // Add to rename map
  renameMap.push({
    oldName: file,
    newName: newName,
    oldPath: path.join(PLANNING_DIR, file),
    newPath: path.join(PLANNING_DIR, newName)
  });
});

// Log planned changes
console.log('Planned renames:');
renameMap.forEach(({ oldName, newName }) => {
  console.log(`  ${oldName} -> ${newName}`);
});

// Ask for confirmation
console.log('\nDo you want to proceed with these renames? (y/n)');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('> ', answer => {
  readline.close();
  
  if (answer.toLowerCase() !== 'y') {
    console.log('Operation cancelled.');
    process.exit(0);
  }
  
  // Perform renames
  renameMap.forEach(({ oldPath, newPath }) => {
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${path.basename(oldPath)} -> ${path.basename(newPath)}`);
    } catch (error) {
      console.error(`Error renaming ${oldPath}:`, error.message);
    }
  });
  
  console.log('\nRenaming complete!');
  console.log('Next steps:');
  console.log('1. Update any internal links to the renamed files');
  console.log('2. Run validation to ensure all links are correct');
});
