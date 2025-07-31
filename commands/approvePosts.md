# Approve Posts Command

Review and approve tweets from ideasInProgress for posting to Twitter.

## Usage
```
/approvePosts
```

## Workflow Instructions

When this command is triggered, follow these steps:

### Step 1: Get All Ideas in Progress
- Use `ls -1 "ideasInProgress/"*.md | sort -t/ -k2 -nr` to list all idea files in reverse numerical order (highest numbers first)
- Process each file one by one

### Step 2: For Each Idea File
1. **Read the file** and extract the tweet content (everything after the `# TWEET` line)
2. **Present to user** with this exact format:

```
Do you approve: "[TWEET_TEXT]" as a tweet?

1. Yes - Post it
2. Edit - Provide new text 
3. Discard - Skip this tweet

Enter your choice (1, 2, or 3):
```

### Step 3: Handle User Response

**If user chooses 1 (Yes):**
- Post the tweet using: `node api/TwitterPoster.js "{TWEET_TEXT}"`
- Add status section to file: `# STATUS\n\nIdea added to system on: [Date Idea was loaded into unstarted ideas]\nInitial Tweet generated on: [Date LLM wrote the tweet]\nEvaluated on: [Today's date]\nPublished to X: Yes`
- Move the file from `ideasInProgress/` to a `ideasReadytoPost/` directory (create if needed)

**If user chooses 2 (Edit):**
- Ask: "What post would you like instead?"
- Wait for user to provide new tweet text
- Post the new text using: `node api/TwitterPoster.js "{NEW_TWEET_TEXT}"`
- Update the file with the new tweet text under the `# TWEET` section
- Add status section to file: `# STATUS\n\nIdea added to system on: [Date Idea was loaded into unstarted ideas]\nInitial Tweet generated on: [Date LLM wrote the tweet]\nEvaluated on: [Today's date]\nPublished to X: Yes`
- Move the file from `ideasInProgress/` to a `ideasReadytoPost/` directory (create if needed)

**If user chooses 3 (Discard):**
- Add status section to file: `# STATUS\n\nIdea added to system on: [Date Idea was loaded into unstarted ideas]\nInitial Tweet generated on: [Date LLM wrote the tweet]\nEvaluated on: [Today's date]\nPublished to X: No`
- Move the file from `ideasInProgress/` to a `ideasReadytoPost/` directory (create if needed)
- Continue to next file

### Step 4: Twitter Posting
- Use this exact bash command format: `node api/TwitterPoster.js "{TWEET_HERE}"`
- Replace `{TWEET_HERE}` with the actual tweet text
- Ensure quotes are properly escaped if needed

### Step 5: File Management
- Create `ideasReadytoPost/` directory if it doesn't exist
- All processed files (approved, edited, or discarded) go to `ideasReadytoPost/` to keep `ideasInProgress/` clean
- Continue until all files in `ideasInProgress/` have been processed

## Important Notes
- Process files one at a time to avoid overwhelming the user
- Always extract the complete tweet text from after the `# TWEET` heading
- Handle multi-line tweets properly by including all content
- Provide clear feedback after each posting attempt