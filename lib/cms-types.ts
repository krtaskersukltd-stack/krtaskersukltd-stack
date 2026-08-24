export type PageStatus = 'draft' | 'published'

export interface PageSEO {
  metaTitle: string
  metaDescription: string
  h1: string
  focusKeyword: string
  canonicalUrl?: string
  indexStatus: 'index' | 'noindex'
  followStatus: 'follow' | 'nofollow'
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
}

export interface ContentKeyItem {
  key: string
  label: string
  value: string
  group: string
}

export interface PageRecord {
  id: string
  routeKey: string // e.g. 'home', 'about', 'services', 'work', 'blog', 'contact'
  internalName: string
  publicTitle: string
  slug: string
  publicUrl: string
  isSystemRoute: boolean
  status: PageStatus
  seo: PageSEO
  contentKeys: ContentKeyItem[]
  updatedAt: string
}

export interface ServiceFeature {
  id: string
  title: string
  description: string
  icon?: string
  sortOrder: number
}

export interface ServiceMetric {
  value: string
  label: string
}

export interface ServiceRecord {
  id: string
  name: string
  slug: string
  status: PageStatus
  sortOrder: number
  eyebrow?: string
  heroHeading: string
  heroDescription: string
  heroCtaText?: string
  introHeading?: string
  introContent?: string
  features: ServiceFeature[]
  metrics: ServiceMetric[]
  seo: PageSEO
  updatedAt: string
}

export interface WorkMetric {
  value: string
  label: string
}

export interface CaseStudyRecord {
  id: string
  client: string
  title: string
  slug: string
  year: string
  category: string
  featuredImage: string
  featuredImageAlt: string
  shortDescription: string
  status: PageStatus
  sortOrder: number
  overview?: string
  challenge?: string
  solution?: string
  results?: string
  metrics: WorkMetric[]
  seo: PageSEO
  updatedAt: string
}

export interface BlogPostRecord {
  id: string
  slug: string
  title: string
  category: string
  authorName: string
  authorRole: string
  authorImage?: string
  status: PageStatus
  publishDate: string
  excerpt: string
  readingTime: string
  featuredImage: string
  featuredImageAlt: string
  content: string
  tags: string[]
  seo: PageSEO
  updatedAt: string
}

export interface TeamMemberRecord {
  id: string
  name: string
  role: string
  photo: string
  photoAlt: string
  shortBio: string
  linkedinUrl?: string
  twitterUrl?: string
  sortOrder: number
  status: PageStatus
  updatedAt: string
}

export interface ContactEnquiryRecord {
  id: string
  name: string
  email: string
  phone?: string
  service?: string
  budget?: string
  message: string
  status: 'new' | 'in_progress' | 'closed'
  createdAt: string
}

export interface MediaItemRecord {
  id: string
  url: string
  filename: string
  mimeType: string
  sizeBytes: number
  altText: string
  title?: string
  uploadedAt: string
}

export interface RedirectRecord {
  id: string
  sourcePath: string
  destination: string
  statusCode: 301 | 302
  isActive: boolean
  updatedAt: string
}

export interface GlobalSectionsRecord {
  ctaHeading: string
  ctaDescription: string
  ctaButtonText: string
  ctaButtonLink: string
  footerPhone: string
  footerEmail: string
  footerAddress: string
  footerCopyright: string
  socialLinkedin?: string
  socialTwitter?: string
  socialInstagram?: string
}

export interface SEOSettingsRecord {
  siteName: string
  defaultTitleTemplate: string
  defaultMetaDescription: string
  defaultOgImage: string
  robotsTxtContent: string
  sitemapEnabled: boolean
}
