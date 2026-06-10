<div align="center">

<img src="https://olovaui.olova.dev/_next/static/media/olova.0ubep8krpm77e.png" alt="Olova UI Logo" width="200" />

# Olova UI

**Modern React Component Library with 500+ Animated Components**

[Documentation](https://olovaui.olova.dev/docs) · [Components](https://olovaui.olova.dev) · [GitHub](https://github.com/olovalabs/olovaui) · [Sponsor](https://olovaui.olova.dev/sponsor)

</div>

---

Beautifully designed React components you can copy and paste into your apps. Accessible. Customizable. Open Source. Built with Tailwind CSS, Framer Motion, and TypeScript.

## ✨ Features

- 🎨 **Modern Design**: Clean and beautiful UI components with smooth animations
- ⚡ **High Performance**: Built with performance and accessibility in mind
- 🧱 **Easy to Customize**: Easily themeable with Tailwind CSS
- 🔄 **Smooth Animations**: Powered by the excellent `framer-motion` library
- 🧩 **Icons Included**: `lucide-react` icons are integrated out of the box
- 📱 **Responsive Design**: Mobile-first approach with responsive components
- 🌙 **Dark Mode**: Built-in dark mode support
- 🚀 **Static Export**: Optimized for static site generation
- 📊 **Performance Monitoring**: Built-in performance tracking and optimization

## 🚀 Getting Started

You can add Olova UI components to your project in two ways: using our CLI for a quick setup or by manually copying the component code for more control.

### CLI Installation

Our CLI will guide you through the process of adding components to your project. Here's an example of how to add the `Button` component:

```bash
# Using pnpm
pnpm dlx shadcn@latest add "https://olovaui.olova.dev/registry/button.json"

# Using npm
npx shadcn@latest add "https://olovaui.olova.dev/registry/button.json"

# Using yarn
yarn dlx shadcn@latest add "https://olovaui.olova.dev/registry/button.json"

# Using bun
bunx shadcn@latest add "https://olovaui.olova.dev/registry/button.json"
```

### Manual Installation

For manual installation, you can copy and paste the component code directly from our documentation into your project.

1. **Choose a Component**: Browse our component library and find what you need
2. **Copy the Code**: View and copy the source code for each component
3. **Paste and Customize**: Paste the code into your project and customize it to fit your needs

## 📦 Installation

### Prerequisites

Make sure you have the following dependencies installed in your project:

```bash
npm install tailwindcss framer-motion class-variance-authority clsx tailwind-merge lucide-react
```

### Setup

1. Install the required dependencies
2. Configure your `tailwind.config.js` to include the component paths
3. Add the CSS variables to your `globals.css`
4. Start using the components!

## 🧩 Available Components

### UI Components
- **Button** - Interactive button with ripple effects and loading states
- **Card** - Flexible card component for content display
- **Accordion** - Collapsible content sections
- **Tabs** - Tabbed navigation with multiple styles
- **Dropdown** - Dropdown menu component
- **Search** - Search input with fuzzy search capabilities
- **Login** - Complete login form component
- **Password** - Password input with strength indicator
- **Two-Step** - Two-step verification component

### Advanced Components
- **Flip Words** - Animated text flipping effect
- **Fuzzy** - Fuzzy search interface
- **Pattern** - Beautiful background patterns
- **Prompt** - AI prompt input component
- **Amazon Gift** - Gift card styled component
- **Dock** - macOS-style dock navigation
- **Spotlight Card** - Spotlight effect card
- **Text Reveal** - Text animation reveal
- **Toast** - Notification component
- **Strong Password** - Advanced password input

### Text Effects
- **Animated Gradient Text** - Beautiful gradient text animations
- **Shiny Text** - Shimmer effect on text
- **Scramble Text** - Text scrambling reveal effect

And 500+ more components waiting for you to explore!

## 🎯 Component Example

Here's a simplified example of our Button component:

```tsx
'use client'

import React from 'react';
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-11 rounded-md px-8': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;
```

> **Note**: This is a simplified example. Visit our documentation to see the full component with animations and all features!

## 🛠️ Development

### Project Structure

```
olovaui/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (landing)/          # Landing page
│   │   ├── docs/               # Documentation pages
│   │   └── standalone/         # Component standalone pages
│   ├── components/             # Reusable components
│   │   ├── ui/                 # UI components
│   │   ├── layout/             # Layout components
│   │   ├── documentation/      # Documentation components
│   │   ├── performance/        # Performance monitoring
│   │   └── seo/                # SEO components
│   ├── lib/                    # Utility functions
│   ├── hooks/                  # Custom React hooks
│   ├── context/                # React contexts
│   └── assets/                 # Static assets
├── public/
│   └── registry/               # Component registry files
├── scripts/                    # Build and generation scripts
└── package.json
```

### Scripts

- `dev` - Start development server with Turbopack
- `build` - Build for production
- `build:analyze` - Build with bundle analyzer
- `build:registry` - Build component registry
- `generate:components` - Auto-generate components
- `watch:components` - Watch for component changes
- `perf:audit` - Run Lighthouse performance audit
- `perf:bundle` - Analyze bundle size
- `perf:optimize` - Optimize build

### Performance Features

- **Bundle Analysis**: Built-in bundle analyzer for optimization
- **Performance Monitoring**: Real-time performance tracking
- **Resource Preloading**: Critical resource preloading
- **Web Vitals**: Core Web Vitals monitoring
- **SEO Optimization**: Comprehensive SEO implementation
- **Static Export**: Optimized for static site generation

## 🌟 Why Olova UI?

> "I'm a JavaScript library creator from Bangladesh, not a professional designer. But after building several front-end projects, I realized I needed my own UI system to streamline everything."

Olova UI is born from real development needs — built by a developer, for developers. It focuses on:

- **Developer Experience**: Easy to use and integrate
- **Performance**: Optimized for production use
- **Accessibility**: Built with accessibility in mind
- **Customization**: Easy to theme and customize
- **Modern Stack**: Built with the latest technologies

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Olova UI Team](https://github.com/olovalabs/olovaui)

## 🔗 Links

- [Documentation](https://olovaui.olova.dev/docs)
- [Components](https://olovaui.olova.dev)
- [GitHub](https://github.com/olovalabs/olovaui)
- [Sponsor](https://olovaui.olova.dev/sponsor)
- [Sera Chat](https://ai.olova.dev/)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Inspiration for the component structure
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library
- [Next.js](https://nextjs.org/) - React framework

---

<div align="center">

**Built with ❤️ by [Nazmul Hossain](https://www.linkedin.com/in/codernazmulhossain/) in Bangladesh**

</div>
