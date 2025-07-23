# Technology Stack

## Core Framework

- **Next.js 15.4.3** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Type-safe JavaScript development

## Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework with inline theme configuration
- **Geist Font Family** - Modern typography (Sans & Mono variants)
- **CSS Custom Properties** - For theme variables and dark mode support

## Development Tools

- **ESLint** - Code linting with Next.js and TypeScript rules
- **Turbopack** - Fast bundler for development (via --turbopack flag)

## Common Commands

### Development

```bash
pnpm run dev          # Start development server with Turbopack
```

### Production

```bash
pnpm run build        # Build for production
pnpm run start        # Start production server
```

### Code Quality

```bash
pnpm run lint         # Run ESLint checks
```

## Configuration Notes

- TypeScript strict mode enabled
- Path aliases configured (`@/*` maps to `./src/*`)
- ESLint extends Next.js core web vitals and TypeScript rules
- PostCSS configured for Tailwind CSS processing
