#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import TwitterPoster from '../api/TwitterPoster.js';

const execAsync = promisify(exec);

const IDEAS_READY_DIR = './ideasReadytoPost';
const POSTED_DIR = './finished ideas';

async function getFirstIdeaFile() {
  try {
    const files = await fs.readdir(IDEAS_READY_DIR);
    const ideaFiles = files
      .filter(file => file.endsWith('.md'))
      .sort((a, b) => {
        // Sort by priority number (higher numbers first)
        const aNum = parseInt(a.replace('idea.md', ''));
        const bNum = parseInt(b.replace('idea.md', ''));
        return bNum - aNum;
      });
    
    return ideaFiles[0] || null;
  } catch (error) {
    console.error('Error reading ideas directory:', error.message);
    return null;
  }
}

async function extractTweetFromFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    
    // Look for tweet content between #TWEET and # STATUS
    const tweetMatch = content.match(/# TWEET\s*\n([\s\S]*?)(?=\n# STATUS|$)/);
    
    if (!tweetMatch || !tweetMatch[1].trim()) {
      throw new Error('No tweet content found in #TWEET section');
    }
    
    return tweetMatch[1].trim();
  } catch (error) {
    console.error('Error extracting tweet from file:', error.message);
    throw error;
  }
}

async function moveToFinished(fileName) {
  try {
    const sourcePath = path.join(IDEAS_READY_DIR, fileName);
    const destPath = path.join(POSTED_DIR, fileName);
    
    await fs.rename(sourcePath, destPath);
    console.log(`Moved ${fileName} to finished ideas`);
  } catch (error) {
    console.error('Error moving file to finished:', error.message);
  }
}

async function main() {
  console.log('🤖 Starting auto-post process...');
  
  // Get the first (highest priority) idea file
  const fileName = await getFirstIdeaFile();
  
  if (!fileName) {
    console.log('No ideas ready to post');
    return;
  }
  
  console.log(`📝 Processing idea: ${fileName}`);
  
  try {
    // Extract tweet content
    const filePath = path.join(IDEAS_READY_DIR, fileName);
    const tweetText = await extractTweetFromFile(filePath);
    
    console.log(`📱 Tweet content: "${tweetText}"`);
    
    // Post to Twitter
    const poster = new TwitterPoster();
    const result = await poster.postTweet(tweetText);
    
    if (result.success) {
      console.log('✅ Tweet posted successfully!');
      console.log(`🔗 URL: ${result.url}`);
      
      // Move file to finished ideas
      await moveToFinished(fileName);
      
      // Sync Notion and generate new ideas
      console.log('🔄 Syncing Notion for new ideas...');
      try {
        await execAsync('/Users/zachderhake/.volta/tools/image/node/22.16.0/bin/node scripts/notion-sync.js');
        console.log('📚 Notion sync completed');
      } catch (error) {
        console.error('⚠️ Notion sync failed:', error.message);
      }
      
    } else {
      console.error('❌ Failed to post tweet:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Error processing idea:', error.message);
  }
}

// Run the script
main().catch(console.error);