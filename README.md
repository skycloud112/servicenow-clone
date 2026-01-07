# ServiceNow Clone

Multi-tenant incident management system built with clean architecture.

Merged from:
- [todo-nextjs-clean-architecture](https://github.com/...) - Clean architecture patterns
- [jira-clone-poc](https://github.com/...) - Multi-tenant theming system

## Architecture

### Clean Architecture Layers

- **Entities** (`packages/entities/`) - Domain models (Incident, User)
- **Gateways** (`packages/gateways/`) - Data access with PostgreSQL + in-memory implementations
- **Use Cases** (`apps/*/useCases/`) - Business logic classes
- **UI** (`apps/*/`) - React components with Next.js

### Dependency Flow

```
UI → Actions → Use Cases → Gateways → Database
```

### Key Patterns

- **Use Case pattern** - Business logic encapsulated in classes with dependency injection
- **Gateway pattern** - Dual implementations (real DB + in-memory for tests)
- **Server Actions** - Next.js server actions for client-server communication
- **React Query** - Server state management with caching

## Project Structure

```
apps/
├── admin/     # Admin portal (port 3001)
└── user/      # User portal (port 3002)

packages/
├── entities/           # Domain models
├── gateways/           # Database access layer
├── ui/                 # Shared UI components
├── theme/              # Multi-tenant theming
├── utils/              # Utility functions
├── scripts/            # Database initialization
└── typescript-config/  # Shared TS configs
```

## Tech Stack

- Next.js 15, React 18.2, TypeScript 5.7
- PostgreSQL with @nearform/sql
- MUI 6, Emotion
- React Query 5
- Vitest
- Turborepo + pnpm

## Local Setup

### Prerequisites

- Node.js 20.9.0+
- pnpm 10.8.0+
- Docker

### 1. Start PostgreSQL (long-running container)

```bash
docker run -d \
  --name servicenow-postgres \
  -e POSTGRES_PASSWORD=test \
  -e POSTGRES_USER=testuser \
  -e POSTGRES_DB=testdb \
  -p 5432:5432 \
  --restart unless-stopped \
  postgres:16
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment

Create `.env` in project root:

```env
POSTGRES_URL=postgresql://testuser:test@localhost:5432/testdb
```

### 4. Initialize database

```bash
cd packages/scripts && pnpm init-db
```

## Commands

```bash
pnpm dev              # Run all apps
pnpm build            # Build all
pnpm test             # Run tests
pnpm ts               # Type check

# Tenant-specific
pnpm admin:tenant1    # Admin with tenant1 theme
pnpm admin:tenant2    # Admin with tenant2 theme
pnpm user:tenant1     # User with tenant1 theme
pnpm user:tenant2     # User with tenant2 theme
```

## Multi-Tenancy

Set `NEXT_PUBLIC_TENANT` environment variable (`tenant1` or `tenant2`).

Theme configuration in `packages/theme/tenants/`.

## Testing

- **Use case tests**: In-memory gateways (fast, isolated)
- **Gateway tests**: Docker PostgreSQL (real SQL behavior)
