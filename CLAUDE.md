# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog/portfolio static site built with Next.js App Router, deployed to GitHub Pages.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Build static export (outputs to ./out)
npm run lint     # Run ESLint
```

## Architecture

### Content System
- Blog posts are Markdown files in `/content/posts/` with `YYYY-MM-DD.md` naming
- Front matter format:
  ```yaml
  ---
  title: "Post Title"
  date: "2024-01-15"
  tags: ["tag1", "tag2"]
  excerpt: "Optional excerpt"
  ---
  ```
- Posts are processed by `src/lib/posts.ts` which handles YAML parsing and Markdown-to-HTML conversion

### Routing
- Uses Next.js App Router (`src/app/`)
- Dynamic post routes: `/[year]/[month]/[day]/page.tsx`
- Static generation via `generateStaticParams()` and `output: 'export'` in next.config.ts

### Styling
- Tailwind CSS 4 with custom color scheme in `tailwind.config.js`
- Key colors: `accent`, `header`, `mainbg`, `cardbg`, `heading`
- Code highlighting via highlight.js (imported in globals.css)

### Key Files
- `src/lib/posts.ts` - Post fetching and HTML conversion (custom YAML parser, remark pipeline)
- `src/app/components/Header.tsx` - Sticky navigation header
- `next.config.ts` - Static export configuration

## Deployment

GitHub Actions workflow (`.github/workflows/nextjs.yml`) builds and deploys to GitHub Pages on push to main.
