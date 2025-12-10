# Pre-Publish Checklist

Use this checklist before publishing to npm to ensure everything is ready.

## ✅ GitHub Setup

- [ ] Repository created on GitHub
- [ ] All code pushed to GitHub
- [ ] Repository is accessible
- [ ] README displays correctly on GitHub

## ✅ Vercel Demo Deployment

- [ ] Demo deployed to Vercel
- [ ] Demo URL received and saved
- [ ] All demo examples work correctly
- [ ] Pause/resume behavior verified

## ✅ Link Updates

### README.md
- [ ] Line 5: Demo link updated
- [ ] Line 305: Demo link in "Live Demo" section updated
- [ ] npm link will auto-update after publishing

### demo/src/App.tsx
- [ ] Line 27: GitHub link updated
- [ ] Footer GitHub link updated

### package.json
- [ ] `repository.url` filled
- [ ] `bugs.url` filled
- [ ] `homepage` filled (optional)

## ✅ Final Verification

- [ ] No placeholders in any files
- [ ] All links tested and working
- [ ] Package builds successfully
- [ ] All tests pass
- [ ] Bundle size within limits
- [ ] TypeScript compiles without errors
- [ ] Linter passes
- [ ] Formatter passes

## ✅ Ready to Publish

- [ ] Package name verified on npm
- [ ] Version number correct (1.0.0)
- [ ] `npm pack` verified
- [ ] All documentation links work
- [ ] Final commit pushed to GitHub

## Commands to Run Before Publishing

```bash
# 1. Build
npm run build

# 2. Test
npm test

# 3. Lint
npm run lint

# 4. Format check
npm run format:check

# 5. Bundle size
npm run size

# 6. Dry run
npm pack

# 7. Verify tarball
tar -tzf react-smart-interval-1.0.0.tgz

# 8. Clean up
rm react-smart-interval-1.0.0.tgz

# 9. Publish
npm publish
```

