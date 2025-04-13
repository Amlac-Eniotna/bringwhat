# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Build: `npm run build`
- Dev server: `npm run dev`
- Start: `npm run start`
- Lint: `npm run lint`

## Code Style Guidelines
- **TypeScript**: Use strict typing with explicit type annotations
- **Formatting**: Uses Prettier with tailwindcss plugin
- **Components**: React functional components with hooks
- **Imports**: Sort imports by: React/Next.js, third-party, internal (@/*)
- **Naming**: PascalCase for components, camelCase for functions/variables
- **State Management**: Use React useState/useEffect, Context where appropriate
- **Error Handling**: Try/catch with specific error types
- **CSS**: Use Tailwind classes, prefer composition over custom CSS
- **Dark Mode**: Support via next-themes with "class" strategy
- **File Structure**: Group related components in dedicated folders
- **Comments**: Keep JSDoc-style comments for exported functions/components

Always check existing patterns in the codebase when making changes.