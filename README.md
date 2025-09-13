# Next.js Starter Template

<p align="center">
  <img src="/public/opengraph-image.jpg" alt="Next.js Starter Template" />
</p>

<p align="center">
  <strong>A production-ready Next.js starter template with modern tooling</strong>
</p>

<p align="center">
  <a href="#-features"><strong>Features</strong></a> ·
  <a href="#-quick-start"><strong>Quick Start</strong></a> ·
  <a href="#-deployment"><strong>Deployment</strong></a> ·
  <a href="#-development"><strong>Development</strong></a> ·
  <a href="#-docker"><strong>Docker</strong></a>
</p>

---

## 🚀 Features

### **Core Framework**
- 🚀 **Next.js 15** - App Router with Turbopack for lightning-fast dev builds
- ⚛️ **React 19** - Latest React features with Server Components
- 📘 **TypeScript** - Full type safety with strict mode
- 🎨 **Tailwind CSS 4** - Latest Tailwind with OKLCH colors and animations

### **UI & Styling**
- 🛠️ **shadcn/ui** - Beautiful, accessible components built on Radix UI
- 🌑 **Dark/Light Mode** - Theme switching with next-themes
- 🔹 **Lucide Icons** - Beautiful, customizable SVG icons
- 📱 **Responsive Design** - Mobile-first approach

### **Authentication & Database**
- 🔒 **NextAuth.js v5** - Complete authentication solution with GitHub OAuth
- 🗄️ **PostgreSQL + Drizzle ORM** - Type-safe database with migrations
- 🛡️ **Database Sessions** - Secure session management
- 👥 **User Management** - Complete user system with profiles

### **Payments & Business Logic**
- 💳 **Stripe Integration** - Full payment processing with webhooks
- 💰 **Subscription Management** - Handle recurring payments
- 🔄 **Server Actions** - Type-safe server-side logic

### **Internationalization**
- 🌐 **next-intl** - Complete i18n solution with locale routing
- 🗣️ **Multi-language** - English and Polish included (easily extensible)
- 🚏 **Locale Routing** - Automatic locale detection and routing

### **Developer Experience**
- ⚙️ **T3 Environment Variables** - Type-safe environment validation
- 📈 **Absolute Imports** - Clean imports with `@/` prefix
- 💅 **Prettier + ESLint** - Consistent code formatting and linting
- 🐶 **Husky + Lint-staged** - Pre-commit hooks for code quality
- 📝 **Commitlint** - Conventional commit messages

### **Testing & Quality**
- 🧪 **Jest + React Testing Library** - Comprehensive unit testing
- 🎭 **Playwright** - End-to-end testing with multi-browser support
- 🔍 **TypeScript Strict Mode** - Maximum type safety
- ✅ **Pre-commit Validation** - Automated code quality checks

### **Production Ready**
- 🐳 **Docker Support** - Full containerization for development and production
- 📦 **Optimized Builds** - Standalone output for minimal Docker images
- 🗺️ **SEO Optimized** - Sitemap, robots.txt, and meta tags
- 🚀 **Performance** - Perfect Lighthouse scores
- 🔧 **Environment Validation** - Runtime environment checking

---

## 🎯 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (or use Docker)
- Git

### 1. Clone the Repository

```bash
# Using GitHub CLI
gh repo clone lmaksym/next-starter

# Using Git
git clone https://github.com/lmaksym/next-starter.git
cd next-starter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your values
```

**Required Environment Variables:**
```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/next_starter"

# App URLs
APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_your-key"
STRIPE_WEBHOOK_SECRET_KEY="whsec_your-key"
STRIPE_SUBSCRIPTION_PRICE_ID="price_your-price-id"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your-key"
```

### 4. Set Up Database

**Option A: Use Docker (Recommended)**
```bash
# Start PostgreSQL with Docker Compose
npm run docker:dev

# In another terminal, push database schema
npm run db:push
```

**Option B: Local PostgreSQL**
```bash
# Create database and push schema
createdb next_starter
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application!

---

## 📋 Available Scripts

### **Development**
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run preview      # Build and start production server
```

### **Code Quality**
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run typecheck    # Run TypeScript compiler
npm run format:check # Check Prettier formatting
npm run format:write # Fix Prettier formatting
```

### **Testing**
```bash
npm test             # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run e2e          # Run end-to-end tests
npm run e2e:ui       # Run e2e tests with Playwright UI
```

### **Database**
```bash
npm run db:generate  # Generate new migrations
npm run db:migrate   # Run migrations
npm run db:push      # Push schema changes (development)
npm run db:studio    # Open Drizzle Studio
```

### **Docker**
```bash
npm run docker:build # Build Docker image
npm run docker:dev   # Start development environment
npm run docker:prod  # Start production environment
```

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lmaksym/next-starter)

1. Connect your GitHub repository
2. Configure environment variables
3. Deploy!

### Docker Production

```bash
# Build and run with Docker Compose
npm run docker:prod

# Or manually
docker build -t next-starter .
docker run -p 3000:3000 --env-file .env.local next-starter
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm start
```

---

## 🐳 Docker

This project includes comprehensive Docker support for both development and production.

### Development with Docker

```bash
# Start full development environment (app + database)
npm run docker:dev

# This starts:
# - PostgreSQL database with sample data
# - Next.js app with hot reloading
# - Volume mounting for live code updates
```

### Production with Docker

```bash
# Build and start production environment
npm run docker:prod

# Features:
# - Multi-stage optimized build
# - Non-root user for security
# - Health checks
# - Minimal Alpine-based image
```

### Database Only

```bash
# Start only PostgreSQL database
docker-compose up postgres -d
```

For detailed Docker documentation, see [DOCKER.md](./DOCKER.md).

---

## 🛠️ Development

### Project Structure

```
next-template/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   └── ...               # Custom components
│   ├── lib/                   # Utility functions
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── db.ts             # Database connection
│   │   └── schema.ts         # Database schema
│   └── i18n/                  # Internationalization
├── messages/                  # Translation files
├── drizzle/                   # Database migrations
├── __tests__/                 # Test files
└── docker-compose.yml         # Docker configuration
```

### Key Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS 4 with OKLCH colors
- **UI Components**: shadcn/ui built on Radix UI
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js v5
- **Payments**: Stripe with webhooks
- **Testing**: Jest + React Testing Library + Playwright
- **Deployment**: Docker + Vercel ready

### Adding New Features

1. **Database Changes**: Modify `src/lib/schema.ts` → run `npm run db:generate` → `npm run db:push`
2. **New Components**: Add to `src/components/` → export from appropriate index
3. **API Routes**: Add to `src/app/api/` following Next.js conventions
4. **Translations**: Add keys to `messages/[locale].json`

### Environment Variables

All environment variables are validated using T3 Environment Variables:
- **Development**: Define in `.env.local`
- **Production**: Set in your deployment platform
- **Schema**: Defined in `src/env.mjs` with Zod validation

---

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- auth.test.ts
```

### End-to-End Tests

```bash
# Run all e2e tests
npm run e2e

# Run with Playwright UI for debugging
npm run e2e:ui

# Run specific test
npx playwright test home.spec.ts
```

### Testing Strategy

- **Unit Tests**: Components, utilities, and business logic
- **Integration Tests**: API routes and database operations
- **E2E Tests**: Critical user flows and authentication

---

## 🌐 Internationalization

This template includes complete i18n setup with `next-intl`:

### Supported Locales
- 🇺🇸 English (`en`)
- 🇵🇱 Polish (`pl`)

### Adding New Locales

1. Add locale to `src/i18n/routing.ts`:
```typescript
export const routing = defineRouting({
  locales: ['en', 'pl', 'es'], // Add 'es' for Spanish
  defaultLocale: 'en'
});
```

2. Create translation file `messages/es.json`:
```json
{
  "home": {
    "title": "Hola Mundo",
    "subtitle": "Una plantilla de inicio de Next.js"
  }
}
```

### Usage in Components

```typescript
import { useTranslations } from 'next-intl';

export function Component() {
  const t = useTranslations('home');
  return <h1>{t('title')}</h1>;
}
```

---

## 💳 Stripe Integration

Complete Stripe setup for subscription-based applications:

### Features
- 🔄 Subscription management
- 💰 One-time payments
- 🎣 Webhook handling
- 🔒 Secure checkout flow

### Setup

1. Create Stripe account and get API keys
2. Create products and prices in Stripe Dashboard
3. Set up webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
4. Configure environment variables

### Testing Payments

Use Stripe's test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Setup

1. Clone your fork
2. Install dependencies: `npm install`
3. Set up environment: `cp .env.example .env.local`
4. Start development: `npm run docker:dev`
5. Make your changes
6. Run tests: `npm test && npm run e2e`
7. Commit and push

### Code Standards

- Follow existing code style
- Add tests for new features
- Update documentation
- Use conventional commit messages

---

## 📄 License

MIT License - see [LICENSE.md](LICENSE.md) for details.

---

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/lmaksym/next-starter/issues)
- **Discussions**: [GitHub Discussions](https://github.com/lmaksym/next-starter/discussions)
- **Documentation**: Check the `CLAUDE.md` file for development guidelines

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) team for the amazing framework
- [shadcn](https://ui.shadcn.com) for the beautiful UI components
- [T3 Stack](https://create.t3.gg) for inspiration and best practices
- All contributors who help improve this template

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/lmaksym">Maksym Lypivskyi</a>
</p>

<p align="center">
  <a href="#top">⬆️ Back to Top</a>
</p>