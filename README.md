# Tech Stack

KotonoBuddy’s development environment and workflows are powered by:

## 🛠 Local Toolchain
- **Node.js v18 LTS** managed via [asdf]
- **Yarn v1.22.19** as the package manager

## 🚀 Frontend Framework
- **React 18 + TypeScript** scaffolded with **Vite** for:
  - Instant HMR and fast rebuilds
  - Small, tree-shaken production bundles

## 🐳 Containerized Dev Environments
- **`.devcontainer/Dockerfile`**
  – VS Code Remote–Containers image (Node, Git, Dev tools + extensions)
- **`Dockerfile.dev` + `docker-compose.yml`**
  – App server container running Vite (`yarn dev --host 0.0.0.0`)
  – Code volume mounts + port forwarding (5173)

## 💻 Editor Integration
- **Visual Studio Code** with:
  - **Remote–Containers** to “Reopen in Container”
  - Recommended extensions: ESLint, Prettier, React/TS snippets
  - Workspace settings for format-on-save and lint validation

## 🎯 Code Quality & Automation
- **ESLint** + **Prettier** for consistent linting & formatting
- **Husky** + **lint-staged** to auto-lint & format on every commit
- **`.env.example`** pattern + git-ignored `.env.local` for env vars

## 🔄 Continuous Integration
- **GitHub Actions** workflow (`.github/workflows/ci.yml`) that on every push or PR to `main`:
  1. Checks out code
  2. Sets up Node.js & caches dependencies
  3. Runs `yarn install --frozen-lockfile`
  4. Executes `yarn lint`, `yarn test`, and `yarn build`

## 📦 Dependency Management
- **Committed lockfile** (`yarn.lock`) for reproducible installs
- **Dependabot** configured for weekly dependency bump PRs

## 🔒 Branch Protection
- **Branch protection rules** on `main` requiring:
  - Passing CI status checks
  - At least one approved pull-request review
  - (Optional) Up-to-date merges before allowing a merge  
