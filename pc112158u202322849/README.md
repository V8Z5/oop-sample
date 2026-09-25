# UniversityFinder — Science-Focused Universities

Angular and TypeScript application for **EduTech Global Solutions, LLC**. Displays universities whose names contain **ciencias**, retrieved from the assignment's live Hipo Labs API:

`http://universities.hipolabs.com/search?name=ciencias`

## Author

- **Marlon Packard Viza Quispe**
- Student code: **u202322849** (taken from previous assignment filenames; confirm before submission).
- Universidad Peruana de Ciencias Aplicadas (UPC).

Author details can be edited in `src/app/public/application/developer.config.ts`.

## Run in WebStorm

1. Install **Node.js 24 LTS** (or a compatible Node version listed in `package.json`).
2. Clone this repository and open its root folder in WebStorm.
3. In the integrated terminal, run `npm ci`.
4. Run `npm start` (or execute the `start` script from WebStorm's npm window).
5. Open **http://localhost:4200**.

```bash
git clone https://github.com/V8Z5/oop-sample.git
cd oop-sample
npm ci
npm start
```

## Features

- Angular Material toolbar with the required **Science-Focused Universities** title.
- Responsive Material cards with university name, country, country code, every available domain, domain logo, every safe website URL, and optional state/province.
- University records come from **HttpClient**, without bundled or invented university data.
- Domain logos use Google's domain favicon service; unavailable images have a local, clearly labelled generic fallback. Hipo Labs itself does not provide logos.
- English by default; the **EN / ES** selector immediately translates the interface, card actions, accessible labels, and both footer lines.
- English footer: **Copyright © 2024 EduGlobal Tech LLC. All rights reserved.** followed by **Developed by** and the author's full name and student code.
- Loading, empty-result, error, timeout, and retry states.
- Semantic landmarks, keyboard skip link, visible focus, meaningful image alternatives, ARIA labels and live announcements, and safe external links.
- No sidebar or client-side routing.

## Architecture

| Domain / layer | Responsibility |
| --- | --- |
| `public/domain` | Supported language type |
| `public/application` | Reactive translation service and author configuration |
| `public/presentation` | Material toolbar and translated footer |
| `universities/domain` | Immutable university entity and abstract repository port |
| `universities/application` | Search use case, loading state, filtering, alphabetical ordering, and statistics |
| `universities/infrastructure` | External response contract, defensive mapper, and HttpClient repository adapter |
| `universities/presentation` | Reusable cards and responsive directory view |

The dependency-injection configuration connects the abstract repository to its HTTP adapter. The application layer depends on the port, keeping HTTP details out of components. The mapper isolates external snake_case fields and validates links. RxJS `switchMap` cancels stale requests; Angular signals and OnPush change detection update the UI efficiently. Every authored source file includes `@summary` and `@author` comments.

## API connection

The frontend requests `/api/universities/search?name=ciencias`. The Angular development proxy forwards it to the **exact HTTP endpoint requested in the assignment**. This avoids browser CORS and HTTPS mixed-content problems without changing the data provider or disabling browser security.

Run via `npm start`, not by opening `index.html` directly. The external Hipo Labs service and domain-logo provider require network access. If the university service fails, the application shows an error and retry action; it never silently substitutes sample data.

## Build and production execution

```bash
npm run build
npm run serve:production
```

Production output is in `dist/university-finder/browser`. The included Node server serves the built application at **http://localhost:4300** and forwards the single allowed university endpoint. `PORT` may override the port. A static-only deployment must configure an equivalent server-side proxy.

## Browser checks

```bash
npx playwright install chromium
npm test
```

Automated checks use explicitly isolated API fixtures to verify edge cases reproducibly. They do not replace the real API in the application. The live upstream request is also checked separately during development.

## Rubric mapping

| Criterion | Implementation |
| --- | --- |
| C01 — Build and execution | Angular CLI configuration, lockfile, documented commands, production server |
| C02 — UI | Material toolbar/cards/buttons, responsive grid, complete footer |
| C03 — Features | Exact upstream API, all requested fields, domain logos, runtime i18n |
| C04 — Organization | `public` and `universities` domains separated into layers |
| C05 — Quality | TypeScript strict mode, repository/adapter/mapper patterns, error handling, source documentation |
| C06 — Naming | English identifiers, PascalCase types, camelCase members, kebab-case files and selectors |

## References

- [Angular version compatibility](https://angular.dev/reference/versions)
- [Angular HttpClient setup](https://angular.dev/guide/http/setup)
- [Angular Material cards](https://material.angular.dev/components/card/overview)
- [Hipo Labs university API](https://github.com/Hipo/university-domains-list)
