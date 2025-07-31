#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTION_DIR = path.join(__dirname, '..', 'notion');
const BOOK_KNOWLEDGE_URL = 'https://eompvbekkml1moz.m.pipedream.net';
const DAILY_REFLECTIONS_URL = 'https://eo72bu4tz3uo3dx.m.pipedream.net';

// Fetch content from URL
function fetchContent(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

// Get diff between old and new content
function getDiff(oldContent, newContent, filename) {
    if (oldContent === newContent) {
        return null;
    }
    
    const oldLines = oldContent.split('\n');
    const newLines = newContent.split('\n');
    
    const diff = {
        filename,
        added: [],
        removed: [],
        modified: []
    };
    
    // Simple line-by-line diff
    const maxLines = Math.max(oldLines.length, newLines.length);
    
    for (let i = 0; i < maxLines; i++) {
        const oldLine = oldLines[i] || '';
        const newLine = newLines[i] || '';
        
        if (oldLine !== newLine) {
            if (!oldLine && newLine) {
                diff.added.push(`Line ${i + 1}: ${newLine}`);
            } else if (oldLine && !newLine) {
                diff.removed.push(`Line ${i + 1}: ${oldLine}`);
            } else {
                diff.modified.push(`Line ${i + 1}: "${oldLine}" → "${newLine}"`);
            }
        }
    }
    
    return diff;
}

async function syncNotionDocuments() {
    try {
        console.log('🔄 Syncing Notion documents...\n');
        
        // Fetch new content
        const [bookKnowledge, dailyReflections] = await Promise.all([
            fetchContent(BOOK_KNOWLEDGE_URL),
            fetchContent(DAILY_REFLECTIONS_URL)
        ]);
        
        // Read existing content
        const bookKnowledgePath = path.join(NOTION_DIR, 'book-knowledge.md');
        const dailyReflectionsPath = path.join(NOTION_DIR, 'daily-reflections.md');
        
        const oldBookKnowledge = fs.existsSync(bookKnowledgePath) 
            ? fs.readFileSync(bookKnowledgePath, 'utf8') 
            : '';
        const oldDailyReflections = fs.existsSync(dailyReflectionsPath) 
            ? fs.readFileSync(dailyReflectionsPath, 'utf8') 
            : '';
        
        // Calculate diffs
        const bookDiff = getDiff(oldBookKnowledge, bookKnowledge, 'book-knowledge.md');
        const reflectionsDiff = getDiff(oldDailyReflections, dailyReflections, 'daily-reflections.md');
        
        let hasChanges = false;
        let changeSummary = '';
        
        // Print diffs
        if (bookDiff) {
            hasChanges = true;
            changeSummary += '📚 Book Knowledge Changes:\n';
            console.log('📚 Book Knowledge Changes:');
            if (bookDiff.added.length) {
                console.log('  ✅ Added:');
                bookDiff.added.forEach(line => console.log(`    ${line}`));
                changeSummary += `  ✅ Added: ${bookDiff.added.length} lines\n`;
            }
            if (bookDiff.removed.length) {
                console.log('  ❌ Removed:');
                bookDiff.removed.forEach(line => console.log(`    ${line}`));
                changeSummary += `  ❌ Removed: ${bookDiff.removed.length} lines\n`;
            }
            if (bookDiff.modified.length) {
                console.log('  🔄 Modified:');
                bookDiff.modified.forEach(line => console.log(`    ${line}`));
                changeSummary += `  🔄 Modified: ${bookDiff.modified.length} lines\n`;
            }
            console.log();
        } else {
            console.log('📚 Book Knowledge: No changes');
        }
        
        if (reflectionsDiff) {
            hasChanges = true;
            changeSummary += '📝 Daily Reflections Changes:\n';
            console.log('📝 Daily Reflections Changes:');
            if (reflectionsDiff.added.length) {
                console.log('  ✅ Added:');
                reflectionsDiff.added.forEach(line => console.log(`    ${line}`));
                changeSummary += `  ✅ Added: ${reflectionsDiff.added.length} lines\n`;
            }
            if (reflectionsDiff.removed.length) {
                console.log('  ❌ Removed:');
                reflectionsDiff.removed.forEach(line => console.log(`    ${line}`));
                changeSummary += `  ❌ Removed: ${reflectionsDiff.removed.length} lines\n`;
            }
            if (reflectionsDiff.modified.length) {
                console.log('  🔄 Modified:');
                reflectionsDiff.modified.forEach(line => console.log(`    ${line}`));
                changeSummary += `  🔄 Modified: ${reflectionsDiff.modified.length} lines\n`;
            }
            console.log();
        } else {
            console.log('📝 Daily Reflections: No changes');
        }
        
        // Update stored files
        fs.writeFileSync(bookKnowledgePath, bookKnowledge);
        fs.writeFileSync(dailyReflectionsPath, dailyReflections);
        
        console.log('✅ Documents updated successfully');
        
        // Auto-generate ideas if changes were detected
        if (hasChanges) {
            console.log('\n🚀 Changes detected! Generating new tweet ideas...');
            try {
                const result = await execAsync(`node scripts/generate-ideas.js "${changeSummary}"`);
                console.log('✅ New ideas generated from Notion updates');
            } catch (error) {
                console.error('⚠️ Failed to generate ideas:', error.message);
            }
        } else {
            console.log('\n📝 No changes detected - skipping idea generation');
        }
        
    } catch (error) {
        console.error('❌ Error syncing documents:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    syncNotionDocuments();
}

export { syncNotionDocuments, getDiff };