# Kynara - GitHub Pages Deployment Guide

## Overview
Your Kynara shopping app is now configured with **Indonesian Rupiah (Rp)** currency and ready to deploy to GitHub Pages. When deployed, your React app will be automatically converted to optimized HTML, CSS, and JavaScript files.

## Pre-Deployment Checklist

### 1. Update Repository Name in Config
Open `/vite.config.ts` and change the `base` setting to match your GitHub repository name:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Replace with YOUR actual repository name
  // ...
});
```

**Example:** If your repo is `https://github.com/yourusername/kynara-shop`, set `base: '/kynara-shop/'`

### 2. Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (e.g., "kynara-shop")
3. **Don't** initialize with README, .gitignore, or license (we already have code)

### 3. Initialize Git and Push Code

Open your terminal in the project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: Kynara shopping app with Rupiah currency"

# Add your GitHub repository as remote (replace with YOUR repo URL)
git remote add origin https://github.com/yourusername/kynara-shop.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in left sidebar)
3. Under "Build and deployment":
   - **Source:** Select "GitHub Actions"
4. The workflow will run automatically on every push to main branch

## What Happens When You Deploy

When you push code to GitHub:

1. **GitHub Actions runs** (check the "Actions" tab in your repo)
2. **Build process:**
   - Installs dependencies
   - Compiles your React/TypeScript code
   - Bundles everything into optimized files:
     - `index.html` - Single HTML entry point
     - `assets/*.js` - Compiled JavaScript (all React code)
     - `assets/*.css` - Compiled CSS (all Tailwind styles)
3. **Deploys** to GitHub Pages
4. **Live in ~2 minutes** at: `https://yourusername.github.io/your-repo-name/`

## After Deployment

### Your live app will have:
- ✅ All React functionality working as regular JavaScript
- ✅ Responsive design working on all devices
- ✅ Shopping cart with localStorage persistence
- ✅ User authentication
- ✅ Order tracking with status updates
- ✅ Indonesian Rupiah currency formatting
- ✅ All images and styles loaded correctly

### Making Updates
Just push changes to GitHub:
```bash
git add .
git commit -m "Updated product prices"
git push
```

The site will automatically rebuild and redeploy in ~2 minutes.

## Troubleshooting

### Images not loading?
- Make sure `base` in `vite.config.ts` matches your repo name exactly
- GitHub repo names are case-sensitive

### 404 Page not found?
- Check that GitHub Pages is set to use "GitHub Actions" source
- Verify the repository name in vite.config.ts

### Build failing?
- Go to the "Actions" tab in your GitHub repo
- Click on the failed workflow to see error details
- Usually caused by syntax errors or missing dependencies

## Local Development

To test locally before deploying:

```bash
# Install dependencies (first time only)
npm install

# Run development server
npm run dev

# Build for production (test the build)
npm run build

# Preview production build
npm run preview
```

## Technology Stack

Your app uses modern web technologies that compile to standard web files:

- **React** → Compiles to vanilla JavaScript
- **TypeScript** → Compiles to JavaScript
- **Tailwind CSS** → Compiles to optimized CSS
- **Vite** → Fast build tool and dev server

The end result is pure HTML/CSS/JS that works in any browser without requiring React to be installed.

## Important Notes

- 📱 The app is fully responsive (works on mobile and desktop)
- 💾 Data is stored in browser localStorage (no database needed)
- 🔒 This is a demo app - not suitable for real payments or sensitive data
- 🌐 Your app will be public at the GitHub Pages URL
- 🆓 GitHub Pages is completely free for public repositories

## Need Help?

1. Check the "Actions" tab in GitHub for build logs
2. Verify all file paths are correct
3. Make sure vite.config.ts has the right repository name
4. Test locally with `npm run build` and `npm run preview`

---

Happy deploying! 🚀
