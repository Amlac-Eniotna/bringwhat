# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Build: `npm run build`
- Dev server: `npm run dev`
- Start: `npm run start`
- Lint: `npm run lint`
- Production build (for Coolify): `npm run coolify-build` (includes Prisma generate & migrate)

## Project Architecture

**QuiRamèneQuoi** is a French list-sharing application built with Next.js 15, React 19, and MySQL database via Prisma.

### Database Schema
- **Lists**: Have unique string IDs (generated via crypto.randomBytes), titles, and creation timestamps
- **Items**: Belong to lists, have auto-incrementing IDs, titles, optional quantities
- Prisma client is generated to `lib/generated/prisma/` (ignored by ESLint)

### Application Structure
- **App Router**: Uses Next.js 15 App Router with TypeScript
- **Pages**: 
  - `/` - Landing page with StartButton to create new lists
  - `/[id]` - Dynamic list view showing items with CRUD operations
- **Server Actions**: Located in `actions/` directory for database operations
- **Database Layer**: Centralized Prisma client in `lib/prisma.ts` with global singleton pattern
- **UI Components**: Radix UI primitives with custom styling in `components/ui/`

### Key Patterns
- **Server Actions**: Use "use server" directive for database operations (create-list.ts, add-item.ts, etc.)
- **Error Handling**: Prisma collision detection with retry logic for unique ID generation
- **Styling**: Tailwind CSS with custom fonts (Nunito, Nunito Sans, Syne) and dark mode support
- **Internationalization**: French language (lang="fr" in HTML)
- **Toast Notifications**: Radix UI toast system for user feedback

## Code Style Guidelines
- **TypeScript**: Use strict typing with explicit type annotations
- **Formatting**: Uses Prettier with tailwindcss plugin
- **Components**: React functional components with hooks
- **Imports**: Sort imports by: React/Next.js, third-party, internal (@/*)
- **Naming**: PascalCase for components, camelCase for functions/variables
- **State Management**: Use React useState/useEffect, Context where appropriate
- **Error Handling**: Try/catch with specific error types, especially for Prisma operations
- **CSS**: Use Tailwind classes, prefer composition over custom CSS
- **Dark Mode**: Support via next-themes with "class" strategy
- **File Structure**: Group related components in dedicated folders
- **Comments**: Keep JSDoc-style comments for exported functions/components
- **Database Operations**: Always use server actions, handle Prisma errors appropriately

Always check existing patterns in the codebase when making changes.