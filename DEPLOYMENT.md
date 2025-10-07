# Deployment Instructions

## 1. GitHub Repository Setup

### Option A: Using GitHub CLI (if available)
```bash
gh repo create ai-app-starter-template --public --description "Modern React TypeScript starter template for AI-generated applications"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-app-starter-template.git
git push -u origin main
```

### Option B: Manual GitHub Setup
1. Go to https://github.com/new
2. Repository name: `ai-app-starter-template`
3. Description: `Modern React TypeScript starter template for AI-generated applications. Built with Vite, Tailwind CSS, and shadcn/ui.`
4. Make it Public
5. Don't initialize with README (we already have one)
6. Click "Create repository"

Then run:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-app-starter-template.git
git push -u origin main
```

## 2. Vercel Deployment

### Option A: Using Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### Option B: Via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - Framework Preset: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`
4. Deploy!

## 3. Environment Variables
No environment variables needed for this starter template.

## 4. Custom Domain (Optional)
Once deployed, you can add a custom domain in Vercel dashboard under your project settings.

## 5. Expected URLs
- GitHub: `https://github.com/YOUR_USERNAME/ai-app-starter-template`
- Vercel: `https://ai-app-starter-template.vercel.app` (or similar)

## 6. Updating the Deployment
Any push to the main branch will automatically trigger a new deployment on Vercel.