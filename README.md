# ServiceNow Clone

Multi-tenant incident management system built with clean architecture.

## Architecture

### Clean Architecture Layers

- **Entities** (`packages/entities/`) - Domain models (Incident, User)
- **Gateways** (`packages/gateways/`) - Data access with PostgreSQL + in-memory implementations
- **Use Cases** (`apps/*/*useCases/`) - Business logic classes
- **UI** (`ui/*/`) - shared React components for all apps

### Dependency Flow

```
UI → Actions → Use Cases → Entities 
Gateways impl -> Entities
Use cases access datbase via Gateways interfaces
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
├── scripts/            # Database initialization and migration
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
  --name postgres-postgres \
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

Create `.env` in each app folder

```env
POSTGRES_URL=postgresql://testuser:test@localhost:5432/testdb
```

### 4. Initialize database

```bash
cd apps/scripts && pnpm init-db
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

## Theming Architecture

Design tokens are used in two ways:

1. **MUI Theme** - Tokens are converted to an MUI theme via `createMuiTheme()`, which automatically styles all MUI components (Button, TextField, Typography, etc.)
2. **Direct Access** - Components use `useDesignTokens()` hook to access tokens directly for custom styling

### When to Use Each Approach

| Approach | Use When |
|----------|----------|
| MUI Theme (automatic) | Using standard MUI components that respect theme palette |
| `useDesignTokens()` hook | Custom styles, computed colors (e.g., status-based), non-MUI styling |

### Example: MUI Theme (Automatic Styling)

```typescript
// MUI Button automatically uses tokens.colors.primary
<Button variant="contained">Submit</Button>

// Typography uses tokens.colors.text via theme
<Typography color="text.primary">Hello</Typography>
```

### Example: useDesignTokens Hook (Direct Access)

```typescript
// StatusBadge.tsx - uses tokens directly for status-based colors
const StatusBadge = ({ status }: StatusBadgeProps) => {
  const tokens = useDesignTokens()

  const colorMap: Record<IssueStatus, string> = {
    'todo': tokens.colors.textMuted,
    'in-progress': tokens.colors.warning,
    'done': tokens.colors.success,
  }

  return <Chip sx={{ bgcolor: colorMap[status] }} />
}

// BoardColumn.tsx - uses tokens for custom background
const BoardColumn = ({ title, children }: BoardColumnProps) => {
  const tokens = useDesignTokens()

  return (
    <Box sx={{ bgcolor: tokens.colors.background }}>
      <Box sx={{ bgcolor: tokens.colors.border }}>{title}</Box>
      {children}
    </Box>
  )
}
```

### Design Tokens

Each tenant has a set of design tokens defined in `packages/theme/tenants/`:

```typescript
// packages/theme/tenants/tenant1.ts
export const tenant1Tokens: DesignTokens = {
  name: 'Tenant 1',
  colors: {
    primary: '#0052CC',
    secondary: '#6554C0',
    background: '#FAFBFC',
    surface: '#FFFFFF',
    text: '#172B4D',
    textMuted: '#5E6C84',
    border: '#DFE1E6',
    success: '#36B37E',
    warning: '#FFAB00',
    error: '#FF5630',
  },
}
```

### DesignTokensProvider

UI components access design tokens via the `useDesignTokens()` hook:

```typescript
// In a UI component
import { useDesignTokens } from '@repo/theme'

export const MyComponent = () => {
  const tokens = useDesignTokens()

  return (
    <Box sx={{ color: tokens.colors.primary }}>
      Hello from {tokens.name}
    </Box>
  )
}
```

### App Layout Setup

Each app wraps its content with both `DesignTokensProvider` and MUI's `ThemeProvider`:

```typescript
// apps/admin/app/layout.tsx
import { DesignTokensProvider, getTenantTokens, createMuiTheme } from '@repo/theme'

const tenantName = process.env.NEXT_PUBLIC_TENANT || 'tenant1'
const tokens = getTenantTokens(tenantName)
const muiTheme = createMuiTheme(tokens)

export default function RootLayout({ children }) {
  return (
    <DesignTokensProvider tokens={tokens}>
      <ThemeProvider theme={muiTheme}>
        {children}
      </ThemeProvider>
    </DesignTokensProvider>
  )
}
```

### Adding a New Tenant

1. Create a new tokens file in `packages/theme/tenants/`:

```typescript
// packages/theme/tenants/tenant3.ts
import { DesignTokens } from '../types'

export const tenant3Tokens: DesignTokens = {
  name: 'Tenant 3',
  colors: {
    primary: '#FF5722',
    // ... other colors
  },
}
```

2. Register it in `packages/theme/getTenantTheme.ts`:

```typescript
import { tenant3Tokens } from './tenants/tenant3'

const tenants: Record<string, DesignTokens> = {
  tenant1: tenant1Tokens,
  tenant2: tenant2Tokens,
  tenant3: tenant3Tokens,
}
```

3. Add npm scripts to root `package.json`:

```json
{
  "scripts": {
    "admin:tenant3": "NEXT_PUBLIC_TENANT=tenant3 turbo run dev --filter=admin",
    "user:tenant3": "NEXT_PUBLIC_TENANT=tenant3 turbo run dev --filter=user"
  }
}
```

## Testing

- **Use case tests**: In-memory gateways (fast, isolated)
- **Gateway tests**: Docker PostgreSQL (real SQL behavior)
