# Quick Deploy Guide 🚀

## 1. GitHub Setup (2 minutes)

1. Go to https://github.com/new
2. Repository name: `ai-app-starter-template`
3. Make it **Public**
4. Click "Create repository"

Then run these commands:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-app-starter-template.git
git push -u origin main
```

## 2. Vercel Deployment (1 minute)

1. Go to https://vercel.com/new
2. Click "Import" next to your GitHub repository
3. Leave all settings as default (Vercel auto-detects Vite)
4. Click "Deploy"

**Done!** Your app will be live at: `https://ai-app-starter-template.vercel.app`

## 3. Update Repository URLs

After creating the GitHub repo, update these files:
- `package.json` - Replace `YOUR_USERNAME` with your GitHub username
- `README.md` - Add the actual GitHub and Vercel URLs

## 4. Test Your Deployment

- ✅ Visit your Vercel URL
- ✅ Click the "Try Toast Notification" button
- ✅ Verify responsive design on mobile
- ✅ Check that all components load correctly

## 5. Optional: Custom Domain

In Vercel dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain

---

**Template is now ready to use as a baseline for AI-generated apps!** 🎯