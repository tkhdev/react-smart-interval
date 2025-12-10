# Deploying the Demo to Vercel

This demo is a React + Vite application ready to deploy on Vercel.

## Option 1: Deploy via Vercel Dashboard

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite
6. Configure the build settings:
   - **Root Directory**: `demo`
   - **Build Command**: `cd .. && npm install && npm run build && cd demo && npm install && npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `cd .. && npm install && cd demo && npm install`
7. Click "Deploy"

## Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to demo directory
cd demo

# Deploy
vercel

# Follow the prompts
```

## Local Development

```bash
# Install dependencies
cd demo
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Important Notes

- The demo uses the local package from the parent directory
- Make sure the parent package is built before deploying
- Update the demo URL in the main README after deployment
- The demo will use the published npm package in production

## Updating the Demo Link

After deployment, update the demo link in:
- `README.md` (main package README)
- Replace `https://react-smart-interval-demo.vercel.app` with your actual Vercel URL
