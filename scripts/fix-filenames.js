const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Files to rename (oldPath -> newPath)
const filesToRename = [
  {
    oldPath: 'memory-bank/planning/PLAN-001-windsurf-planning-rules.md',
    newPath: 'memory-bank/planning/plan-001-windsurf-planning-rules.md'
  },
  {
    oldPath: 'memory-bank/planning/PLAN-002-long-term-roadmap.md',
    newPath: 'memory-bank/planning/plan-002-long-term-roadmap.md'
  },
  {
    oldPath: 'memory-bank/planning/SDLC-001-github-sprint-management.md',
    newPath: 'memory-bank/planning/sdlc-001-github-sprint-management.md'
  },
  {
    oldPath: 'memory-bank/planning/SPRINT-001-initial-setup.md',
    newPath: 'memory-bank/planning/sprint-001-initial-setup.md'
  }
];

async function renameFiles() {
  console.log('🚀 Starting file renaming process...');
  
  // Track renamed files for reference updates
  const renamedFiles = [];
  
  try {
    // First, verify all source files exist
    for (const file of filesToRename) {
      try {
        await fs.access(file.oldPath);
      } catch (err) {
        console.error(`❌ Source file not found: ${file.oldPath}`);
        return;
      }
    }
    
    // Rename files
    for (const file of filesToRename) {
      try {
        await fs.rename(file.oldPath, file.newPath);
        console.log(`✅ Renamed: ${file.oldPath} -> ${file.newPath}`);
        // Store the relative paths for reference updates
        const oldFileName = path.basename(file.oldPath);
        const newFileName = path.basename(file.newPath);
        renamedFiles.push({ oldFileName, newFileName });
      } catch (err) {
        console.error(`❌ Error renaming ${file.oldPath}:`, err.message);
      }
    }
    
    if (renamedFiles.length > 0) {
      console.log('\n🔄 Updating references in other files...');
      await updateReferences(renamedFiles);
    }
    
    console.log('\n🎉 File renaming completed successfully!');
  } catch (error) {
    console.error('❌ An error occurred:', error.message);
  }
}

async function updateReferences(renamedFiles) {
  try {
    // Build a grep command to find all references to the old filenames
    const grepCommands = renamedFiles.map(file => 
      `grep -rl "${file.oldFileName}" --include="*.md" memory-bank/`
    );
    
    // Find all files containing references to the old filenames
    const referencedFiles = new Set();
    
    for (const cmd of grepCommands) {
      try {
        const output = execSync(cmd, { encoding: 'utf-8' });
        output.split('\n').filter(Boolean).forEach(file => referencedFiles.add(file));
      } catch (e) {
        // grep returns non-zero exit code when no matches are found
        if (e.status !== 1) {
          console.error(`Error running grep: ${e.message}`);
        }
      }
    }
    
    // Update references in each file
    for (const filePath of referencedFiles) {
      try {
        let content = await fs.readFile(filePath, 'utf8');
        let updated = false;
        
        for (const { oldFileName, newFileName } of renamedFiles) {
          if (content.includes(oldFileName)) {
            content = content.replace(new RegExp(oldFileName, 'g'), newFileName);
            updated = true;
          }
        }
        
        if (updated) {
          await fs.writeFile(filePath, content, 'utf8');
          console.log(`✅ Updated references in: ${filePath}`);
        }
      } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
      }
    }
  } catch (error) {
    console.error('❌ Error updating references:', error.message);
  }
}

// Run the script
renameFiles();
