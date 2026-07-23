# OMS Backend - Security Notes

- Do NOT commit secrets. Use a local `.env` file or environment variables in CI/hosting.
- If credentials were committed, rotate them immediately and remove them from git history (use `git filter-repo` or BFG).

Quick setup:

1. Copy `.env.example` to `.env` and fill in `MONGODB_URI`.
2. Install deps: `npm install`.
3. Start: `npm start`.

To purge secrets from git history (example):

- Install `git-filter-repo` and run:

```bash
git filter-repo --invert-paths --paths .env
```

Or use the BFG Repo-Cleaner; follow its docs.

Also rotate any database credentials exposed in commits.
