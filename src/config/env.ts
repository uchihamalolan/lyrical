import { z } from 'zod'
import { createServerOnlyFn } from '@tanstack/react-start'

const envSchema = z.object({
  GEMINI_API_KEY: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production', 'test']),
})

// Validate server environment
export const serverEnv = createServerOnlyFn(() => envSchema.parse(process.env)) 