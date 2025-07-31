#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const idea = process.argv[2];

if (!idea) {
  console.error("Usage: node add-idea.js \"Your idea here\"");
  process.exit(1);
}

// Get all idea files and sort them
function getIdeaFiles() {
  const ideasDir = 'unstarted ideas';
  const files = fs.readdirSync(ideasDir)
    .filter(f => f.endsWith('idea.md'))
    .map(f => parseInt(f.replace('idea.md', '')))
    .sort((a, b) => b - a); // Descending order
  return files;
}

// Read idea content from file
function readIdeaContent(score) {
  const filePath = path.join('unstarted ideas', `${score}idea.md`);
  const content = fs.readFileSync(filePath, 'utf8');
  const ideaMatch = content.match(/#IDEA\s*\n\n(.*?)(?=\n---|\n#|$)/s);
  return ideaMatch ? ideaMatch[1].trim() : '';
}

// Compare two ideas using Wordware API
async function compareIdeas(newIdea, existingIdea) {
  console.log(`Comparing against: ${existingIdea.substring(0, 50)}...`);
  
  const response = await fetch('https://api.wordware.ai/v1/apps/e2746deb-4a79-4bd1-9532-22c82f9113c8/runs', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.WORDWARE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        type: "runs",
        attributes: {
          version: "2.0",
          inputs: {
            idea1: newIdea,
            idea2: existingIdea
          },
          webhooks: []
        }
      }
    })
  });

  if (!response.ok) {
    console.error('Wordware API error:', response.status, response.statusText);
    return false; // Default to existing idea if API fails
  }

  const result = await response.json();
  return result.data?.attributes?.outputs?.IdeaOneIsBetter === true;
}

// Create new idea file
function createIdeaFile(score, ideaContent) {
  const filePath = path.join('unstarted ideas', `${score}idea.md`);
  const content = `#IDEA

${ideaContent}

---

#TWEET

# STATUS

Idea added to system on: ${new Date().toISOString().split('T')[0]}
Initial Tweet generated on: [Date LLM wrote the tweet]
Evaluated on: [Date user reviewed idea for tweet-worthiness]
Published to X: Yes / No
`;
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created: ${filePath}`);
}

async function addIdea(newIdea) {
  try {
    console.log(`Adding idea: "${newIdea}"`);
    
    const scores = getIdeaFiles();
    if (scores.length === 0) {
      createIdeaFile(100000, newIdea);
      return;
    }
    
    let left = 0;
    let right = scores.length - 1;
    let insertPosition = scores.length; // Default to end (lowest priority)
    
    console.log(`Binary searching through ${scores.length} ideas...`);
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midScore = scores[mid];
      const existingIdea = readIdeaContent(midScore);
      
      console.log(`\nStep ${Math.floor(Math.log2(scores.length)) - Math.floor(Math.log2(right - left + 1)) + 1}: Comparing with position ${mid + 1} (score: ${midScore})`);
      
      const newIsBetter = await compareIdeas(newIdea, existingIdea);
      
      if (newIsBetter) {
        insertPosition = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    
    // Calculate new score
    let newScore;
    if (insertPosition === 0) {
      // Better than highest
      newScore = scores[0] + 5000;
    } else if (insertPosition >= scores.length) {
      // Worse than lowest
      newScore = Math.floor(scores[scores.length - 1] / 2);
    } else {
      // Between two scores
      const higher = scores[insertPosition - 1];
      const lower = scores[insertPosition];
      newScore = Math.floor((higher + lower) / 2);
    }
    
    console.log(`\n🎯 Final ranking: Position ${insertPosition + 1} with score ${newScore}`);
    createIdeaFile(newScore, newIdea);
    
  } catch (error) {
    console.error("Error adding idea:", error);
    process.exit(1);
  }
}

// Batch add multiple ideas asynchronously
async function addIdeas(ideas) {
  console.log(`🚀 Starting batch processing of ${ideas.length} ideas...`);
  
  // Return success immediately, process in background
  setImmediate(async () => {
    for (let i = 0; i < ideas.length; i++) {
      try {
        console.log(`\n📝 Processing idea ${i + 1}/${ideas.length}:`);
        await addIdea(ideas[i]);
      } catch (error) {
        console.error(`❌ Failed to add idea ${i + 1}: ${ideas[i]}`, error);
      }
    }
    console.log(`\n✅ Batch processing complete! Added ${ideas.length} ideas.`);
  });
  
  return { success: true, message: `Started processing ${ideas.length} ideas` };
}

// If called directly with single idea
if (process.argv[2]) {
  addIdea(idea);
}

// Export for use in other scripts
export { addIdea, addIdeas };