# New Project Setup Checklist

Follow these steps every time you start a new project from this template.

---

## 1. Create the Repo from This Template
- On GitHub, click **Use this template → Create a new repository**
- Name the repo, set it to Public or Private, then clone it locally

## 2. Replace Placeholders
Search for and replace these strings throughout the project:

| Placeholder | Replace with |
|---|---|
| `PROJECT_NAME` | Your project/business name (e.g., `Acme Corp`) |
| `PROJECT_DESCRIPTION` | One-sentence site description for SEO |
| `YOUR_DOMAIN` | Your live domain (e.g., `acmecorp.com`) |

Files to update:
- `apps/web/index.html` — title, description, OG tags, domain URLs
- `apps/web/src/pages/HomePage.jsx` — title, description
- `package.json` — `"name"` field

## 3. Add Your Logo
- Drop your `logo.png` into `apps/web/public/`
- Drop your OG preview image as `apps/web/public/og-image.png` (1200×630px)

## 4. Connect to Netlify (Staging)
1. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
2. Connect to your GitHub repo, select the **develop** branch
3. Build command: `npm run build` | Publish directory: `dist/apps/web`
4. Save and grab the **Site ID** from Site Settings → General
5. Get your **Netlify Auth Token** from User Settings → Applications

## 5. Set Up GitHub Environments & Secrets

### Staging environment
Go to GitHub repo → **Settings → Environments → New environment** → name it `staging`

Add these secrets:
- `NETLIFY_AUTH_TOKEN` — from Netlify user settings
- `NETLIFY_SITE_ID` — from Netlify site settings

### Production environment
Go to **Settings → Environments → New environment** → name it `production`

Add these secrets:
- `SSH_KEY` — private key (generated in Step 6)
- `FTP_SERVER` — your Hostinger server IP (e.g., `82.25.82.63`)
- `FTP_USERNAME` — your Hostinger SSH username (e.g., `u815171420`)
- `DEPLOY_PATH` — full server path to public_html (e.g., `/home/u815171420/domains/yourdomain.com/public_html/`)

## 6. Generate SSH Deploy Keys (Hostinger)
1. In GitHub, go to **Actions → Generate SSH Deploy Keys → Run workflow**
2. Once it finishes, open the run logs
3. Copy the **PUBLIC KEY** → paste into Hostinger **SSH Access → Authorized Keys**
4. Copy the **PRIVATE KEY** (all 7 lines including BEGIN/END) → paste as `SSH_KEY` secret in GitHub

> **Hostinger SSH notes:**
> - SSH port is **65002** (not 22)
> - Enable SSH Access in Hostinger panel before adding keys
> - The label at the end of the public key (`github-deploy`) is optional — you can paste it all in Hostinger

## 7. Set Up Branches
```bash
git checkout -b develop
git push -u origin develop
```

## 8. Verify the Pipeline
- Push to `develop` → Netlify staging deploy runs
- Merge `develop` → `main` → Hostinger production deploy runs
- Open PRs targeting `develop` or `main` → CI lint/build runs

---

## Day-to-Day Workflow

```
feature/branch  →  develop (Netlify preview)  →  main (Hostinger live)
```

1. Create a feature branch from `develop`
2. Make changes, push to feature branch
3. Open PR → `develop`, CI runs
4. Merge to `develop` → auto-deploys to Netlify staging
5. When ready to go live, open PR → `main`
6. Merge to `main` → auto-deploys to Hostinger production

---

## Project Structure

```
project-root/
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Lint + build on PRs
│       ├── deploy-staging.yml      # develop → Netlify
│       ├── deploy-production.yml   # main → Hostinger
│       └── generate-keys.yml       # One-time SSH key setup
├── apps/
│   └── web/
│       ├── public/                 # Static assets (logo.png, og-image.png)
│       ├── src/
│       │   ├── components/         # Shared UI components
│       │   ├── pages/              # Route-level page components
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   └── index.css           # Tailwind + CSS variables
│       ├── index.html
│       ├── vite.config.js
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       ├── eslint.config.mjs
│       └── jsconfig.json
├── .nvmrc                          # Node version (20.19.1)
├── netlify.toml
├── package.json                    # Monorepo root
└── SETUP.md                        # This file
```
