# Repository Guidelines

## Project Structure & Module Organization
The primary Next.js application resides in `construction-project-agent`. UI routes live under `src/app`, using folder-based routing such as `src/app/results/page.tsx` for the prioritized project table. Shared layout and Tailwind theme tokens are defined in `src/app/layout.tsx` and `src/app/globals.css`. Static assets should go to `public/`, while design references for agents are stored in `frontend/agents` and should remain untouched.

## Build, Test, and Development Commands
Run all commands from `construction-project-agent`. `npm install` bootstraps dependencies. `npm run dev` starts the Turbopack dev server on port 3000. `npm run build` compiles the production bundle and validates TypeScript. `npm run start` serves the built app. `npm run lint` runs the Next + TypeScript ESLint config; ensure it is clean before committing.

## Coding Style & Naming Conventions
Use TypeScript with strict mode enabled. Components follow PascalCase (for example, `ResultsPage`) and helpers use camelCase. Prefer functional components and hooks, keeping business logic ready to extract into `src/lib` as it grows. Apply two-space indentation and single quotes in JSX as seen in existing files. Compose Tailwind utilities rather than bespoke CSS, and update `globals.css` only for shared tokens. Import shared modules through the `@/` alias defined in `tsconfig.json`.

## Testing Guidelines
No automated tests exist yet. When adding features, introduce React Testing Library or Playwright coverage under `src/tests` to exercise new flows, especially form submission and routing guards. At minimum, run manual smoke tests: submit the contractor form, confirm `sessionStorage` keys (`contractorName`, `companyDescription`) are set, and verify the `/results` ranking renders the expected rows. Document any test gaps in the pull request.

## Commit & Pull Request Guidelines
Write concise, imperative commit messages (for example, `Add results table filters`). Keep unrelated changes out of the same commit. Pull requests should summarize scope, link relevant issues, note manual or automated test results, and attach screenshots or screen recordings for UI changes. Request review only once lint passes and conflicts are resolved.

## UI & Asset Notes
Use `frontend/agents/design_reference.jpg` as the visual baseline. Keep palette variables in `globals.css` (`--orange-primary`, `--gray-dark`, etc.) aligned with new designs. New static assets belong in `public/` and should be optimized before committing.
