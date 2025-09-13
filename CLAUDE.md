# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production (requires valid env vars or use `SKIP_ENV_VALIDATION=true npm run build`)
- `npm run typecheck` - Run TypeScript compiler without emitting files
- `npm run lint` - Run ESLint, `npm run lint:fix` to auto-fix issues

### Testing
- `npm test` - Run Jest unit tests
- `npm run test:watch` - Run tests in watch mode during development
- `npm run e2e` - Run Playwright end-to-end tests
- `npm run e2e:ui` - Run e2e tests with Playwright UI for debugging

### Database Operations
- `npm run db:push` - Push schema changes to database (for development)
- `npm run db:generate` - Generate migration files from schema changes
- `npm run db:migrate` - Run pending migrations
- `npm run db:studio` - Open Drizzle Studio for database inspection

### Docker
- `npm run docker:dev` - Start development environment with Docker Compose
- `npm run docker:prod` - Start production environment with Docker Compose

## Architecture Overview

### Project Structure Philosophy
This is a **src-folder Next.js 15 application** using App Router with the following key architectural decisions:

- **Source code in `src/`**: All application code lives in `src/` directory, following modern Next.js conventions
- **Multi-stage Docker setup**: Production-ready containerization with development and production configs
- **Type-safe environment management**: T3-env validates all environment variables at build time
- **Internationalization-first**: Built with i18n as a core feature, not an afterthought

### Core Architecture Components

#### 1. Internationalization Layer
- **Routing**: All routes are prefixed with locale (`/en`, `/pl`) via `middleware.ts`
- **Locale detection**: Automatic detection and redirect handled by next-intl middleware
- **Navigation**: Use `Link`, `redirect`, `useRouter` from `@/i18n/navigation` (NOT Next.js defaults)
- **Translations**: Centralized in `messages/[locale].json` files at project root
- **Key files**: `src/i18n/routing.ts` defines supported locales and pathnames

#### 2. Authentication System
- **NextAuth.js v5** with Drizzle adapter for database sessions
- **Provider**: GitHub OAuth (extensible to other providers)
- **Database integration**: User sessions stored in PostgreSQL via Drizzle ORM
- **Route protection**: Use `auth()` function from `@/lib/auth` in server components
- **Key files**: `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`

#### 3. Database Architecture
- **ORM**: Drizzle with PostgreSQL via postgres.js driver
- **Schema**: Complete auth tables (users, accounts, sessions) + business tables in `src/lib/schema.ts`
- **Type safety**: Full TypeScript integration with inferred types from schema
- **Migrations**: File-based migrations in `drizzle/` directory
- **Key files**: `src/lib/schema.ts` (table definitions), `src/lib/db.ts` (database connection), `drizzle.config.ts`

#### 4. Payment Processing
- **Stripe integration** with server actions for checkout flow
- **Architecture**: Server actions in `src/actions/create-checkout-session.ts` handle payment logic
- **Components**: Reusable Stripe checkout components (`src/components/stripe-button.tsx`)
- **Webhooks**: Handle Stripe events via `src/app/api/stripe/webhook/route.ts`

#### 5. UI Component System
- **shadcn/ui components** in `src/components/ui/` - DO NOT modify these directly
- **Custom components** organized by feature in `src/components/`
- **Theme system**: Dark/light mode with next-themes, theme switcher available
- **Styling**: Tailwind CSS v4 with OKLCH colors and animations

### Environment Variables Architecture

The application uses **T3-env** for type-safe environment validation:

- **Definition**: `src/env.mjs` defines and validates all environment variables
- **Types**: Server vs client variables are strictly separated
- **Validation**: Zod schemas ensure type safety at build time
- **Usage**: Import `env` from `@/env.mjs`, never use `process.env` directly
- **Build**: Use `SKIP_ENV_VALIDATION=true` for CI builds without real env vars

### Server Actions Pattern

Server actions are the primary way to handle server-side logic:
- **Location**: `src/actions/` directory organized by feature
- **Usage**: Import and call directly in client components
- **Error handling**: Use `try/catch` and return error objects, not throw exceptions
- **Validation**: All inputs validated with Zod schemas

### Testing Strategy

#### Unit Tests (`src/__tests__/unit/`)
- **Framework**: Jest with React Testing Library
- **Pattern**: Test files mirror component structure
- **Mocking**: Pre-configured mocks for next-auth, next/navigation, and next-intl in `jest.setup.js`

#### E2E Tests (`src/__tests__/e2e/`)
- **Framework**: Playwright with multi-browser support
- **Pattern**: Feature-based test files (e.g., `home.spec.ts`)
- **Environment**: Tests run against development server

### Key Development Patterns

#### Component Organization
```
src/components/
├── ui/              # shadcn/ui components (don't modify)
├── auth-controls.tsx    # Authentication-related components
├── theme-switcher.tsx   # Theme switching functionality
├── lang-switcher.tsx    # Language switching for i18n
├── stripe-button.tsx    # Stripe payment components
└── icons.tsx        # Icon definitions
```

#### Route Organization
```
src/app/
├── [locale]/           # Internationalized routes
│   ├── page.tsx       # Home page
│   └── layout.tsx     # Locale-specific layout
├── api/               # API routes (non-internationalized)
│   ├── auth/          # NextAuth endpoints
│   └── stripe/        # Stripe webhook handlers
├── robots.ts          # SEO robots.txt
└── sitemap.ts         # SEO sitemap
```

#### Import Patterns
- **Absolute imports**: Use `@/` prefix for all internal imports
- **UI components**: Import from `@/components/ui/[component]`
- **Navigation**: Always use `@/i18n/navigation` components, never Next.js defaults
- **Environment**: Import `env` from `@/env.mjs`, never use `process.env`
- **Database**: Import `db` from `@/lib/db`, schema types from `@/lib/schema`

### Critical Configuration Files

- `next.config.ts`: Includes i18n middleware, GitHub avatars in image config
- `middleware.ts`: Handles locale detection and routing - minimal and focused
- `postcss.config.mjs`: Tailwind v4 PostCSS plugin configuration
- `drizzle.config.ts`: Points to src-based schema and uses T3-env for DATABASE_URL
- `src/env.mjs`: Single source of truth for all environment variables

### Development Workflow Notes

- **Build process**: Always validate that builds work with `SKIP_ENV_VALIDATION=true npm run build`
- **Database changes**: Use Drizzle Kit commands for schema management
- **New components**: Use `npx shadcn@latest add [component]` to add new UI components
- **New locales**: Add to `src/i18n/routing.ts` locales array and create corresponding message file
- **Testing**: Run both unit tests and e2e tests - pre-commit hooks ensure code quality