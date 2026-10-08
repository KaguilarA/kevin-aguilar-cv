# Kevin Aguilar — Senior Frontend Engineer & Systems Architect CV Web App

High-performance, futuristic portfolio & interactive CV application built with React 19, TypeScript, Tailwind CSS, HTML5 Canvas 2D engine, and native Web Audio API.

---

## 🚀 Automated Deployment with GitHub Actions

This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that builds and deploys the site to **GitHub Pages** on every push to `main`.

### Steps to Publish:

1. **Create a new repository on GitHub**:
   - Go to [GitHub New Repository](https://github.com/new).
   - Name it `cv` or `portfolio` (or `kaguilara.github.io` for a user-root domain).

2. **Connect remote & push**:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages in GitHub settings**:
   - In your GitHub repository, navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.

The workflow will trigger immediately, build the bundle with Node 22, and publish your CV live!

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run production build & verify TypeScript
npm run build
```
