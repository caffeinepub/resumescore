# Design Brief: Resume Scoring System

## Purpose & Context
Resume analyzer for web development event. Users upload/paste resumes, receive 0-100 scores with category breakdowns (keywords, skills, experience, education, formatting, clarity), and actionable improvement tips. Professional, event-ready presentation.

## Tone & Aesthetic
Dark tech/brutalist professional. Deep charcoal background, high-contrast typography, cyan accents for interactivity, gold highlights for emphasis. Minimal decoration. Sharp grids, clean typography, zero-compromise on readability.

## Color Palette

| Token | Light OKLCH | Dark OKLCH | Purpose |
|-------|-------------|-----------|---------|
| background | 0.99 0 0 | 0.12 0 0 | Page foundation |
| foreground | 0.15 0 0 | 0.96 0 0 | Text, high contrast |
| card | 1.0 0 0 | 0.17 0 0 | Elevated surfaces |
| primary | 0.35 0 0 | 0.7 0.18 260 | Cyan accent, CTAs, highlights |
| secondary | 0.95 0 0 | 0.25 0 0 | Subtle backgrounds |
| accent | 0.35 0 0 | 0.68 0.2 70 | Gold highlights, emphasis |
| destructive | 0.55 0.22 25 | 0.65 0.19 22 | Red alerts, warnings |
| chart-1 | — | 0.7 0.18 260 | Cyan (primary accent) |
| chart-2 | — | 0.55 0.19 150 | Emerald (success/pass) |
| chart-3 | — | 0.68 0.2 70 | Gold (highlight) |
| chart-4 | — | 0.65 0.19 22 | Red (warning/fail) |
| chart-5 | — | 0.5 0.15 200 | Cool blue (secondary) |

## Typography

| Role | Font | Usage |
|------|------|-------|
| Display | Space Grotesk (geometric, tech) | Headers, titles, hero text |
| Body | DM Sans (neutral, legible) | Content, descriptions, labels |
| Mono | JetBrains Mono | Scores, code, data values |

Type scale: 12px → 14px → 16px → 18px → 22px → 28px → 36px (body to display).

## Structural Zones

| Zone | Background | Border | Purpose |
|------|------------|--------|---------|
| Header | card + border-b | 0.24 L | Logo + navigation, anchored |
| Hero/Intro | background, full-width card overlay | none | Hero title, upload CTA |
| Content cards | card | 0.24 L subtle | Score display, improvement tips |
| Sidebar (optional) | secondary | 0.24 L | Navigation, filters |
| Footer | secondary 50% opacity | border-t | Links, credits, legal |

## Component Patterns

- **Primary CTA**: cyan background (primary), white text, sharp corners or 8px radius, elevated shadow on hover
- **Secondary button**: transparent, cyan border (primary), cyan text, hover fills background
- **Score badge**: monospace font, gold accent color for emphasis, scale 0–100
- **Category tags**: secondary background, muted foreground, 4px radius
- **Input fields**: subtle card background, 8px radius, cyan ring on focus
- **Cards**: card background, border 0.24 L, shadow-card, 8px radius

## Motion & Interaction

- **Smooth transitions**: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) on hover/focus
- **Fade in**: 0.3s ease-out on page load
- **Slide up**: 0.3s ease-out for content reveals
- **Pulse subtle**: 2s ease-in-out infinite on loading states
- **No bounce animations** — preserve professional tone

## Spatial Rhythm

- Base grid: 8px
- Spacing: xs (4px), sm (8px), md (16px), lg (24px), xl (32px)
- Content max-width: 1200px
- Card padding: md (16px) default, lg (24px) hero
- Gap between cards: md (16px) grid

## Constraints & Conventions

- All colors via CSS variables, zero hex literals in components
- Never use arbitrary Tailwind colors (`bg-[#123]`)
- Dark mode only (class strategy)
- High contrast foreground-on-background: ≥0.78 L difference
- Accent used sparingly: CTAs, active states, score highlights only
- No gradient backgrounds — use solid dark colors for stability

## Signature Detail

Cyan accent (0.7 L 260h) appears exclusively on:
1. Primary CTA buttons
2. Active navigation links
3. Focus rings on inputs
4. Score borders in high-performing zones (80+)
5. Chart accent lines

This creates a unified, tech-forward focal point while keeping the interface restrained elsewhere.

## Dark Mode
Enabled by default (`.dark` class). Light mode templates included but never exposed in UI.

## Exports
- `index.css`: OKLCH tokens, @font-face declarations, utility classes
- `tailwind.config.js`: custom shadows, keyframes, animations, no color/radius rewrites
- Fonts: Space Grotesk, DM Sans, JetBrains Mono in `/public/assets/fonts/`
