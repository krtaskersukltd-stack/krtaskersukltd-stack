import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().optional().default(''),
  city: z.string().trim().optional().default(''),
  message: z.string().trim().min(1).max(10_000),
  services: z.array(z.string().trim()).optional().default([]),
  preferredDays: z.array(z.string().trim()).optional().default([]),
  preferredTimes: z.array(z.string().trim()).optional().default([]),
  budget: z.string().trim().optional().default(''),
  website: z.string().optional().default(''),
})
