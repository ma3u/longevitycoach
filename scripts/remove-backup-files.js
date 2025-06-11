const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

function findBackupFiles(dir) {
  const files = [];
  
  function scanDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      // Skip node_modules and .git directories
      if (item === 'node_modules' || item === '.git') {
        continue;
      }
      
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.bak')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

// Find all .bak files
const backupFiles = findBackupFiles(ROOT_DIR);

if (backupFiles.length === 0) {
  console.log('No .bak files found to remove.');
  process.exit(0);
}

console.log('The following .bak files will be removed:');
backupFiles.forEach(file => {
  console.log(`- ${path.relative(ROOT_DIR, file)}`);
});

// Ask for confirmation
console.log('\nDo you want to proceed with removing these files? (y/n)');
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
  
  // Remove files
  backupFiles.forEach(file => {
    try {
      fs.unlinkSync(file);
      console.log(`Removed: ${path.relative(ROOT_DIR, file)}`);
    } catch (error) {
      console.error(`Error removing ${file}:`, error.message);
    }
  });
  
  console.log('\nAll .bak files have been removed.');
  console.log('\nNext steps:');
  console.log('1. Commit the changes to remove the files from version control');
  console.log('2. The .gitignore has been updated to prevent future .bak files from being committed');
});
