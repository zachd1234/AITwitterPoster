# Review Batch Command

Interactive review process for all ideas in `ideasInProgress/`.

## Process
1. Get all files from `ideasInProgress/` (sorted by priority)
2. For each file:
   - Display the original idea
   - Display the generated tweet
   - Present options: **Approve**, **Edit**, **Disapprove**
   
3. Handle user choice:
   - **Approve**: Move to `ideasReadytoPost/` unchanged
   - **Edit**: Allow user to modify tweet, then move to `ideasReadytoPost/`
   - **Disapprove**: Move to `finished ideas/`

## Interactive Format
For each idea, show:
```
IDEA: [Original concept]
TWEET: [Generated tweet]

Options:
a) Approve - move to ready-to-post
e) Edit - modify tweet then approve  
d) Disapprove - move to finished
```

## Batch Summary
After reviewing all ideas, show:
- Total reviewed: X
- Approved: X (moved to ready-to-post)
- Edited: X (moved to ready-to-post)  
- Disapproved: X (moved to finished)
- Ready for posting: X ideas queued