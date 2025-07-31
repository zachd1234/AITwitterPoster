# Add Idea Command

Add a new idea to the priority queue using binary search ranking.

## Usage
```
/addIdea "Your idea text here"
```

## Workflow Instructions

When this command is triggered, follow these steps:

### Step 1: Get Current Ideas
- Use `ls -1 "unstarted ideas/"*.md | sort -t/ -k2 -nr` to list all idea files in reverse numerical order (highest numbers first)
- Count the total number of ideas

### Step 2: Binary Search Process
- Start with the full list of ideas
- Find the middle idea (halfway down the list)
- Read both the new idea and the middle idea content
- Use the head-to-head comparison prompt below

### Step 3: Head-to-Head Comparison
Use this exact prompt:

```
You are helping Zach choose the best ideas to share with his audience of elite founders, investors, and high-quality engineers.

Each idea will eventually be shared as a single tweet. You will be shown two ideas.

**Choose the more valuable one.** Value is defined by 4 factors:

* **Newness:** How original or non-obvious is the idea?
* **Behavior Change Potential:** How likely is it to change how someone in the audience thinks or acts?
* **Simplicity:** How clearly and compactly can the core idea be expressed? (Shorter and more concrete is better.)
* **Virality:** Would the idea be engaging or shareable on Twitter?

Ignore grammar or polish. Focus only on idea strength.

Idea A (New): [NEW_IDEA_TEXT]
Idea B (Existing): [EXISTING_IDEA_TEXT]

Which idea is more valuable? Respond with just "A" or "B".
```

### Step 4: Continue Binary Search
- If new idea (A) is better: Continue search in the upper half (higher numbers)
- If existing idea (B) is better: Continue search in the lower half (lower numbers)
- Repeat until you find the correct position between two adjacent ideas

### Step 5: Calculate Position Number
- Ideas are spaced by 10,000 (100000, 90000, 80000, etc.)
- Insert the new idea with a number exactly halfway between its neighbors
- Examples:
  - Between 90000 and 80000 → use 85000
  - Between 60000 and 50000 → use 55000
  - If it's the best idea → use 105000 (100000 + 5000)
  - If it's the worst idea → use 5000 (10000 / 2)

### Step 6: Create the File
- Create file named `[NUMBER]idea.md` in "unstarted ideas/" folder
- Use this exact format:

```
#IDEA 

[IDEA_TEXT]

---

#TWEET

# STATUS

Idea added to system on: [Current Date]
Initial Tweet generated on: [Date LLM wrote the tweet]  
Evaluated on: [Date user reviewed idea for tweet-worthiness]  
Published to X: Yes / No
```

- Fill in only the `#IDEA` section and "Idea added to system on" date
- Leave `#TWEET` section empty (will be filled by `/generatePost`)
- Leave other STATUS fields as template text

## Example
If adding idea "AI will replace middle management first" and it ranks between 70000idea.md and 60000idea.md, create `65000idea.md` with this content:

```
#IDEA 

AI will replace middle management first

---

#TWEET

# STATUS

Idea added to system on: July 25, 2025
Initial Tweet generated on: [Date LLM wrote the tweet]  
Evaluated on: [Date user reviewed idea for tweet-worthiness]  
Published to X: Yes / No
```