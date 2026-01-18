# Lyrical

## Project Overview

**Lyrical** is a modern web application for searching songs and viewing their lyrics. It is built with a focus on performance and user experience, leveraging the TanStack ecosystem.

Key features include:
*   **Song Search:** Search for tracks, artists, or albums.
*   **Lyrics Display:** View both plain and time-synced lyrics.
*   **AI Transliteration:** Automatically transliterates non-Latin scripts (e.g., K-pop, Hindi) into English/Latin script using Google's Gemini models (`gemini-3-flash-preview`).

## Technology Stack

*   **Framework:** [React 19](https://react.dev/)
*   **Routing & SSR:** [TanStack Start](https://tanstack.com/start/latest) & [TanStack Router](https://tanstack.com/router/latest)
*   **State Management:** [TanStack Query](https://tanstack.com/query/latest)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Testing:** [Vitest](https://vitest.dev/)
*   **Linting/Formatting:** [Biome](https://biomejs.dev/)
*   **Deployment:** Netlify (via `@netlify/vite-plugin-tanstack-start`)

## Getting Started

### Prerequisites

*   Node.js (LTS recommended)
*   pnpm (Project uses `pnpm-lock.yaml`)

### Environment Variables

Create a `.env` file in the root directory. You need the following keys:

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

### Installation

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

### Building

Build the project for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm serve
```

### Testing & Code Quality

*   **Run Tests:** `pnpm test`
*   **Format Code:** `pnpm format`
*   **Lint Code:** `pnpm lint`
*   **Check Code:** `pnpm check`

## Project Structure

*   `src/routes/`: File-based routing configuration (TanStack Router).
    *   `_app/`: Main application layout.
    *   `search/`: Search results page.
    *   `songs/`: Song details and lyrics page.
*   `src/services/`: Core business logic and API integrations.
    *   `lrclib.ts`: Client for the `lrclib.net` API (Lyrics).
    *   `transliteration.ts`: Google GenAI integration for lyrics transliteration.
*   `src/queries/`: TanStack Query hooks and options.
*   `src/components/`: Reusable UI components.
*   `src/config/`: Configuration files (e.g., environment variables).

## Key Files

*   `vite.config.ts`: Vite configuration, including plugins for React, TanStack Start, Tailwind, and Netlify.
*   `biome.json`: Configuration for Biome (linter/formatter).
*   `src/services/lrclib.ts`: Handles communication with the lyrics provider.
*   `src/services/transliteration.ts`: Handles the AI logic for transliterating lyrics.
