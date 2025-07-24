# Personal Idea Refinery - Getting Started

## System Overview
A personal content engine that transforms raw thoughts into viral-ready Twitter posts. This system captures fleeting insights, converts them into viral assets with zero cognitive overhead, and documents your intellectual output over time.

### What This System Really Does
- **Captures** raw ideas, rants, and fragments before they're lost
- **Refines** thoughts using intelligent priority ranking via binary search
- **Transforms** ideas into viral tweets optimized for your unique voice
- **Builds** your online presence and audience without performative effort
- **Documents** your worldview and thinking evolution over time

### The Flow
1. **Input**: Jot raw ideas into numbered .md files using `/addIdea`
2. **Queue**: Ideas live in `unstarted ideas/` waiting to be processed
3. **Processing**: `/generatePost` moves top idea to `ideasInProgress/` and runs it through Tweet Forge
4. **Output**: File contains both original idea and polished, tweet-ready version
5. **Future**: Post to Twitter, track engagement, recycle high performers

## Directory Structure

```
idea-refinery/
├── CLAUDE.md                    # Getting started context for Claude Code
├── unstarted ideas/             # Creative inbox - raw thoughts waiting to be refined
│   ├── 100000idea.md           # Highest priority idea
│   ├── 90000idea.md            # Second highest priority
│   └── ...                     # Additional ideas in descending order
├── ideasInProgress/             # Ideas + generated tweets ready for posting
└── .claude/
    └── commands/
        ├── addIdea.md          # Capture new ideas with priority ranking
        └── generatePost.md     # Transform ideas into viral tweets
```

## Quick Context
- **Purpose**: Personal content engine and intellectual documentation system
- **Target Audience**: Elite founders, investors, and high-quality engineers
- **Output Format**: Viral-optimized Twitter posts that grow audience and sharpen thinking
- **Ranking System**: Binary search-based priority with 10,000-point spacing for seamless insertion

## Getting Started

### Available Slash Commands
- `/addIdea "Your raw thought here"` - Capture and rank new ideas using intelligent binary search
- `/generatePost` - Transform your highest priority idea into a viral tweet and move to processing

### Key Directories
- `unstarted ideas/` - Your creative inbox of raw thoughts waiting to be refined
- `ideasInProgress/` - Polished ideas with viral tweets ready for posting
- `.claude/commands/` - Command workflows that power your content engine

### Typical Workflow
1. Capture fleeting thoughts with `/addIdea` before they're lost
2. Let the system intelligently rank and queue your ideas
3. Use `/generatePost` to transform top ideas into viral content
4. Post tweets and track what resonates with your audience
5. Recycle high performers into threads, essays, or video content

## System Design Notes
- **Ranking Factors**: Ideas compared on newness, behavior change potential, simplicity, and virality
- **Spacing System**: 10,000-point intervals (100000, 90000, 80000...) allow seamless insertion
- **Binary Search**: New ideas positioned exactly halfway between ranking neighbors
- **Content Focus**: Prioritize idea strength over grammar during comparisons - polish comes later

## Future Enhancements
- Direct Twitter API integration for automated posting
- Engagement tracking and performance analytics
- High-performer recycling into threads, essays, and video content
- Voice-to-text idea capture for mobile workflows

## Maintenance
**Important**: Update this CLAUDE.md file whenever new folders or key files are added to maintain accurate system documentation.