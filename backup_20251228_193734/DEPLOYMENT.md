# GitHub Pages Deployment Guide

Complete guide to deploying ClimIntell API documentation to GitHub Pages.

## 🚀 Quick Deploy (5 Minutes)

### Step 1: Create GitHub Repository

```bash
# On GitHub:
1. Go to https://github.com/new
2. Repository name: api-docs
3. Owner: climintell (or your organization)
4. Public repository
5. Click "Create repository"
```

### Step 2: Push Documentation to GitHub

```bash
# Navigate to the api-docs-site folder
cd api-docs-site

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ClimIntell API documentation"

# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/climintell/api-docs.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 3: Configure GitHub Pages

```bash
# On GitHub repository page:
1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: Select "gh-pages"
4. Folder: "/ (root)"
5. Click Save
```

### Step 4: Deploy

```bash
# Install dependencies
npm install

# Deploy to GitHub Pages
GIT_USER=<your-github-username> npm run deploy
```

**OR** with SSH:

```bash
USE_SSH=true npm run deploy
```

### Step 5: Access Your Documentation

Your documentation will be live at:
```
https://climintell.github.io/api-docs/
```

## 🔧 Detailed Setup

### Prerequisites

- Node.js 18+ installed
- Git installed
- GitHub account with access to climintell organization
- npm or yarn package manager

### Full Installation

```bash
# 1. Extract the provided zip file
unzip api-docs-site.zip
cd api-docs-site

# 2. Install dependencies
npm install

# 3. Test locally
npm start
# Visit http://localhost:3000

# 4. Build production version
npm run build

# 5. Test production build
npm run serve
# Visit http://localhost:3000
```

### Configure Git

```bash
# Set your Git credentials
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Verify
git config --list
```

### Push to GitHub

```bash
# Initialize repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ClimIntell API documentation"

# Add remote
git remote add origin https://github.com/climintell/api-docs.git

# Push
git branch -M main
git push -u origin main
```

## 🌐 GitHub Pages Configuration

### Enable GitHub Pages

1. Go to repository Settings
2. Navigate to "Pages" in left sidebar
3. Under "Build and deployment":
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)
4. Click "Save"

### Deploy Script

The `npm run deploy` command:
1. Builds the static site (`npm run build`)
2. Pushes build to `gh-pages` branch
3. GitHub Pages automatically deploys from `gh-pages`

### Manual Deployment

```bash
# Build the site
npm run build

# Deploy using docusaurus deploy command
npm run deploy
```

### With Custom Domain (Optional)

If you have a custom domain like `docs.climintell.com`:

```bash
# 1. Add CNAME file to static folder
echo "docs.climintell.com" > static/CNAME

# 2. Commit and deploy
git add static/CNAME
git commit -m "Add custom domain"
git push

npm run deploy

# 3. Configure DNS (at your domain registrar):
# Add CNAME record:
# Name: docs
# Value: climintell.github.io
```

## 🔄 Updating Documentation

### Make Changes

```bash
# 1. Make your changes to markdown files in docs/
# Example: Edit docs/getting-started.md

# 2. Test locally
npm start

# 3. Commit changes
git add .
git commit -m "Update: Improve getting started guide"
git push

# 4. Deploy to GitHub Pages
npm run deploy
```

### Auto-Deploy with GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci
      
      - name: Build website
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

Now every push to `main` automatically deploys!

## 🎨 Customization

### Update Branding

**Logo:**
```bash
# Add your logo to static/img/
# Then update docusaurus.config.js:
navbar: {
  logo: {
    alt: 'ClimIntell Logo',
    src: 'img/your-logo.svg',
  },
}
```

**Colors:**
```css
/* Edit src/css/custom.css */
:root {
  --climintell-blue: #3b82f6;
  --climintell-dark: #1e40af;
  --climintell-light: #60a5fa;
}
```

**Favicon:**
```bash
# Replace static/img/favicon.ico
# With your favicon
```

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
npm run clear
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Fails

```bash
# Check Git credentials
git config user.name
git config user.email

# Try with verbose logging
GIT_USER=<username> npm run deploy -- --verbose
```

### Page Not Loading

1. Check GitHub Pages is enabled in Settings
2. Verify `gh-pages` branch exists
3. Check repository visibility (public)
4. Wait 2-3 minutes for deployment
5. Clear browser cache

### Wrong Base URL

If pages load but links break:

```javascript
// Check docusaurus.config.js
url: 'https://climintell.github.io',
baseUrl: '/api-docs/',  // Must match repository name
```

## 📊 Analytics (Optional)

### Add Google Analytics

```javascript
// In docusaurus.config.js
themeConfig: {
  googleAnalytics: {
    trackingID: 'G-XXXXXXXXXX',
    anonymizeIP: true,
  },
}
```

### Add Search (Algolia)

Contact Algolia DocSearch for free documentation search:
https://docsearch.algolia.com/apply/

## 🔐 Security

### Protect Sensitive Info

**Never commit:**
- Real API keys
- Passwords
- Private configuration

**Use placeholders:**
```bash
X-API-Key: YOUR_API_KEY_HERE  # Good
X-API-Key: climintell_abc123  # Bad!
```

### .gitignore

```bash
# Dependencies
node_modules/

# Production
build/

# Local environment
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
```

## 📈 Performance

### Optimize Images

```bash
# Use compressed images in static/img/
# Recommended: WebP format for best compression
```

### Enable Compression

GitHub Pages automatically serves gzipped content.

## ✅ Checklist

Before going live:

- [ ] Test all links work
- [ ] Verify code examples are correct
- [ ] Check mobile responsiveness
- [ ] Test search functionality
- [ ] Review all API references
- [ ] Verify contact information
- [ ] Check spelling/grammar
- [ ] Test in different browsers
- [ ] Verify custom domain (if applicable)
- [ ] Set up analytics (if desired)

## 🆘 Getting Help

**Docusaurus Issues:**
- Documentation: https://docusaurus.io/docs
- GitHub: https://github.com/facebook/docusaurus

**GitHub Pages Issues:**
- Documentation: https://docs.github.com/en/pages
- Support: https://support.github.com

**ClimIntell Documentation:**
- Email: climintell@gmail.com

---

**Ready to deploy?** Follow Step 1-5 above and your documentation will be live in minutes! 🚀
