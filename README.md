# PhotoPortfolio

A React photography portfolio with a photo gallery, filtering, and photo details with location maps. Built with React, TypeScript/JavaScript, Tailwind CSS, and Create React App (`react-scripts`).

## Requirements

- Node.js **24.21.0**, pinned in `.nvmrc`.
- npm (included with Node.js).
- Access to the hosted photo API described below.

## First-time setup

Run these commands from the project root. If you use NVM, install the pinned version if needed, then activate it:

```powershell
nvm install 24.21.0
nvm use 24.21.0
node --version
npm --version
npm ci
```

Use `npm ci` to install the dependencies recorded in `package-lock.json`. Commit intentional dependency changes together with the updated lockfile.

Start the development server:

```powershell
npm run dev
```

Open http://localhost:3000. The page reloads when source files change. Stop the server with Ctrl+C.

The development command is `npm run dev`; this project does not define `npm start`.

## Environment configuration

For optional local configuration, copy `.env.example` to `.env.local` in the project root and edit the values. To enable Google Maps in photo details, supply your Maps key:

```dotenv
REACT_APP_GOOGLE_MAP_API_KEY=your_google_maps_api_key
```

Restart the development server after changing this file. `.env.local` is ignored by Git. Without a valid key, location maps will not work.

Frontend environment values are included in the browser bundle. Use a browser Maps key restricted to the intended sites; do not put server secrets in these variables.

## Photo backend

Photo metadata and images share the base URL defined in `src/config.ts`. It defaults to `https://photosapi.shicks255.com`. The gallery requires the backend to be reachable and permit requests from the frontend's origin, including localhost during development.

You do not need to run a local PhotoService when using the hosted API. To use a local backend, start PhotoService and set this value in `.env.local`, then restart the development server:

```dotenv
REACT_APP_API_BASE_URL=http://localhost:8585
```

Use the backend base URL without the `/image` endpoint. Trailing slashes are removed automatically; a blank or unset value uses the hosted API. Although `package.json` declares a proxy at `http://localhost:8585`, absolute API URLs bypass it.

## Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create the production bundle in `build/`. |
| `npm run lint` | Run the configured ESLint command. |
| `npm run lint:fix` | Run ESLint with automatic fixes. |
| `npm run lint:style` | Check CSS with Stylelint. |
| `npm run format:check` | Check formatting without changing files. |
| `npm run format` | Apply Prettier formatting to supported project files. |

EditorConfig and Prettier use two-space indentation and LF line endings. Git normalizes text files to LF, with CRLF reserved for Windows batch scripts. Formatting excludes generated output, dependencies, local environment files, IDE settings, and the lockfile. Existing files may need formatting; `format:check` reports these without modifying them.

Run `npm test` to start the Create React App test runner in watch mode, or `npm run test:ci` for a single run with coverage. Both use the Jest runner included with `react-scripts`; CRACO is not required. The existing test is a basic render smoke test.

## Production build and deployment

```powershell
npm run build
```

The generated static files are written to `build/`. Supply production environment values before building; changing environment variables after deployment does not change an existing bundle.

Deploy the contents of `build/` to the static hosting location used for the site. Configure the host to serve `index.html` for frontend routes and ensure the photo API accepts the deployed site's origin. This repository does not currently define an automated deployment workflow.

The legacy `copy`, `copyFiles`, and `copyStatic` scripts target `C:\IdeaProjects\PhotoService\src\main\resources\static\`. They require cleanup before use on another PC: the destination is machine-specific, and the scripts call `copyfiles` while the declared dependency is `copy-files`.

## Windows troubleshooting

- If `node --version` reports no active version, run `nvm use 24.21.0` and reopen the terminal if needed.
- If PowerShell blocks `npm.ps1`, use `npm.cmd` for the commands above (for example, `npm.cmd ci`).
- If NVM reports `NVM4306` after a trusted Node/npm installation or update, its suggested repair is `nvm reshim`. If the file change was unexpected, reinstall Node from a trusted source instead of accepting the changed file.
