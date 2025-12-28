#!/bin/bash
# Run from: ~/Desktop/ClimIntell/api-docs-site

cd ~/Desktop/ClimIntell/api-docs-site || exit 1

# Backup
BACKUP="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP"
cp -r README.md DEPLOYMENT.md docusaurus_config.js docs "$BACKUP/"

# Fix all emails and URLs
find . -type f \( -name "*.md" -o -name "*.js" \) \
    -not -path "./node_modules/*" \
    -not -path "./build/*" \
    -not -path "./.docusaurus/*" \
    -not -path "./backup_*/*" \
    -exec sed -i '' 's/climintell@gmail\.com/contact@climintell.com/g' {} \; \
    -exec sed -i '' 's/support@climintell\.com/contact@climintell.com/g' {} \; \
    -exec sed -i '' 's|github\.com/climintell/api-docs|github.com/kunaldhadse45/climintell-api-docs|g' {} \;

# Fix broken link in intro.md
sed -i '' 's|\[API Reference\](docs/api-reference)|[API Reference](/docs/api-reference)|g' docs/intro.md

echo "✓ All fixes applied"
echo "Backup: $BACKUP"
echo ""
echo "Next steps:"
echo "git add ."
echo "git commit -m \"Fix: Update email and GitHub URLs\""
echo "git push origin main"
echo "npm run deploy"
