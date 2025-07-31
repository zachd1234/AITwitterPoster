#!/bin/bash

# Auto-post cron job script
# Change to the project directory
cd /Users/zachderhake/meeting-coach-1

# Use full path to node (from actual system location)
NODE_PATH="/Users/zachderhake/.volta/tools/image/node/22.16.0/bin/node"

# Run the auto-post script
$NODE_PATH scripts/autoPost.js >> logs/autopost.log 2>&1