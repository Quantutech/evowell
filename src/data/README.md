# EvoWell Seed & Mock Data System

This system provides structured, environment-aware mock data for development and demonstration purposes.

## Architecture

- `src/data/types/`: TypeScript interfaces and Enums.
- `src/data/seed/`: Handcrafted, high-quality core data.
- `src/data/mock/`: Dynamic data generation using `faker.js`.
- `src/data/utils/`: Data loading and environment switching logic.

## Environment Behavior

### Development (`import.meta.env.DEV`)
- Loads all handcrafted seed data.
- Generates 25-30 realistic mock records per domain using Faker.
- Persists changes to `localStorage` (session state).

### Production (`import.meta.env.PROD`)
- Displays "Demo Mode Active" banner.
- Loads minimal data (5 providers, 3 blog posts).
- `localStorage` data auto-expires after 1 week.

## Management

### Resetting Data
Admins can reset the demo data via the **Admin Dashboard > Config** tab using the "Reset Demo Data" button.

### Adding New Data
To add new seed data, modify `src/data/seed/core.ts`. To change mock generation patterns, update `src/data/mock/factories.ts`.

## Validation
Interfaces are defined in `src/data/types/index.ts`. Zod schemas (e.g., `UserSchema`) are being introduced for runtime validation.
