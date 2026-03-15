# Flourish CV - Professional Resume Builder

A modern, accessible, and user-friendly CV/Resume builder built with React, TypeScript, and Tailwind CSS. No account or login required — all features are available to everyone.

## Features

- **9 Professional Templates** — Modern Blue, Minimal Classic, Creative Edge, Executive Formal, Tech Developer, Simple Elegant, Academic, Bold Modern, Compact Pro
- **Real-time Preview** — See your changes instantly as you type
- **PDF Export** — High-quality PDF generation with full template styling and multi-page support
- **Color Customization** — Per-template primary/secondary color picker with WCAG contrast validation
- **Auto-save** — Work is automatically saved to `localStorage`; never lose progress
- **Blog** — Built-in blog with career advice and resume tips
- **Responsive Design** — Optimized for desktop, tablet, and mobile
- **Cross-browser Compatible** — Works on Chrome, Firefox, Safari, and Edge

## Accessibility

Built with accessibility as a core principle (WCAG 2.1 AA):

- Full keyboard navigation with proper focus management
- Skip-navigation links for screen reader and keyboard users
- Comprehensive ARIA labels on all interactive elements
- Built-in color contrast checker — warns when selected colors fail WCAG AA
- High contrast mode and reduced motion support via CSS media queries
- Compatible with NVDA, JAWS, and VoiceOver screen readers

## Browser Compatibility

| Browser | Minimum Version |
|---|---|
| Chrome | 79+ (Recommended) |
| Firefox | 67+ |
| Safari | 12+ |
| Edge | 79+ |
| Chrome Mobile | Latest 2 versions |
| Safari Mobile | Latest 2 versions |
| Samsung Internet | Latest version |

## Tech Stack

| Concern | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS + shadcn/ui (Radix UI) |
| Routing | React Router v6 |
| Form management | React Hook Form v7 |
| Validation | Zod |
| Data fetching | TanStack Query v5 |
| Backend / DB | Supabase (PostgreSQL + Auth) |
| PDF export | jsPDF + html2canvas |
| Notifications | Sonner |
| Deployment | Netlify |

## Architecture

The app follows a **Multi-layered Architecture with MVC on the presentation layer**:

```
src/
├── validation/        # Validation layer — Zod schemas (cvSchema, authSchema, profileSchema)
├── integrations/      # Data access layer — Supabase client + generated types
├── services/          # Service layer — resumeService.ts (DB operations)
├── hooks/             # Controller layer — useBuilderController, useDashboardController, useTemplatesController
├── pages/             # View layer — pure JSX, zero business logic
├── components/        # Reusable UI components + CV templates
├── data/              # Model data — templatesList.ts, sampleCV.ts, blogPosts.ts
└── types/             # Shared TypeScript types
```

- **Views** (`src/pages/`) only render — no `useState`, no data fetching
- **Controllers** (`src/hooks/use*Controller.ts`) own all state and side-effects per page
- **Validation** (`src/validation/`) is centralized and shared across forms and sanitization utilities

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Index | Landing page |
| `/builder` | Builder | CV editor with real-time preview and auto-save |
| `/templates` | Templates | Browse, preview, and customize all 9 templates |
| `/dashboard` | Dashboard | Manage saved resumes |
| `/blog` | Blog | Career advice articles |
| `/blog/:id` | BlogPost | Individual blog article |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check
npx tsc --noEmit

# Production build
npm run build
```

## Environment Variables

Create a `.env.local` file with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
