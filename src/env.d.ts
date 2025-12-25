/// <reference types="vite/client" />

// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly GEMINI_API_KEY: string
      readonly NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}