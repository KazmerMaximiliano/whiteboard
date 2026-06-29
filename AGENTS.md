# WHITEBOARD

## METADATA

NAME: White Board
TYPE: React Component White Board
PRIMARY_LANGUAGE: TypeScript
TARGET_FRAMEWORK: React 19+
DEFAULT_BRANCH: main
PACKAGE_MANAGER: pnpm

## PROJECT PURPOSE

White Board is a dynamic React dashboard builder that provides:

- Responsive 12-column drag-and-drop grid system
- Interactive component resizing and dynamic reordering
- TypeScript support with full type safety
- React hooks for layout state and grid management
- Pre-built widget templates for custom dashboards

## CRITICAL FACTS FOR AGENTS

### Immutable Project Rules

1. **Code Style MUST be enforced**: All code must follow the Code Style Guidelines section
2. **File Structure MUST match pattern**: Each component follows ComponentName/ directory structure
3. **Export Strategy MUST be named exports**: All components use `export const` pattern
4. **Props MUST be in separate .types.ts**: Type definitions separated from implementation
5. **Tests MUST be co-located**: .test.tsx files in same directory as component
6. **Styles MUST use CSS files**: Separate .styles.css files with CSS variables
7. **No default exports**: Only use named exports throughout the project

### Restricted Operations

DO NOT perform these operations:

- Create default exports for components
- Mix styles with component implementation
- Put type definitions in component files
- Use inline styles instead of CSS variables
- Create components without corresponding tests
- Use CommonJS require() instead of ES6 imports
- Ignore ESLint configuration

### Allowed Operations

PERMITTED operations:

- Create new components following the file structure
- Modify existing components if they follow conventions
- Write tests for new and modified components
- Update documentation
- Refactor code while maintaining structure
- Update CSS variables
- Modify utility functions

## PROJECT STRUCTURE

```
whiteboard/
├── src/
│   ├── App.tsx                  [FILE] Application shell and router provider
│   ├── main.tsx                 [FILE] Vite/React DOM entry point
│   ├── components/              [DIRECTORY] UI components
│   ├── templates/               [DIRECTORY] Pre-built layouts
│   ├── hooks/                   [DIRECTORY] Custom React hooks
│   ├── providers/               [DIRECTORY] Context providers
│   ├── css/                     [DIRECTORY] Global styles and variables
│   │   └── index.css            [FILE] Global CSS imported once by main.tsx
│   ├── pages/                   [DIRECTORY] Route-level page components
│   ├── routes/                  [DIRECTORY] Route configuration and router
│   │   ├── AppRouter.tsx        [FILE] React Router route declarations
│   │   ├── AppRouter.routes.ts  [FILE] Centralized route constants
│   │   └── AppRouter.types.ts   [FILE] Route configuration type definitions
│   ├── utils/                   [DIRECTORY] Utility functions
│   └── services/                [DIRECTORY] Auxiliary services
├── package.json                 [FILE] Dependencies and scripts
├── vite.config.ts               [FILE] Build and test configuration
├── vitest.setup.ts              [FILE] Test environment setup
├── eslint.config.js             [FILE] Code linting rules
├── tsconfig.json                [FILE] TypeScript configuration
└── README.md                    [FILE] User-facing documentation
```

## APPLICATION ENTRY POINTS

The app has two entry layers. Agents MUST preserve this separation.

### `src/main.tsx`

Responsibilities:

- Import React `StrictMode`
- Import `createRoot` from `react-dom/client`
- Import the root `App` component
- Import global styles from `./css/index.css`
- Mount `<App />` into the DOM element with id `root`

Current flow:

```typescript
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Rules:

- Keep global CSS imports in `main.tsx`, not inside route/page components
- Do not add page routing directly in `main.tsx`
- Do not add feature state, providers, or app logic directly in `main.tsx`
- Keep `StrictMode` enabled unless there is an explicit project decision

### `src/App.tsx`

Responsibilities:

- Import `BrowserRouter` from `react-router-dom`
- Import `AppRouter` from `./routes/AppRouter`
- Render the routing provider around the route declarations

Current flow:

```typescript
export const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
```

Rules:

- Keep `BrowserRouter` at the application shell level
- Add app-wide providers here when they must wrap every route
- Do not define individual `<Route />` entries in `App.tsx`
- Keep `App` as a named export

## ROUTING STRUCTURE

All route configuration lives in `src/routes/`. Agents MUST update all related
route files when adding or changing a route.

```
src/routes/
├── AppRouter.tsx
├── AppRouter.routes.ts
└── AppRouter.types.ts
```

### `src/routes/AppRouter.tsx`

Purpose:

- Converts route constants into React Router `<Route />` declarations
- Imports page components from `src/pages`
- Keeps the route tree out of `App.tsx`

Current route:

```typescript
<Routes>
  <Route path={ROUTES.MAIN.ROUTE} element={<MainPage />} />
</Routes>
```

Rules:

- Import `Route` and `Routes` from `react-router-dom`
- Import pages with explicit file paths, for example
  `../pages/MainPage/MainPage`
- Use `ROUTES.*.ROUTE` for every `path`
- Do not hard-code route strings in `<Route path="..." />`
- Keep `AppRouter` as a named export returning `React.ReactElement`

### `src/routes/AppRouter.routes.ts`

Purpose:

- Defines the canonical route registry for the application
- Stores stable route keys and URL paths in one place
- Uses TypeScript `satisfies` to validate route object shape

Current registry:

```typescript
export const ROUTES = {
  MAIN: {
    KEY: "main",
    ROUTE: "/",
  },
} satisfies AppRouterRoutesType;
```

Rules:

- Add new route entries to `ROUTES` before wiring them in `AppRouter.tsx`
- Use UPPER_SNAKE_CASE keys for top-level route constants
- Use lowercase stable strings for each route `KEY`
- Use absolute paths starting with `/` for each route `ROUTE`
- Keep route constants free of React components or rendering logic

### `src/routes/AppRouter.types.ts`

Purpose:

- Defines the route configuration contract shared by route constants

Current types:

```typescript
export type RouteType = {
  KEY: string;
  ROUTE: string;
};

export type AppRouterRoutesType = Record<string, RouteType>;
```

Rules:

- Keep route types in this file instead of inline in route constants
- Extend `RouteType` here if routes need metadata such as labels or auth flags
- Keep route type exports named

## PAGE STRUCTURE

Route-level pages live in `src/pages/`. A page is responsible for composing
components for a route, not for defining routing infrastructure.

Current page:

```
src/pages/MainPage/
└── MainPage.tsx
```

Rules:

- Use PascalCase directory names for pages
- Use named exports for page components
- Keep page route wiring in `src/routes/AppRouter.tsx`
- Move reusable UI out of pages and into `src/components/` when shared
- Add page-local `.types.ts`, `.styles.css`, and `.test.tsx` files when a page
  gains props, styling, or behavior that requires coverage

### Adding A New Route

When adding a route-backed page:

1. Create `src/pages/PageName/PageName.tsx` with a named export
2. Add route metadata in `src/routes/AppRouter.routes.ts`
3. Import the page in `src/routes/AppRouter.tsx`
4. Add a `<Route />` using `ROUTES.PAGE_NAME.ROUTE`
5. Add tests for the page or routed behavior when the route has user-facing logic
6. Keep `main.tsx` and `App.tsx` unchanged unless a global provider is required

## COMPONENT FILE STRUCTURE

Every component MUST follow this pattern:

```
ComponentName/
├── ComponentName.tsx            [REQUIRED] Component implementation
├── ComponentName.types.ts       [REQUIRED] Type definitions
├── ComponentName.styles.css     [REQUIRED] Component styles
├── ComponentName.test.tsx       [REQUIRED] Unit tests
├── ComponentName.utils.ts       [OPTIONAL] Utility functions
```

## COMMAND REFERENCE

### Development Commands

| COMMAND        | PURPOSE                  | BLOCKING |
| -------------- | ------------------------ | -------- |
| `pnpm install` | Install all dependencies | YES      |
| `pnpm dev`     | Start Vite dev server    | NO       |
| `pnpm preview` | Preview production build | NO       |

### Build Commands

| COMMAND            | OUTPUT                          | TIME  |
| ------------------ | ------------------------------- | ----- |
| `pnpm build`       | dist/ folder with compiled code | 5-10s |
| `pnpm build:types` | TypeScript declaration files    | 3-5s  |

### Testing Commands

| COMMAND              | SCOPE           | MODE                  | OUTPUT                      |
| -------------------- | --------------- | --------------------- | --------------------------- |
| `pnpm test`          | All tests       | Single run            | Pass/fail                   |
| `pnpm test:unit`     | Unit tests only | Single run            | Pass/fail                   |
| `pnpm test:watch`    | All tests       | Watch mode            | Pass/fail + rerun on change |
| `pnpm test:coverage` | All tests       | Single run + coverage | coverage/ directory         |

### Quality Commands

| COMMAND      | PURPOSE          | SHOULD_PASS |
| ------------ | ---------------- | ----------- |
| `pnpm lint`  | Check code style | YES         |
| `pnpm test`  | Run all tests    | YES         |
| `pnpm build` | Build library    | YES         |

## CODE STYLE REQUIREMENTS

### TypeScript Conventions

#### Type Definitions MUST follow pattern

```typescript
// FILE: ComponentName.types.ts
type ComponentType = "type1" | "type2";
export type ComponentColor = "primary" | "success" | "error";

export type ComponentProps = {
  label: string;
  type?: ComponentType;
  color?: ComponentColor;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
};
```

#### Component Implementation MUST follow pattern

```typescript
// FILE: ComponentName.tsx
import { useColors } from "../theme";
import "./ComponentName.styles.css";
import { ComponentProps } from "./ComponentName.types";
import { utilFunction } from "./ComponentName.utils";

export const ComponentName = ({
  label,
  type = "default",
  color = "primary",
  disabled = false,
  onClick,
}: ComponentProps) => {
  const colors = useColors();

  return (
    <element className="component-name">
      {label}
    </element>
  );
};
```

### Import Order MUST be

1. React and external dependencies
2. Internal components and hooks
3. CSS files
4. Type definitions
5. Utility functions

CORRECT ORDER EXAMPLE:

```typescript
import React, { useState } from "react";
import { FiIcon } from "react-icons/fi";
import { Button } from "../Button/Button";
import { useColors } from "../theme";
import "./Input.styles.css";
import { InputProps } from "./Input.types";
import { validateInput } from "./Input.utils";
```

### Naming Rules

| ITEM_TYPE         | PATTERN          | EXAMPLES                     |
| ----------------- | ---------------- | ---------------------------- |
| Component files   | PascalCase       | Button.tsx, Modal.tsx        |
| Component exports | PascalCase       | Button, Modal                |
| Functions         | camelCase        | handleClick, getData         |
| Variables         | camelCase        | isLoading, errorMessage      |
| Constants         | UPPER_SNAKE_CASE | MAX_WIDTH, DEFAULT_COLOR     |
| CSS classes       | kebab-case       | button-primary, modal-header |
| Type names        | PascalCase       | ButtonProps, ComponentColor  |

### Code Formatting Rules

| RULE            | VALUE             | ENFORCEABLE        |
| --------------- | ----------------- | ------------------ |
| Indentation     | 2 spaces          | YES (ESLint)       |
| Line length     | 80-100 characters | NO (informational) |
| Semicolons      | Always required   | YES (ESLint)       |
| Quotes          | Double quotes     | YES (ESLint)       |
| Trailing commas | Multi-line only   | YES (ESLint)       |

### CSS Rules

MUST use CSS variables from theme system:

```css
.component-name {
  background-color: var(--color-primary);
  border: 1px solid var(--color-border-light);
  color: var(--color-white);
  padding: 8px 16px;
}

.component-name:hover {
  background-color: var(--color-primary-light);
}

.component-name.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## TESTING REQUIREMENTS

### Test File Pattern

TEST_FILE MUST:

- Be located in same directory as component
- Use .test.tsx extension
- Export from vitest framework
- Cover rendering, interactions, and edge cases

### Test Structure Template

```typescript
// FILE: ComponentName.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ComponentName } from "./ComponentName";

describe("ComponentName", () => {
  describe("rendering", () => {
    it("should render with label", () => {
      render(<ComponentName label="Test" />);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("should call onClick handler", async () => {
      const handleClick = vi.fn();
      render(<ComponentName onClick={handleClick} />);
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("should handle disabled state", () => {
      render(<ComponentName disabled />);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });
});
```

### Test Coverage Targets

| SCOPE         | TARGET      | REQUIREMENT                     |
| ------------- | ----------- | ------------------------------- |
| Rendering     | 100%        | Must test all output paths      |
| Interactions  | 100%        | Must test all event handlers    |
| Props         | 100%        | Must test all prop combinations |
| Edge cases    | Required    | disabled, loading, error states |
| Line coverage | 70% minimum | For each component              |

### Test Commands - AI REFERENCE

| INTENT                | COMMAND                              | WATCH_MODE |
| --------------------- | ------------------------------------ | ---------- |
| Quick validation      | `pnpm test:unit`                     | NO         |
| Development iteration | `pnpm test:watch`                    | YES        |
| Coverage check        | `pnpm test:coverage`                 | NO         |
| Single file           | `pnpm test -- path/to/file.test.tsx` | NO         |
| Specific test         | `pnpm test -- --grep="pattern"`      | NO         |
| Verbose output        | `pnpm test -- --reporter=verbose`    | NO         |

## THEMING SYSTEM

### CSS Variables Available

Theme colors with automatic variants:

| VARIABLE_NAME          | GENERATES         | NOTES                                       |
| ---------------------- | ----------------- | ------------------------------------------- |
| `--color-primary`      | main, light, dark | Brand primary                               |
| `--color-success`      | main, light, dark | Success state                               |
| `--color-error`        | main, light, dark | Error state                                 |
| `--color-info`         | main, light, dark | Info state                                  |
| `--color-white`        | base only         | White                                       |
| `--color-black`        | base only         | Black                                       |
| `--color-gray-*`       | base only         | 900, 700, 600, 500, 400, 300, 200, 150, 100 |
| `--color-white-*`      | opacity variants  | 100, 200, 300                               |
| `--color-black-*`      | opacity variants  | 100, 200                                    |
| `--color-border-light` | base only         | Light border                                |
| `--color-shadow`       | base only         | Shadow                                      |

### Color Variant Rules

| VARIANT | RULE           |
| ------- | -------------- |
| main    | Original color |
| light   | 10% opacity    |
| dark    | 15% darker     |

## AGENT TASK CHECKLIST

When agents need to implement new components, use this checklist:

### Pre-implementation

- [ ] Read component requirements
- [ ] Check existing similar components for patterns
- [ ] Plan component props interface
- [ ] Identify required CSS variables

### Implementation

- [ ] Create ComponentName/ directory
- [ ] Create ComponentName.types.ts with props interface
- [ ] Create ComponentName.tsx with export const
- [ ] Create ComponentName.styles.css using CSS variables
- [ ] Create ComponentName.utils.ts if needed
- [ ] Create ComponentName.test.tsx with 100% coverage
- [ ] Run `pnpm lint` - must pass
- [ ] Run `pnpm test:unit` - must pass

### Post-implementation

- [ ] Update src/components/index.ts with export
- [ ] Verify `pnpm build` succeeds
- [ ] Verify `pnpm test:coverage` shows 70%+ coverage
- [ ] Create guides/components/ComponentName.md with props and usage example
- [ ] Update guides/COMPONENTS.md index table with the new component
- [ ] Update AGENTS.md COMPONENT INVENTORY if adding new component
- [ ] Update README.md if component is user-facing

## ERROR HANDLING FOR AGENTS

### Common Errors and Solutions

ERROR: ESLint violations
SOLUTION: Run `pnpm lint` and fix all reported issues
PREVENTIVE: Use provided templates, follow naming conventions

ERROR: Import paths incorrect
SOLUTION: Use relative paths from current file
PATTERN: `../ComponentName/ComponentName` for same level

ERROR: Type definitions missing
SOLUTION: Create or update ComponentName.types.ts
CHECK: All props must be typed, no implicit any

ERROR: Tests failing
SOLUTION: Update test to match implementation
CHECK: Use semantic queries (getByRole, getByLabelText)

ERROR: Component not rendering
SOLUTION: Verify className follows CSS pattern
CHECK: CSS classes use kebab-case, CSS variables exist

ERROR: Build fails
SOLUTION: Run `pnpm lint` and `pnpm test` first
CHECK: All files have correct exports, no circular imports

## DEPENDENCY INFORMATION

### Runtime Dependencies (Production)

```
React 19+
ReactDOM 19+
```

### Development Dependencies (Build/Test)

```
TypeScript 5+
Vite 7+
Vitest 4+
React Testing Library
@testing-library/jest-dom
@testing-library/user-event
ESLint
```

## CRITICAL CONSTRAINTS

### MUST NOT VIOLATE

1. Component file structure pattern
2. Type definition separation
3. Named exports only
4. CSS variable usage
5. Test coverage requirements
6. ESLint rules
7. Import organization

### MUST ALWAYS

1. Create .types.ts file for components
2. Create .styles.css file for components
3. Create .test.tsx file for components
4. Include descriptive JSDoc comments
5. Use TypeScript strict mode
6. Test all interactive features
7. Update documentation

### SHOULD TYPICALLY

1. Create .utils.ts if complex logic needed
2. Add CSS transitions for user feedback
3. Handle disabled/loading/error states
4. Provide meaningful error messages
5. Support keyboard navigation
