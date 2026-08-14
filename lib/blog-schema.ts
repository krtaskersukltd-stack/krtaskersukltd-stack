import sanitizeHtml from 'sanitize-html'
import { z } from 'zod'

const safeUrl = z.string().trim().min(1).max(2048).refine((value) => {
  if (value.startsWith('/') && !value.startsWith('//')) return true
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}, 'Only local paths or HTTPS URLs are allowed')

const textBlock = z.string().trim().min(1).max(20_000)

const blogBlockSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('paragraph'), text: textBlock }).strict(),
  z.object({ type: z.literal('heading'), text: textBlock.max(300) }).strict(),
  z.object({ type: z.literal('quote'), text: textBlock.max(3_000) }).strict(),
  z.object({ type: z.literal('image'), url: safeUrl, alt: z.string().trim().max(300) }).strict(),
  z.object({ type: z.literal('grid-images'), urls: z.array(safeUrl).min(1).max(12) }).strict(),
])

const blogInputSchema = z.object({
  slug: z.string().trim().min(3).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug'),
  title: z.string().trim().min(3).max(220),
  category: z.string().trim().min(2).max(80),
  readTime: z.string().trim().min(2).max(40),
  imageUrl: safeUrl,
  gradient: z.string().trim().max(300).optional(),
  date: z.string().trim().max(40).optional(),
  authorName: z.string().trim().min(2).max(100),
  authorRole: z.string().trim().min(2).max(100),
  authorImage: safeUrl,
  content: z.union([z.string().trim().min(1).max(150_000), z.array(blogBlockSchema).min(1).max(500)]),
}).strict()

export type ValidatedBlogInput = z.infer<typeof blogInputSchema>

export function validateBlogInput(input: unknown) {
  const parsed = blogInputSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message || 'Invalid blog data' }
  }

  const data = parsed.data
  if (typeof data.content === 'string') {
    data.content = sanitizeHtml(data.content, {
      allowedTags: ['p', 'br', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 'blockquote', 'ul', 'ol', 'li', 'a', 'img'],
      allowedAttributes: {
        a: ['href', 'title', 'target', 'rel'],
        img: ['src', 'alt', 'title'],
      },
      allowedSchemes: ['https'],
      allowedSchemesByTag: { a: ['https', 'mailto'], img: ['https'] },
      allowProtocolRelative: false,
      transformTags: {
        a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
      },
    })
  }

  return { success: true as const, data }
}
