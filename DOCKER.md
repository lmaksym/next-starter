# Docker Setup

This project includes a comprehensive Docker setup for both development and production environments.

## Quick Start

### Production
```bash
# Build and run with Docker Compose
npm run docker:prod

# Or manually
docker-compose up --build -d
```

### Development
```bash
# Start development environment with hot reloading
npm run docker:dev

# Or manually
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

### Build Only
```bash
# Build Docker image only
npm run docker:build

# Run the built image
docker run -p 3000:3000 next-starter:latest
```

## Architecture

### Multi-stage Dockerfile
- **Base**: Node.js 24 Alpine
- **Deps**: Install dependencies
- **Builder**: Build the application
- **Runner**: Production runtime

### Services
- **nextjs**: Next.js application
- **postgres**: PostgreSQL database

## Configuration

### Environment Variables

#### Build-time (Required for Docker build)
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
DATABASE_URL=postgresql://user:pass@host:5432/db
AUTH_SECRET=your-secret-key
AUTH_GITHUB_ID=your_github_id
AUTH_GITHUB_SECRET=your_github_secret
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
```

#### Runtime (Docker Compose)
Environment variables are configured in:
- `docker-compose.yml` (production)
- `docker-compose.dev.yml` (development)

### Database
- **Production**: `next_starter`
- **Development**: `next_starter_dev`
- **User**: `postgres`
- **Password**: `postgres`
- **Port**: `5432`

## Commands

### Docker Scripts
```bash
npm run docker:build    # Build production image
npm run docker:dev      # Start development environment
npm run docker:prod     # Start production environment
```

### Manual Docker Commands
```bash
# Build image
docker build -t next-starter:latest .

# Run container
docker run -p 3000:3000 -e DATABASE_URL=... next-starter:latest

# Development with volume mounting
docker run -p 3000:3000 -v $(pwd):/app -w /app node:24-alpine npm run dev
```

### Docker Compose Commands
```bash
# Production
docker-compose up --build -d
docker-compose down
docker-compose logs -f

# Development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

# Database only
docker-compose up postgres -d
```

## Health Checks

The application includes health check endpoints:
- **Container**: `/api/health`
- **Docker**: Built-in healthcheck with curl

## Security

### Production Optimizations
- Non-root user (`nextjs:nodejs`)
- Minimal Alpine base image
- No development dependencies
- Standalone output mode
- Proper file permissions

### Environment
- Environment variables separated from image
- No secrets in Dockerfile
- `.dockerignore` for build optimization

## Troubleshooting

### Common Issues

**Build fails with environment errors:**
```bash
# Ensure all required build args are provided
docker build --build-arg NEXT_PUBLIC_APP_URL=http://localhost:3000 ...
```

**Database connection issues:**
```bash
# Check if PostgreSQL is running
docker-compose logs postgres

# Check network connectivity
docker-compose exec nextjs ping postgres
```

**Permission issues:**
```bash
# Reset ownership
docker-compose exec nextjs chown -R nextjs:nodejs /app
```

### Logs
```bash
# Application logs
docker-compose logs -f nextjs

# Database logs
docker-compose logs -f postgres

# All services
docker-compose logs -f
```

### Shell Access
```bash
# Access running container
docker-compose exec nextjs sh

# Access database
docker-compose exec postgres psql -U postgres -d next_starter
```

## Performance

### Image Size Optimization
- Multi-stage build reduces final image size
- Standalone output includes only necessary files
- Alpine Linux base image
- Proper `.dockerignore`

### Runtime Optimization
- Node.js production mode
- Next.js telemetry disabled
- Proper resource limits in production

## Deployment

### Container Registry
```bash
# Tag for registry
docker tag next-starter:latest your-registry/next-starter:latest

# Push to registry
docker push your-registry/next-starter:latest
```

### Production Checklist
- [ ] Update environment variables
- [ ] Configure proper DATABASE_URL
- [ ] Set AUTH_SECRET to secure value
- [ ] Configure OAuth credentials
- [ ] Set Stripe API keys
- [ ] Update NEXT_PUBLIC_APP_URL
- [ ] Configure health check endpoints
- [ ] Set up monitoring and logging