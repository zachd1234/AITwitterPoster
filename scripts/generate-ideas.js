#!/usr/bin/env node

import { addIdeas } from './add-idea.js';
import 'dotenv/config';

const diffInput = process.argv[2];

if (!diffInput) {
  console.error("Usage: node generate-ideas.js \"<diff content>\"");
  process.exit(1);
}

async function callWordwareIdeaExtractor(noteDump) {
  // Start the run
  const response = await fetch('https://api.wordware.ai/v1/apps/e5dac4f0-f346-417c-a5c6-ec2a5d75df36/runs', {
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
          inputs: { noteDump: noteDump },
          webhooks: []
        }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Wordware API error: ${response.status} ${response.statusText}`);
  }

  const runData = await response.json();
  const streamUrl = runData.data.links.stream;

  // Stream the results
  const streamResponse = await fetch(streamUrl);
  if (!streamResponse.ok) {
    throw new Error(`Stream error: ${streamResponse.status} ${streamResponse.statusText}`);
  }

  const reader = streamResponse.body.getReader();
  const decoder = new TextDecoder();
  let ideaList = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.type === 'value' && data.path === 'output' && data.value?.ideaList) {
            ideaList = data.value.ideaList;
          }
        } catch (e) {
          // Skip invalid JSON lines
        }
      }
    }
  }

  return ideaList;
}

async function generateIdeasFromDiff(diffContent) {
  try {
    console.log('🧠 Extracting tweet ideas from diff using Wordware...\n');
    
    // Step 1: Extract ideas using Wordware API
    console.log('Step 1: Running Wordware idea extraction...');
    const ideaList = await callWordwareIdeaExtractor(diffContent);
    
    if (!ideaList || ideaList.length === 0) {
      console.log('No ideas extracted from the diff content');
      return;
    }

    console.log(`✅ Extracted ${ideaList.length} ideas:`);
    ideaList.forEach((idea, index) => {
      console.log(`  ${index + 1}. ${idea}`);
    });
    
    // Step 2: Add ideas to the system using existing ranking logic
    console.log('\n🎯 Adding ideas to priority queue...');
    await addIdeas(ideaList);
    
    console.log('\n✅ Idea generation workflow complete!');
    
  } catch (error) {
    console.error('❌ Error generating ideas:', error);
    process.exit(1);
  }
}

generateIdeasFromDiff(diffInput);