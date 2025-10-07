# AI App Builder Starter Template

A modern, production-ready React TypeScript template for building AI-powered applications. This template provides a solid foundation with the latest tools and best practices.

## 🌐 Live Demo

- **GitHub Repository**: https://github.com/mtomr3/ai-app-starter-template
- **Live Demo**: https://ai-app-starter-template.vercel.app

## ✨ Features

- **Vite** - Fast build tool and development server
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **ESLint** - Code linting and formatting
- **pnpm** - Fast, disk space efficient package manager

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm (recommended) or npm

### Installation

1. Clone or download this template
2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:5174](http://localhost:5174) in your browser

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
├── App.tsx             # Main App component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🎨 Styling

This template uses Tailwind CSS v4 with custom CSS variables for theming. The design system includes:

- CSS custom properties for consistent theming
- shadcn/ui components with variant support
- Responsive design utilities
- Dark mode support (ready to implement)

## 🔧 Configuration

### Path Aliases

The template includes path aliases configured in `tsconfig.json` and `vite.config.ts`:

- `@/` - Points to `src/` directory

### Tailwind CSS

Tailwind is configured with:
- Custom color palette using CSS variables
- shadcn/ui compatible configuration
- Animation utilities

## 📦 Adding Components

This template includes shadcn/ui components. To add more components:

```bash
npx shadcn-ui@latest add [component-name]
```

## 🚀 Deployment

Build the project:

```bash
pnpm build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

This is a starter template. Feel free to customize it for your needs:

1. Add more pages in `src/pages/`
2. Create custom components in `src/components/`
3. Add API integration using TanStack Query
4. Implement authentication
5. Add more shadcn/ui components

## 📄 License

This template is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/)