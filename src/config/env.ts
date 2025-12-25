// src/config/env.ts
import { z } from 'zod'

const envSchema = z.object({
  GEMINI_API_KEY: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production', 'test']),
})

// Validate server environment
export const serverEnv = envSchema.parse(process.env)