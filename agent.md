# Olova UI - Agent Context File

> **Modern React Component Library with 500+ Animated Components**

## Project Overview

Olova UI is a monorepo-based React component library built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. It provides beautifully designed, animated UI components that developers can copy and paste into their applications.

**Author:** Nazmul Hossain (Bangladesh)
**License:** MIT
**Package Manager:** pnpm (>=9.0.0)
**Node Version:** >=18.0.0

---

## Monorepo Structure

```
olovaui/
├── apps/
│   └── web/                    # Next.js 16 application (main docs site & registry)
├── packages/
│   ├── ui/                     # UI components package (@olova/ui)
│   ├── utils/                  # Shared utilities (cn function, etc.)
│   └── config/                 # Shared ESLint, TypeScript, Tailwind configs
├── turbo.json                  # Turborepo configuration
├── pnpm-workspace.yaml         # pnpm workspace configuration
└── package.json                # Root package.json
```

---

## Technology Stack

### Core Technologies
- **Next.js 16.2.4** - React framework with App Router
- **React 19.2.4** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion 12.19.1** - Animations
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Build Tools
- **Turborepo** - Monorepo build system
- **tsx** - TypeScript execution
- **tsup** - Package bundling
- **Husky** - Git hooks
- **Commitlint** - Commit message linting

### Performance & SEO
- **@vercel/analytics** - Analytics
- **next-themes** - Dark mode support
- **shiki** - Code syntax highlighting
- **react-live** - Live code preview
- **pagefind** - Static site search

---

## Key Scripts

### Root Scripts (from root directory)
```bash
pnpm dev              # Start development server (all packages)
pnpm build            # Build all packages
pnpm build:analyze    # Build with bundle analyzer
pnpm lint             # Lint all packages
pnpm clean            # Clean build artifacts
pnpm format           # Format with Prettier
```

### Web App Scripts (apps/web/)
```bash
pnpm dev                           # Start Next.js dev server with Turbopack
pnpm build                         # Build docs + static export
pnpm build:analyze                 # Build with bundle analysis
pnpm build:registry                # Auto-generate + build component registry
pnpm build:docs                    # Build documentation only
pnpm generate:components            # Auto-generate components.ts
pnpm watch:components               # Watch component changes
pnpm search:index                   # Generate search index with pagefind
pnpm perf:audit                     # Run Lighthouse audit
pnpm seo:check                      # SEO validation with Lighthouse
pnpm sitemap:generate               # Generate sitemap
pnpm deploy                         # Deploy to Cloudflare Workers
```

---

## Directory Structure Deep Dive

### apps/web/src/
```
src/
├── app/                          # Next.js App Router
│   ├── (landing)/                # Landing page routes
│   ├── components/               # Component documentation pages
│   ├── docs/                     # Main documentation
│   ├── standalone/               # Standalone component demos
│   ├── changelog/                # Changelog pages
│   ├── sponsor/                  # Sponsor page
│   ├── usege/                    # Usage documentation
│   ├── globals.css               # Global styles with CSS variables
│   ├── layout.tsx                # Root layout with providers
│   └── not-found.tsx             # 404 page
├── components/
│   ├── ui/                       # Base UI components (button, card, etc.)
│   ├── layout/                   # Layout components (header, sidebar, etc.)
│   ├── documentation/            # Docs-specific components
│   ├── performance/              # Performance monitoring components
│   ├── primitives/               # Low-level primitives
│   ├── seo/                      # SEO components (meta tags, JSON-LD)
│   ├── analytics/                # Analytics integration
│   └── providers.tsx             # React context providers
├── hooks/
│   └── usePerformanceMonitor.ts  # Performance monitoring hook
├── lib/                          # Utility functions
├── context/                      # React contexts (theme, package manager)
├── assets/                       # Static assets (fonts, images)
├── constants/                    # Constants and configurations
├── config/                       # App configurations
└── mdx-components.tsx            # MDX component mappings
```

### apps/web/public/
```
public/
├── registry/                     # Component registry JSON files
│   └── button.json               # Example: button component registry
└── docs/                         # Documentation markdown files
```

### packages/ui/
```
packages/ui/
├── components/                   # UI components (currently minimal)
└── index.ts                      # Component exports
```

### packages/utils/
```
packages/utils/
└── index.ts                      # Utilities (cn function for className merging)
```

### packages/config/
```
packages/config/
├── eslint.ts                     # ESLint configuration
├── typescript.ts                 # TypeScript configuration
├── tailwind.ts                   # Tailwind configuration
└── index.ts                      # Config exports
```

---

## Component System

### Registry-Based Architecture

Components are distributed via a registry system compatible with shadcn/ui CLI:

```bash
# Users can add components via:
pnpm dlx shadcn@latest add "https://olovaui.olova.net/registry/button.json"
```

### Registry Item Schema

Each component in the registry follows this structure:
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "component-name",
  "title": "Component Title",
  "description": "Component description",
  "author": "Nazmul Hossain",
  "type": "registry:ui",
  "dependencies": [],
  "devDependencies": [],
  "registryDependencies": [],
  "cssVars": { "dark": {}, "light": {} },
  "files": [
    {
      "path": "registry/olovaui/component.tsx",
      "content": "...component code...",
      "type": "registry:ui",
      "target": "components/olovaui/component.tsx"
    }
  ]
}
```

### Component Categories

1. **Basic UI Components**
   - Button, Card, Badge, Avatar, Separator
   - Accordion, Tabs, Dialog, Dropdown

2. **Form Components**
   - Input, Checkbox, Combobox
   - Password, Alert, AlertDialog

3. **Text Animation Components**
   - Flip Words, Letter Glitch
   - Rolling Letters, Wiggle Hover
   - Pop In, Slide In, Shiny Text
   - Clip Path Reveal, Flip Link

4. **Slider/Carousel Components**
   - 3D Carousel, Focus Cards
   - Memories Card, Moody Carousel
   - Photo Slider, Rotating Cards
   - Video Accordion

5. **Advanced Components**
   - Hero Video Player, Border Beam
   - Code Block (multiple variants)
   - Glow Card, Shine Border
   - Network Graph

---

## Component Development Workflow

### Creating a New Component

1. **Create the component file:**
   ```
   apps/web/src/components/ui/your-component.tsx
   ```

2. **Create component docs page:**
   ```
   apps/web/src/app/components/your-component/
   ├── your-component-view.tsx    # Live preview
   └── your-component.tsx         # Documentation page
   ```

3. **Create documentation markdown:**
   ```
   apps/web/public/docs/your-component.md
   ```

4. **Create registry entry:**
   ```bash
   pnpm build:registry
   ```
   This auto-generates the registry JSON from your component.

5. **Test locally:**
   ```bash
   pnpm dev
   ```

### Component Conventions

- **'use client' directive:** All interactive components use client components
- **forwardRef:** Components should use `React.forwardRef` for ref forwarding
- **displayName:** Set `ComponentName.displayName` for debugging
- **cn utility:** Use the `cn()` function for className merging
- **TypeScript interfaces:** Export prop interfaces for reuse
- **Framer Motion:** Use motion components for animations
- **Tailwind variants:** Use class-variance-authority for variants

---

## Styling System

### CSS Variables

The project uses CSS variables for theming, defined in `apps/web/src/app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  /* ... more variables */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... more variables */
}
```

### Tailwind Configuration

- **Tailwind CSS 4** with the new PostCSS-based configuration
- **Custom animations:** Defined in `globals.css` and via Framer Motion
- **Dark mode:** Built-in support with `next-themes`

---

## Performance Optimization

### Implemented Features

1. **Static Export:** Next.js static site generation (`output: "export"`)
2. **Resource Preloading:** Critical resources preloaded
3. **Bundle Analysis:** Built-in bundle analyzer
4. **Image Optimization:** Static image optimization
5. **Performance Monitoring:** Custom performance monitoring hook
6. **Web Vitals:** Core Web Vitals tracking
7. **Google Analytics:** Integrated GA4
8. **SEO Optimization:** Comprehensive SEO with JSON-LD

### Performance Scripts

```bash
pnpm perf:audit        # Lighthouse performance audit
pnpm perf:bundle       # Bundle size analysis
pnpm seo:check         # SEO validation
```

---

## Deployment

### Configuration Files

- **vercel.json** - Vercel deployment configuration
- **wrangler.jsonc** - Cloudflare Workers configuration
- **next.config.ts** - Next.js configuration with static export

### Deployment Targets

1. **Vercel:** Primary deployment (static site)
2. **Cloudflare Pages:** Alternative deployment
3. **Cloudflare Workers:** For edge functions

---

## Git Workflow

### Commit Convention

Uses conventional commits with Commitizen:
```bash
pnpm commit           # Interactive commit wizard
```

### Commit Types

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Test additions/changes
- `chore:` Maintenance tasks

### Git Hooks

- **Husky** manages Git hooks
- **Commitlint** validates commit messages

---

## Important Notes for Agents

### File Locations

- **Components:** `apps/web/src/components/ui/`
- **Component docs:** `apps/web/src/app/components/`
- **Registry files:** `apps/web/public/registry/`
- **Documentation:** `apps/web/public/docs/`
- **Utilities:** `packages/utils/index.ts`
- **Shared config:** `packages/config/`

### Common Tasks

1. **Adding a component:**
   - Create component in `apps/web/src/components/ui/`
   - Run `pnpm build:registry` to generate registry entry
   - Add documentation page in `apps/web/src/app/components/`

2. **Updating dependencies:**
   - Update package.json in the relevant package
   - Run `pnpm install` from root

3. **Building for production:**
   - Run `pnpm build` from root
   - Output goes to `apps/web/out/`

4. **Running development:**
   - Run `pnpm dev` from root
   - Dev server runs on http://localhost:3000

### Code Style

- **TypeScript:** Strict mode enabled
- **ESLint:** Configured with React and TypeScript rules
- **Prettier:** Code formatting (run with `pnpm format`)
- **Import order:** External imports first, then internal imports

### Key Dependencies to Remember

- `cn()` - Utility for className merging (from `packages/utils`)
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `@radix-ui/*` - Accessible component primitives
- `class-variance-authority` - Variant management

---

## Links

- **Documentation:** https://olovaui.olova.net/docs
- **Live Site:** https://olovaui.olova.net
- **GitHub:** https://github.com/olovalabs/olovaui
- **Sponsor:** https://olovaui.olova.net/sponsor

---

## Acknowledgments

- **shadcn/ui** - Inspiration for component structure
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Next.js** - React framework
