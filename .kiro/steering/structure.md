# Project Structure

## Directory Organization

```
├── src/app/                 # Next.js App Router directory
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page component
│   ├── globals.css         # Global styles and Tailwind imports
│   └── favicon.ico         # Site favicon
├── public/                 # Static assets
│   ├── *.svg              # Icon assets (Next.js, Vercel, etc.)
└── config files           # TypeScript, ESLint, PostCSS, Next.js configs
```

## Architecture Patterns

### App Router Structure

- Uses Next.js 13+ App Router pattern
- `layout.tsx` defines the root HTML structure and global providers
- `page.tsx` files represent route endpoints
- Global styles imported at layout level

### Component Conventions

- React Server Components by default
- TypeScript interfaces for props
- Responsive design with Tailwind classes
- Image optimization using Next.js `Image` component

### Styling Approach

- Tailwind utility classes for styling
- CSS custom properties for theming
- Dark mode support via `prefers-color-scheme`
- Font variables defined in layout and used in Tailwind config

### File Naming

- React components use `.tsx` extension
- Configuration files use appropriate extensions (`.mjs`, `.ts`, `.json`)
- Static assets in `public/` directory for direct access

## Import Patterns

- Use `@/*` path alias for src directory imports
- Next.js components imported from `next/*`
- Font imports from `next/font/google`
