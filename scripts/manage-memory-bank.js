#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MEMORY_BANK_DIR = path.join(__dirname, '../memory-bank');
const FILES = {
  active: 'activeContext.md',
  decisions: 'decisionLog.md',
  progress: 'progress.md',
  project: 'projectContext.md',
  system: 'systemPatterns.md'
};

// Ensure memory bank directory exists
if (!fs.existsSync(MEMORY_BANK_DIR)) {
  fs.mkdirSync(MEMORY_BANK_DIR, { recursive: true });
}

// Initialize files if they don't exist
Object.entries(FILES).forEach(([key, filename]) => {
  const filePath = path.join(MEMORY_BANK_DIR, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `# ${filename.split('.')[0]}\n\n`);
  }
});

const args = process.argv.slice(2);
const command = args[0];
const content = args.slice(1).join(' ');

function appendToFile(type, content) {
  if (!FILES[type]) {
    console.error(`Unknown file type: ${type}`);
    process.exit(1);
  }

  const filePath = path.join(MEMORY_BANK_DIR, FILES[type]);
  const timestamp = new Date().toISOString();
  const entry = `\n## ${timestamp}\n\n${content}\n`;
  
  fs.appendFileSync(filePath, entry);
  console.log(`Updated ${FILES[type]}`);
  
  // Stage the changes
  try {
    execSync(`git add ${filePath}`);
    execSync(`git commit -m "Update ${FILES[type]}"`);
  } catch (error) {
    console.log('Changes staged but not committed (not a git repo or no changes)');
  }
}

switch (command) {
  case 'active':
  case 'decision':
  case 'progress':
  case 'project':
  case 'system':
    if (!content) {
      console.error(`Please provide content for ${command}`);
      process.exit(1);
    }
    appendToFile(command, content);
    break;
    
  case 'init':
    console.log('Memory bank initialized at', MEMORY_BANK_DIR);
    break;
    
  default:
    console.log(`Usage: ${process.argv[1]} <type> <content>`);
    console.log('Types:', Object.keys(FILES).join(', '));
    console.log('Example:');
    console.log(`  ${process.argv[1]} decision "Decided to use Next.js for the frontend"`);
    process.exit(1);
}
