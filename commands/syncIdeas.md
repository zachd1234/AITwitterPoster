# Sync Ideas Workflow

This workflow syncs Notion changes and generates new tweet ideas using Claude Code agentically.

## Step 1: Run Notion Sync

Agent instructions: Get the page content of the first page ID that is connected using the run_script tool. If Notion is not connected, connect Notion. Then once you get the Notion information, compare it with what is in notion/userNotes.md. Extract the diff for the next step. Also update whatever is currently in notion/userNotes.md with the new version.

## Step 2: Extract and Rank Tweet Ideas Agentically

You are a sharp, opinionated Twitter ghostwriter for a founder. You're reading a raw dump of messy personal notes, thoughts, and observations from the Notion sync above.

Your job is to:

1. **Extract tweet ideas** for a smart Twitter audience of elite founders, engineers, and investors
2. **Rank and add them** to the priority queue using binary search

### Extraction Criteria
Pull only ideas that are:
- Original or surprising
- Easy to understand at a glance  
- Likely to trigger curiosity, agreement, or action
- Related to startups, AI, productivity, or founder mindset

Extract up to 3 tweet ideas. Each should be punchy, self-contained, and ready for ranking.

### Binary Search Ranking Process

For each extracted idea, perform this exact binary search algorithm:

1. **List all existing ideas** in `unstarted ideas/` directory in descending order by score (highest first)
2. **Start binary search:**
   - Set `left = 0` and `right = total_ideas - 1`
   - Find `mid = (left + right) / 2` (rounded down)
3. **Compare new idea vs. idea at mid position:**
   - Read the idea content from the mid-position file
   - Do head-to-head comparison using ranking criteria:
     - **Newness:** How original or non-obvious is the idea?
     - **Behavior Change Potential:** How likely is it to change how someone thinks or acts?
     - **Simplicity:** How clearly and compactly can the core idea be expressed?
     - **Virality:** Would the idea be engaging or shareable on Twitter?
   - **If new idea is BETTER:** `right = mid - 1` (search higher priority half)
   - **If existing idea is BETTER:** `left = mid + 1` (search lower priority half)
4. **Repeat until you find the insertion position**
5. **Calculate new score:**
   - If inserting at position 0 (better than best): `highest_score + 5000`
   - If inserting at end (worse than worst): `lowest_score / 2`
   - If inserting between two ideas: `(higher_score + lower_score) / 2`
6. **Create the new idea file** with the calculated score

### Example Binary Search Steps:
```
Ideas: [100000, 90000, 80000, 70000, 60000, 50000, 40000]
Step 1: Compare vs 70000 (mid=3) → New idea is better → right=2
Step 2: Compare vs 90000 (mid=1) → Existing is better → left=2  
Step 3: Compare vs 80000 (mid=2) → New idea is better → Insert at position 2
New Score: (90000 + 80000) / 2 = 85000
```

### File Format
Create files like `unstarted ideas/[SCORE]idea.md` with this format:

```markdown
#IDEA

[Add the extracted idea text here VERBATIM]

---

#TWEET

# STATUS

Idea added to system on: [current date]
Initial Tweet generated on: [Date LLM wrote the tweet]
Evaluated on: [Date user reviewed idea for tweet-worthiness]
Published to X: Yes / No
```

### Workflow Summary

1. Run notion sync to get latest changes (the output will be in your context)
2. Extract 3 high-quality tweet ideas from the diff content
3. Agentically perform binary search ranking against existing ideas
4. Create properly formatted idea files at the correct priority positions

Ignore grammar or polish during ranking. Focus only on idea strength and potential impact.