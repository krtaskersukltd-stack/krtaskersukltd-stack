import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().optional().default(''),
  firstName: z.string().trim().optional().default(''),
  lastName: z.string().trim().optional().default(''),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().optional().default(''),
  jobTitle: z.string().trim().optional().default(''),
  companyName: z.string().trim().optional().default(''),
  city: z.string().trim().optional().default(''),
  message: z.string().trim().max(10_000).optional().default(''),
  services: z.array(z.string().trim()).optional().default([]),
  preferredDays: z.array(z.string().trim()).optional().default([]),
  preferredTimes: z.array(z.string().trim()).optional().default([]),
  budget: z.string().trim().optional().default(''),
  website: z.string().optional().default(''),
  privacyConsent: z.boolean().optional().default(false),
  marketingConsent: z.boolean().optional().default(false),
})
