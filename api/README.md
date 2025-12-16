# Azure Functions (future-ready)

This folder is intentionally lightweight. When serverless endpoints are needed, add Azure Functions here (JavaScript/TypeScript). Suggested steps:

1. `npm install -g @azure/static-web-apps-cli` (local only) then `swa start http://localhost:5173 --api-location ./api`.
2. Scaffold a function: `npm create @azure/functions@latest --templates cts --no-compile -n hello`.
3. Keep contracts typed and reuse Zod schemas from `src/lib/schema.ts` for request/response validation.
4. Wire Entra ID auth via `staticwebapp.config.json` routes once protected dashboards land.

The GitHub workflow already reserves `api_location` for when Functions are added.
