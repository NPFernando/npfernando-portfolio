# Future-Proof Personal Portfolio

Static-first, Azure-optimized portfolio built with React, Vite, and TypeScript. Content is typed and validated with Zod, styled with Tailwind CSS, and wired for GitHub → Azure Static Web Apps CI/CD.

## Architecture decisions

- **Static-first**: Pre-rendered UI, minimal JS, optimized for edge delivery via Azure Static Web Apps. `staticwebapp.config.json` keeps SPA routing predictable.
- **Data as content**: Skills, projects, and learning plans live in `src/content/*.json` and are validated by `src/lib/schema.ts` to prevent drift.
- **Future-ready**: Feature flags (`src/lib/constants.ts`) reserve space for Azure Functions, Entra ID, and telemetry without replatforming. `api/README.md` documents how to light up Functions later.
- **Styling**: Tailwind with CSS variables for theming. Dark mode is persisted to `localStorage`.
- **Quality gates**: Flat ESLint config (`eslint.config.js`) + Prettier, strict TypeScript, and CI lint/build steps. Lighthouse/axe are expected additions when automation is introduced.

## Project structure

```
src/
 ├─ components/   # Layout primitives, theme toggle, shared cards
 ├─ pages/        # Page-level composition (Home)
 ├─ content/      # Typed JSON content (skills, projects, learning)
 ├─ lib/          # Schemas (Zod), constants, theming hooks, content loader
 ├─ styles/       # Tailwind entry + CSS variables
 └─ main.tsx      # Entry point
api/              # Placeholder notes for future Azure Functions
.github/workflows # Azure Static Web Apps workflow
staticwebapp.config.json # SPA routing + headers
```

## Getting started

```bash
npm ci
npm run dev      # local dev on http://localhost:5173
npm run lint     # ESLint (flat config) with Tailwind plugin
npm run format   # Prettier check
npm run build    # Type-check + Vite production build
npm run analyze  # Optional: bundle treemap (requires rollup-plugin-visualizer)
```

### Live GitHub data

1. Copy `.env.example` to `.env.local` and set `VITE_GITHUB_USERNAME` to your GitHub handle.
2. The site fetches public profile and recent repository data at runtime using the unauthenticated GitHub API.
3. Do not place a GitHub PAT or any other secret in `VITE_*` variables. Vite exposes frontend environment variables to the browser bundle. If authenticated GitHub calls are needed later, add an Azure Function proxy and keep the token server-side.

### Toggle visibility

- `VITE_SHOW_PROJECTS=true|false` controls whether the Projects section renders (default `true`).

### Bundle analysis

- Optional: install `rollup-plugin-visualizer` when needed (`npm install -D rollup-plugin-visualizer`) and run `npm run analyze` to generate `dist/bundle-report.html`.

## Deploying to Azure Static Web Apps

1. Create a Static Web App (Free tier is fine) and capture the deployment token.
2. Add the token to GitHub secrets as `AZURE_STATIC_WEB_APPS_API_TOKEN_ZEALOUS_ROCK_040D5B91E`.
3. Enable deploys by setting the GitHub repository variable `AZURE_STATIC_WEB_APPS_DEPLOY_ENABLED=true`. Keep this disabled when the Azure app or deployment token is being rotated so lint/build checks can still pass.
4. Push to `main`. The workflow at `.github/workflows/azure-static-web-apps-zealous-rock-040d5b91e.yml` will install dependencies, lint, build, and, when deploys are enabled, upload the prebuilt `dist/` artifact. Pull requests get preview environments; closing a PR tears the preview down when deploys are enabled.
5. If deployment fails with `No matching Static Web App was found or the api key was invalid`, regenerate the deployment token from the active Azure Static Web App and update the GitHub secret before re-enabling deploys.
6. When you add serverless endpoints, place Functions under `api/` and set `api_location` in the workflow as needed (already reserved).

## Content & customization

- **Edit content**: Update JSON in `src/content/`. Schemas in `src/lib/schema.ts` validate shape and levels; parsing happens in `src/lib/content.ts`.
- **Metadata**: Adjust site info, feature flags, and contact links in `src/lib/constants.ts`. `SITE.contentVersion` surfaces in the UI for lightweight content versioning.
- **Branding**: Replace `/favicon.svg` and `/og-preview.svg` in `public/`. Update Open Graph tags in `index.html`.
- **Resume/CV**: HTML CV is served from `public/cv/index.html` with download at `public/cv/NPFernando_CV.docx`. Update `resumeUrl`/`resumeDownloadUrl` in `src/lib/constants.ts` if you change filenames.
- **Theming**: Tweak CSS variables in `src/styles/global.css` and Tailwind tokens in `tailwind.config.cjs`.
- **Accessibility & performance**: Semantic landmarks, ARIA where relevant, dark/light support, and minimal assets. Use `loading="lazy"` + width/height on any future media. Add Lighthouse/axe checks to CI as needed.

## Licensing and assets

- Code is MIT licensed (see `LICENSE`).
- Personal assets (portrait, favicon/og art, CV files under `public/cv`, and any photos in `img/`) are provided for this portfolio only and are not licensed for reuse or redistribution. Please do not copy or republish them.

## Extending further

- **Azure Functions**: Scaffold endpoints in `api/` and share Zod contracts with the frontend. Protect routes via `staticwebapp.config.json` when Entra ID is enabled.
- **Auth-ready**: Navigation and sections are structured to support protected dashboards; plug Entra ID once identities are available.
- **Data sources**: Swap or enrich JSON content with CMS/webhooks; keep validation at the boundary to guard the UI.
- **Feature flags**: `FEATURE_FLAGS` allows static toggles for risky features; connect to a provider later if runtime toggles are required.

## Compliance with the prompt

- Sections: Hero, About, Skills Matrix, Projects (problem/architecture/trade-offs/status), Learning & Growth, Future-Ready Capabilities, Contact.
- Engineering: Strict TypeScript, Tailwind, Zod validation, absolute imports, dark mode persistence, accessibility-first markup.
- Cloud: Azure Static Web Apps workflow with previews, SPA config, hooks for Functions/Entra ID.
- Performance: Static-first build, CSP headers, small bundle, minimal assets, and CDN-friendly output (`dist/`).
