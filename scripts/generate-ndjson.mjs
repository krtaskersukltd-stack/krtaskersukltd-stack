import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const cmsDir = path.join(__dirname, '..', 'data', 'cms')
const outputFile = path.join(__dirname, '..', 'data', 'sanity-export.ndjson')

const documents = []

// 1. Site Settings (Singleton)
documents.push({
  _type: 'settings',
  _id: 'siteSettings',
  siteName: 'KR Tasker Digital',
  defaultTitleTemplate: '%s | KR Tasker Digital',
  defaultMetaDescription: 'Bespoke web applications, high-converting CMS platforms, and brand strategy by KR Tasker Digital.',
  ctaHeading: 'Ready to elevate your digital presence?',
  ctaDescription: 'Partner with our digital engineering and search growth specialists.',
  ctaButtonText: 'Get Started Today',
  ctaButtonLink: '/contact',
  footerPhone: '+44 (0) 20 8123 4567',
  footerEmail: 'info@krtaskerdigital.com',
  footerAddress: '71-75 Shelton Street, Covent Garden, London, WC2H 9JQ',
  socialLinkedin: 'https://linkedin.com',
  socialTwitter: 'https://twitter.com',
  socialInstagram: 'https://instagram.com',
})

// 2. Navigation Items
const navItems = [
  { label: 'Home', href: '/', sortOrder: 1 },
  { label: 'Services', href: '/services', sortOrder: 2 },
  { label: 'Work', href: '/work', sortOrder: 3 },
  { label: 'About', href: '/about', sortOrder: 4 },
  { label: 'Team', href: '/team', sortOrder: 5 },
  { label: 'Blog', href: '/blog', sortOrder: 6 },
  { label: 'Contact', href: '/contact', sortOrder: 7 },
]
navItems.forEach((nav, idx) => {
  documents.push({
    _type: 'navigation',
    _id: `nav-${nav.label.toLowerCase()}`,
    label: nav.label,
    href: nav.href,
    sortOrder: nav.sortOrder,
    isVisible: true,
  })
})

// 3. Services
try {
  const services = JSON.parse(fs.readFileSync(path.join(cmsDir, 'services.json'), 'utf-8'))
  services.forEach((s) => {
    documents.push({
      _type: 'service',
      _id: `service-${s.slug}`,
      name: s.name,
      slug: { _type: 'slug', current: s.slug },
      eyebrow: s.eyebrow || 'Websites & Apps',
      status: s.status || 'published',
      sortOrder: s.sortOrder || 1,
      heroHeading: s.heroHeading || s.name,
      heroDescription: s.heroDescription || '',
      heroCtaText: s.heroCtaText || 'Get Started',
      introHeading: s.introHeading || `About ${s.name}`,
      introContent: s.introContent || '',
      features: (s.features || []).map((f, i) => ({
        _key: f.id || `f_${i}`,
        title: f.title,
        description: f.description,
        sortOrder: f.sortOrder || i + 1,
      })),
      metrics: (s.metrics || []).map((m, i) => ({
        _key: `m_${i}`,
        value: m.value,
        label: m.label,
      })),
      seo: s.seo ? {
        metaTitle: s.seo.metaTitle || `${s.name} | KR Tasker Digital`,
        metaDescription: s.seo.metaDescription || '',
        h1: s.seo.h1 || s.name,
        focusKeyword: s.seo.focusKeyword || '',
        indexStatus: s.seo.indexStatus || 'index',
      } : undefined,
    })
  })
} catch (e) {
  console.warn('Could not read services.json:', e.message)
}

// 4. Blogs
try {
  const blogs = JSON.parse(fs.readFileSync(path.join(cmsDir, 'blogs.json'), 'utf-8'))
  blogs.forEach((b) => {
    documents.push({
      _type: 'post',
      _id: `post-${b.slug}`,
      title: b.title,
      slug: { _type: 'slug', current: b.slug },
      category: b.category || 'Engineering',
      authorName: b.authorName || 'KR Tasker Editorial',
      authorRole: b.authorRole || 'Content Writer',
      publishDate: b.publishDate ? new Date(b.publishDate).toISOString().split('T')[0] : '2026-08-24',
      status: b.status || 'published',
      excerpt: b.excerpt || '',
      readingTime: b.readingTime || '5 min read',
      content: typeof b.content === 'string' ? b.content : JSON.stringify(b.content),
      tags: b.tags || [],
      seo: b.seo ? {
        metaTitle: b.seo.metaTitle || b.title,
        metaDescription: b.seo.metaDescription || b.excerpt,
        focusKeyword: b.seo.focusKeyword || b.category,
      } : undefined,
    })
  })
} catch (e) {
  console.warn('Could not read blogs.json:', e.message)
}

// 5. Case Studies (Work)
try {
  const work = JSON.parse(fs.readFileSync(path.join(cmsDir, 'work.json'), 'utf-8'))
  work.forEach((w) => {
    documents.push({
      _type: 'caseStudy',
      _id: `caseStudy-${w.slug}`,
      title: w.title,
      slug: { _type: 'slug', current: w.slug },
      client: w.client || 'Client Partner',
      year: w.year || '2026',
      category: w.category || 'Web Development & CMS',
      status: w.status || 'published',
      sortOrder: w.sortOrder || 1,
      shortDescription: w.shortDescription || '',
      overview: w.overview || '',
      challenge: w.challenge || '',
      solution: w.solution || '',
      results: w.results || '',
      metrics: (w.metrics || []).map((m, i) => ({
        _key: `wm_${i}`,
        value: m.value,
        label: m.label,
      })),
    })
  })
} catch (e) {
  console.warn('Could not read work.json:', e.message)
}

// 6. Team Members
try {
  const team = JSON.parse(fs.readFileSync(path.join(cmsDir, 'team.json'), 'utf-8'))
  team.forEach((t) => {
    documents.push({
      _type: 'teamMember',
      _id: `team-${t.id || t.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: t.name,
      role: t.role,
      shortBio: t.shortBio || '',
      linkedinUrl: t.linkedinUrl || 'https://linkedin.com',
      sortOrder: t.sortOrder || 1,
      status: t.status || 'published',
    })
  })
} catch (e) {
  console.warn('Could not read team.json:', e.message)
}

// 7. Pages
try {
  const pages = JSON.parse(fs.readFileSync(path.join(cmsDir, 'pages.json'), 'utf-8'))
  pages.forEach((p) => {
    const slugVal = p.slug || (p.routeKey === 'home' ? 'home' : p.routeKey)
    documents.push({
      _type: 'page',
      _id: `page-${slugVal}`,
      title: p.publicTitle || p.internalName,
      slug: { _type: 'slug', current: slugVal },
      template: 'standard',
      content: p.contentKeys ? JSON.stringify(p.contentKeys, null, 2) : '',
      status: p.status || 'published',
      seo: p.seo ? {
        metaTitle: p.seo.metaTitle,
        metaDescription: p.seo.metaDescription,
        focusKeyword: p.seo.focusKeyword,
      } : undefined,
    })
  })
} catch (e) {
  console.warn('Could not read pages.json:', e.message)
}

const ndjsonContent = documents.map((doc) => JSON.stringify(doc)).join('\n') + '\n'
fs.writeFileSync(outputFile, ndjsonContent, 'utf-8')

console.log(`✓ Generated ${documents.length} Sanity documents in ${outputFile}`)
