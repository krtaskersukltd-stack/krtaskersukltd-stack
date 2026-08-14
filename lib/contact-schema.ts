import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(6).max(30).regex(/^[0-9+()\-\s]+$/),
  city: z.string().trim().max(100).optional().default(''),
  message: z.string().trim().min(10).max(5_000),
  services: z.array(z.string().trim().min(2).max(100)).min(1).max(12),
  preferredDays: z.array(z.string().trim().min(2).max(10)).min(1).max(7),
  preferredTimes: z.array(z.string().trim().min(2).max(10)).min(1).max(12),
  budget: z.string().trim().min(2).max(80),
  website: z.string().max(0).optional().default(''),
}).strict()
