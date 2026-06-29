<!--
  Delete this comment after adapting the template:

  - <PROJECT_NAME> -> The project name
  - <PROJECT_DESCRIPTION> -> Short project description
  - <PROJECT_BULLETS> -> Main project features as bullet points
-->

# <PROJECT_NAME>

## METADATA

NAME: <PROJECT_NAME>
TYPE: React Component <PROJECT_NAME>
PRIMARY_LANGUAGE: TypeScript
TARGET_FRAMEWORK: React 19+
DEFAULT_BRANCH: main
PACKAGE_MANAGER: pnpm

## PROJECT PURPOSE

<PROJECT_NAME> <PROJECT_DESCRIPTION>:

<PROJECT_BULLETS>

## CRITICAL FACTS FOR AGENTS

### Immutable Rules

1. **Named exports only**: Do not create default exports.
2. **Dedicated folders**: Components, pages, providers, hooks, services, and
   utilities live in their own folders.
3. **Types are separate**: Props, exported contracts, state, actions, and context
   values live in `*.types.ts`.
4. **Constants are separate**: Reusable constants live in `*.consts.ts`.
5. **Tests are co-located**: Use `.test.tsx` for React units and `.test.ts` for
   non-React units.
6. **Styles are separate**: UI styles live in `.styles.css` files and use CSS
   variables.
7. **Barrels are required**: Public folders expose dependencies through
   `index.ts` barrel files.
8. **ES modules only**: Use `import`/`export`, never CommonJS `require()`.

### Do Not

- Put props or exported object shapes inline in implementation files.
- Put reusable constants in implementation files.
- Create loose hook or service files directly under `src/hooks/` or
  `src/services/`.
- Mix CSS with component implementation or use inline styles.
- Ignore lint, tests, or TypeScript strictness.

## PROJECT STRUCTURE

```
<PROJECT_NAME>/
├── src/
│   ├── App.tsx                  [FILE] Application shell and app providers
│   ├── main.tsx                 [FILE] Vite/React DOM entry point
│   ├── components/              [DIR] Reusable UI components + index.ts
│   ├── css/                     [DIR] Global styles and CSS variables
│   ├── hooks/                   [DIR] Custom hooks + index.ts
│   ├── pages/                   [DIR] Route-level pages
│   ├── providers/               [DIR] React context providers + index.ts
│   ├── routes/                  [DIR] Route registry and route rendering
│   ├── services/                [DIR] External/storage/service logic + index.ts
│   ├── templates/               [DIR] Pre-built layouts
│   └── utils/                   [DIR] Shared utility functions + index.ts
├── package.json                 [FILE] Scripts and dependencies
├── vite.config.ts               [FILE] Vite and Vitest configuration
├── vitest.setup.ts              [FILE] Test environment setup
├── eslint.config.js             [FILE] Lint rules
├── tsconfig.json                [FILE] TypeScript configuration
└── README.md                    [FILE] User-facing documentation
```

## APPLICATION ENTRY POINTS

### `src/main.tsx`

Responsibilities:

- Import `StrictMode`, `createRoot`, `App`, and `./css/index.css`.
- Mount `<App />` into the DOM element with id `root`.
- Keep global CSS imports here.

Rules:

- Do not add routes, feature state, or providers here.
- Keep `StrictMode` enabled unless the project explicitly decides otherwise.

### `src/App.tsx`

Responsibilities:

- Render `BrowserRouter`.
- Render `AppRouter`.
- Add app-wide providers only when they must wrap every route.

Rules:

- Do not define individual `<Route />` entries in `App.tsx`.
- Keep `App` as a named export.

## ROUTING STRUCTURE

All route configuration lives in `src/routes/`.

```
src/routes/
├── AppRouter.tsx                [REQUIRED] React Router route declarations
├── AppRouter.routes.ts          [REQUIRED] Central route constants
└── AppRouter.types.ts           [REQUIRED] Route config types
```

Rules:

- Add route constants to `ROUTES` before wiring routes in `AppRouter.tsx`.
- Use `ROUTES.*.ROUTE` in every `<Route path={...} />`.
- Do not hard-code route strings in `<Route />`.
- Keep route constants free of React components and rendering logic.
- Keep route types in `AppRouter.types.ts`.

When adding a route-backed page:

1. Create `src/pages/PageName/` using the page/module pattern.
2. Add route metadata in `src/routes/AppRouter.routes.ts`.
3. Import the page in `src/routes/AppRouter.tsx`.
4. Add a `<Route />` using `ROUTES.PAGE_NAME.ROUTE`.
5. Add page or routing tests when there is user-facing logic.

## SHARED MODULE STRUCTURE

Use this pattern for components, pages, providers, hooks, services, and utilities.
Create optional files only when their responsibility exists.

```
ModuleName/
├── ModuleName.tsx|ts            [REQUIRED] Implementation
├── ModuleName.types.ts          [REQUIRED FOR PROPS/EXPORTED CONTRACTS]
├── ModuleName.consts.ts         [REQUIRED WHEN LOCAL CONSTANTS EXIST]
├── ModuleName.styles.css        [REQUIRED FOR STYLED UI]
├── ModuleName.test.tsx|test.ts  [REQUIRED] Co-located tests
└── ModuleName.utils.ts          [OPTIONAL] Module-local helpers
```

Rules:

- Implementation files should focus on rendering, state, effects, and behavior.
- Props for components and pages must live in `*.types.ts`.
- Provider state, actions, props, and context values must live in `*.types.ts`.
- Service contracts must live in `*.types.ts`.
- Reusable constants must live in `*.consts.ts`.
- Public exports must be re-exported from the nearest `index.ts` barrel.

## MODULE-SPECIFIC PATTERNS

### Components

```
src/components/
├── index.ts
└── ComponentName/
    ├── ComponentName.tsx
    ├── ComponentName.types.ts
    ├── ComponentName.consts.ts
    ├── ComponentName.styles.css
    └── ComponentName.test.tsx
```

Use PascalCase folders/files and `export const ComponentName`.

### Pages

```
src/pages/
└── PageName/
    ├── PageName.tsx
    ├── PageName.types.ts
    ├── PageName.consts.ts
    ├── PageName.styles.css
    └── PageName.test.tsx
```

Pages compose route UI. Move reusable UI to `components/`, shared logic to
`hooks/`, external persistence to `services/`, and pure helpers to `utils/`.

### Hooks

```
src/hooks/
├── index.ts
└── useHookName/
    ├── useHookName.ts
    ├── useHookName.test.tsx
    ├── useHookName.types.ts
    └── useHookName.consts.ts
```

Hook folders and files use camelCase and match the hook function name. Export
public hooks from `src/hooks/index.ts`.

### Providers

```
src/providers/
├── index.ts
└── ProviderName/
    ├── ProviderName.tsx
    ├── ProviderName.types.ts
    ├── ProviderName.consts.ts
    ├── ProviderName.context.ts
    ├── ProviderName.reducer.ts
    └── ProviderName.test.tsx
```

Use `ProviderName.context.ts` for React context creation and
`ProviderName.reducer.ts` for non-trivial state transitions. Export public
providers from `src/providers/index.ts`.

### Services

```
src/services/
├── index.ts
└── serviceName/
    ├── serviceName.ts
    ├── serviceName.types.ts
    ├── serviceName.consts.ts
    └── serviceName.test.ts
```

Services use camelCase folders/files. Keep browser APIs, storage, network, or
integration logic out of components/pages when it can live in a service.

### Utils

```
src/utils/
├── index.ts
└── utilityName/
    ├── utilityName.ts
    ├── utilityName.types.ts
    └── utilityName.test.ts
```

Utilities should be pure when practical and exported from `src/utils/index.ts`
when shared.

## CODE STYLE REQUIREMENTS

### TypeScript

```typescript
// FILE: ComponentName.types.ts
export type ComponentColor = "primary" | "success" | "error";

export type ComponentProps = {
  label: string;
  color?: ComponentColor;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};
```

```typescript
// FILE: ComponentName.consts.ts
import type { ComponentColor } from "./ComponentName.types";

export const DEFAULT_COLOR: ComponentColor = "primary";
```

```typescript
// FILE: ComponentName.tsx
import { DEFAULT_COLOR } from "./ComponentName.consts";
import "./ComponentName.styles.css";
import type { ComponentProps } from "./ComponentName.types";

export const ComponentName = ({
  label,
  color = DEFAULT_COLOR,
  disabled = false,
  onClick,
}: ComponentProps) => {
  return (
    <button className="component-name" disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};
```

### Import Order

1. React and external dependencies
2. Internal components, hooks, providers, services, and utilities
3. Constants
4. CSS files
5. Type-only imports
6. Module-local utilities

### Naming Rules

| ITEM_TYPE         | PATTERN          | EXAMPLES                     |
| ----------------- | ---------------- | ---------------------------- |
| Components/pages  | PascalCase       | Button, MainPage             |
| Hooks             | camelCase        | useWhiteboard                |
| Services/utils    | camelCase        | dashboardStorage, grid       |
| Functions/vars    | camelCase        | handleClick, isLoading       |
| Constants         | UPPER_SNAKE_CASE | MAX_WIDTH, DEFAULT_COLOR     |
| CSS classes       | kebab-case       | button-primary, modal-header |
| Types             | PascalCase       | ButtonProps, GridConfig      |

### Formatting

| RULE            | VALUE             |
| --------------- | ----------------- |
| Indentation     | 2 spaces          |
| Semicolons      | Always            |
| Quotes          | Double quotes     |
| Trailing commas | Multi-line only   |
| Line length     | 80-100 preferred  |

### CSS

- Use CSS variables from `src/css/index.css`.
- Keep styles in `.styles.css`.
- Use kebab-case class names.
- Avoid inline styles except for dynamic geometry that cannot be expressed
  cleanly with classes or CSS variables.

## COMMAND REFERENCE

### Development

| COMMAND        | PURPOSE                  | BLOCKING |
| -------------- | ------------------------ | -------- |
| `pnpm install` | Install dependencies     | YES      |
| `pnpm dev`     | Start Vite dev server    | NO       |
| `pnpm preview` | Preview production build | NO       |

### Build And Quality

| COMMAND      | PURPOSE                 | SHOULD_PASS |
| ------------ | ----------------------- | ----------- |
| `pnpm lint`  | Check code style        | YES         |
| `pnpm build` | Typecheck and build app | YES         |

### Testing

| COMMAND                                  | PURPOSE                    | WATCH_MODE |
| ---------------------------------------- | -------------------------- | ---------- |
| `pnpm test`                              | Run all tests once         | NO         |
| `pnpm test:unit`                         | Run unit tests once        | NO         |
| `pnpm test:watch`                        | Run tests in watch mode    | YES        |
| `pnpm test:coverage`                     | Run tests with coverage    | NO         |
| `pnpm test -- path/to/file.test.tsx`     | Run one React test file    | NO         |
| `pnpm test -- path/to/file.test.ts`      | Run one non-React test     | NO         |
| `pnpm test -- -t "pattern"`              | Run tests matching name    | NO         |
| `pnpm test -- --reporter=verbose`        | Run with verbose output    | NO         |

## TESTING REQUIREMENTS

- Use Vitest for all test files.
- Use React Testing Library and `user-event` for React interactions.
- Cover rendering, props, interactions, edge cases, and reducer/service logic.
- Target 70%+ line coverage for each component, page, hook, provider, service,
  or utility.
- Prefer semantic queries such as `getByRole`, `getByLabelText`, and visible
  text queries.

## AGENT TASK CHECKLIST

### Before Implementation

- [ ] Read requirements and nearby patterns.
- [ ] Identify props/types for `*.types.ts`.
- [ ] Identify constants for `*.consts.ts`.
- [ ] Identify styles, tests, and barrel exports needed.

### During Implementation

- [ ] Create or update the dedicated module folder.
- [ ] Keep implementation, types, constants, styles, tests, and helpers separate.
- [ ] Use named exports only.
- [ ] Update the nearest `index.ts` barrel for public modules.
- [ ] Keep route wiring in `src/routes/`.

### Validation

- [ ] Run `pnpm lint`.
- [ ] Run `pnpm test:unit`.
- [ ] Run `pnpm build` for broader validation.
- [ ] Run `pnpm test:coverage` when coverage matters.

## ERROR HANDLING

| ERROR | SOLUTION |
| ----- | -------- |
| ESLint violations | Run `pnpm lint` and fix reported issues |
| Missing types | Create/update the matching `*.types.ts` |
| Constants in implementation | Move them to `*.consts.ts` |
| Missing public export | Update the nearest `index.ts` barrel |
| Route string duplicated | Use `ROUTES.*.ROUTE` |
| Tests failing | Update implementation or tests to match expected behavior |
| Build fails | Run lint and tests, then resolve TypeScript or bundling errors |

## DEPENDENCIES

Runtime:

```
React 19+
ReactDOM 19+
React Router
```

Development:

```
TypeScript 5+
Vite 7+
Vitest 4+
React Testing Library
@testing-library/jest-dom
@testing-library/user-event
ESLint
```
