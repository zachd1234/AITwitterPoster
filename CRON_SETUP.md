# Auto-Post Cron Job Setup

## Quick Setup

1. **Edit your crontab:**
   ```bash
   crontab -e
   ```

2. **Add one of these lines** (choose your preferred frequency):

   **Every hour:**
   ```
   0 * * * * /Users/zachderhake/meeting-coach-1/scripts/cron-autopost.sh
   ```

   **Every 4 hours:**
   ```
   0 */4 * * * /Users/zachderhake/meeting-coach-1/scripts/cron-autopost.sh
   ```

   **Twice daily (9 AM and 5 PM):**
   ```
   0 9,17 * * * /Users/zachderhake/meeting-coach-1/scripts/cron-autopost.sh
   ```

   **Once daily at 10 AM:**
   ```
   0 10 * * * /Users/zachderhake/meeting-coach-1/scripts/cron-autopost.sh
   ```

   **Once daily at 11:06 AM:**
   ```
   6 11 * * * /Users/zachderhake/meeting-coach-1/scripts/cron-autopost.sh
   ```

3. **Save and exit** (in vim: `:wq`, in nano: `Ctrl+X` then `Y`)

## How It Works

- Script checks `ideasReadytoPost/` for highest priority idea file
- Extracts tweet content from `## Generated Tweet` section
- Posts to Twitter using your configured API credentials
- Moves posted idea to `finished ideas/` folder
- Logs all activity to `logs/autopost.log`

## Monitoring

Check the logs:
```bash
tail -f logs/autopost.log
```

View current cron jobs:
```bash
crontab -l
```

## Troubleshooting

- Ensure your `.env` file has valid Twitter API credentials
- Check file permissions: `ls -la scripts/cron-autopost.sh`
- Test manually: `./scripts/cron-autopost.sh`
- Check cron logs: `tail /var/log/cron.log` (may require sudo)