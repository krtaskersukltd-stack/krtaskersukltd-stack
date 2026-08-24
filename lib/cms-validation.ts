import { z } from 'zod'

export const slugSchema = z
  .string()
  .min(1, 'Slug cannot be empty')
  .max(120, 'Slug too long')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens')

export const seoSchema = z.object({
  metaTitle: z.string().max(100, 'Title too long').optional().default(''),
  metaDescription: z.string().max(300, 'Description too long').optional().default(''),
  h1: z.string().max(120, 'H1 too long').optional().default(''),
  focusKeyword: z.string().max(80).optional().default(''),
  canonicalUrl: z.string().url('Invalid Canonical URL').or(z.literal('')).optional(),
  indexStatus: z.enum(['index', 'noindex']).default('index'),
  followStatus: z.enum(['follow', 'nofollow']).default('follow'),
  ogTitle: z.string().max(100).optional(),
  ogDescription: z.string().max(300).optional(),
  ogImage: z.string().url('Invalid OG Image URL').or(z.literal('')).optional(),
})

export const redirectSchema = z
  .object({
    id: z.string(),
    sourcePath: z.string().startsWith('/', 'Source path must start with /'),
    destination: z.string().min(1, 'Destination URL cannot be empty'),
    statusCode: z.union([z.literal(301), z.literal(302)]),
    isActive: z.boolean(),
  })
  .refine((data) => data.sourcePath.toLowerCase() !== data.destination.toLowerCase(), {
    message: 'Source path cannot be identical to destination URL',
    path: ['destination'],
  })
