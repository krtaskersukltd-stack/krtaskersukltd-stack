import { db } from './db'
import type {
  PageRecord,
  ServiceRecord,
  CaseStudyRecord,
  BlogPostRecord,
  TeamMemberRecord,
  ContactEnquiryRecord,
  MediaItemRecord,
  RedirectRecord,
  GlobalSectionsRecord,
  SEOSettingsRecord,
  NavItemRecord,
} from './cms-types'

// Default Seed Constants
const DEFAULT_GLOBAL: GlobalSectionsRecord = {
  ctaHeading: 'Ready to elevate your digital presence?',
  ctaDescription: 'Partner with KR Tasker Digital for bespoke web engineering, CMS solutions, and search growth.',
  ctaButtonText: 'Get Started Today',
  ctaButtonLink: '/contact',
  footerPhone: '+44 (0) 20 8123 4567',
  footerEmail: 'info@krtaskerdigital.com',
  footerAddress: '71-75 Shelton Street, Covent Garden, London, WC2H 9JQ',
  footerCopyright: '© 2026 KR Tasker UK Ltd. All rights reserved.',
  socialLinkedin: 'https://www.linkedin.com/company/kr-tasker-digital/',
  socialInstagram: 'https://www.instagram.com/krtaskerdigital/',
  socialFacebook: 'https://www.facebook.com/profile.php?id=61571387696002',
}

const DEFAULT_SEO: SEOSettingsRecord = {
  siteName: 'KR Tasker Digital',
  defaultTitleTemplate: '%s | KR Tasker Digital',
  defaultMetaDescription: 'Bespoke web development, CMS integration, and SEO optimization by KR Tasker Digital.',
  defaultOgImage: 'https://www.krtaskerdigital.com/og-default.jpg',
  robotsTxtContent: `User-agent: *\nAllow: /\nDisallow: /studio\nDisallow: /api/\nSitemap: https://www.krtaskerdigital.com/sitemap.xml`,
  sitemapEnabled: true,
}

const DEFAULT_NAV: NavItemRecord[] = [
  {
    id: 'nav-services',
    label: 'Services',
    href: '/services',
    menuType: 'dropdown',
    sortOrder: 1,
    isVisible: true,
    dropdownItems: [
      {
        id: 'seo',
        title: 'SEO Services',
        tagline: 'Dominate organic search and accelerate rankings',
        href: '/services/seo',
        badge: 'TOP RATED',
        image: '/images/services/seo-brand-strategy.png',
        subServices: [
          { title: 'Local SEO', href: '/services/seo/local-seo' },
          { title: 'E-Commerce SEO', href: '/services/seo/ecommerce-seo' },
          { title: 'Technical SEO', href: '/services/seo/technical-seo' },
          { title: 'On-Page SEO', href: '/services/seo/on-page-seo' },
          { title: 'Off-Page SEO', href: '/services/seo/off-page-seo' },
          { title: 'National SEO', href: '/services/seo/national-seo' },
          { title: 'International SEO', href: '/services/seo/international-seo' },
          { title: 'SEO Audit', href: '/services/seo/seo-audit' },
          { title: 'Content Marketing', href: '/services/seo/content-marketing' },
          { title: 'Google Penalty Recovery', href: '/services/seo/google-penalty-recovery' },
          { title: 'AI SEO', href: '/services/seo/ai-seo' },
        ],
      },
      {
        id: 'web-development',
        title: 'Web Services',
        tagline: 'Bespoke web architecture, modern design & fast performance',
        href: '/services/web-development',
        image: '/images/services/web-app-design.png',
        subServices: [
          { title: 'Web Design', href: '/services/web-development/web-design' },
          { title: 'Custom Web Development', href: '/services/web-development/custom-web-development' },
          { title: 'E-Commerce Development', href: '/services/web-development/ecommerce-development' },
          { title: 'WordPress Development', href: '/services/web-development/wordpress-development' },
          { title: 'Shopify Development', href: '/services/web-development/shopify-development' },
          { title: 'UI/UX Design', href: '/services/web-development/ui-ux-design' },
          { title: 'CMS Development', href: '/services/web-development/cms-development' },
        ],
      },
      {
        id: 'marketing',
        title: 'Marketing',
        tagline: 'High-converting Google Ads and performance campaigns',
        href: '/services/marketing',
        image: '/images/services/digital-marketing.png',
        subServices: [
          { title: 'Google Ads', href: '/services/marketing/google-ads' },
          { title: 'Google Search Ads', href: '/services/marketing/google-ads/google-search-ads' },
          { title: 'Google Shopping Ads', href: '/services/marketing/google-ads/google-shopping-ads' },
          { title: 'Google Display Ads', href: '/services/marketing/google-ads/google-display-ads' },
          { title: 'YouTube Ads', href: '/services/marketing/google-ads/youtube-ads' },
          { title: 'PPC Management', href: '/services/marketing/google-ads/ppc-management' },
        ],
      },
      {
        id: 'graphic-design',
        title: 'Graphic Designing',
        tagline: 'Distinctive visual identities and engaging creative assets',
        href: '/services/graphic-design',
        image: '/images/services/graphic-branding.jpg',
        subServices: [
          { title: 'Logo Design', href: '/services/graphic-design/logo-design' },
          { title: 'Brand Identity Design', href: '/services/graphic-design/brand-identity-design' },
          { title: 'Poster Design', href: '/services/graphic-design/poster-design' },
          { title: 'Banner Design', href: '/services/graphic-design/banner-design' },
          { title: 'Social Media Graphics', href: '/services/graphic-design/social-media-graphics' },
        ],
      },
      {
        id: 'social-media',
        title: 'Social Media',
        tagline: 'Grow, engage, and convert your audience across social channels',
        href: '/services/social-media',
        image: '/images/services/digital-marketing.png',
        subServices: [
          { title: 'Social Media Management', href: '/services/social-media/social-media-management' },
          { title: 'Social Media Marketing', href: '/services/social-media/social-media-marketing' },
          { title: 'Social Media Strategy', href: '/services/social-media/social-media-strategy' },
          { title: 'Social Media Content Creation', href: '/services/social-media/social-media-content-creation' },
          { title: 'Community Management', href: '/services/social-media/community-management' },
          { title: 'Social Media Audit', href: '/services/social-media/social-media-audit' },
          { title: 'Influencer Marketing', href: '/services/social-media/influencer-marketing' },
          { title: 'Social Media Consulting', href: '/services/social-media/social-media-consulting' },
        ],
      },
      {
        id: 'ai-automation',
        title: 'AI Automation',
        tagline: 'Automate business workflows with intelligent AI agents',
        href: '/services/ai-automation',
        badge: 'POPULAR',
        image: '/images/services/ai-automation.jpg',
        subServices: [
          { title: 'AI Consulting UK', href: '/services/ai-automation/ai-consulting-uk' },
          { title: 'AI Workflow Automation', href: '/services/ai-automation/ai-workflow-automation' },
          { title: 'AI Chatbot Development', href: '/services/ai-automation/ai-chatbot-development' },
          { title: 'AI Voice Agents', href: '/services/ai-automation/ai-voice-agents' },
          { title: 'Marketing Automation', href: '/services/ai-automation/marketing-automation' },
        ],
      },
      {
        id: 'email-marketing',
        title: 'Email Marketing',
        tagline: 'Automated lifecycle sequences and high-ROI campaigns',
        href: '/services/email-marketing',
        image: '/images/services/email-marketing.jpg',
        subServices: [
          { title: 'Email Marketing Strategy', href: '/services/email-marketing/email-marketing-strategy' },
          { title: 'Email Campaign Management', href: '/services/email-marketing/email-campaign-management' },
          { title: 'Email Automation', href: '/services/email-marketing/email-automation' },
          { title: 'Email List Building', href: '/services/email-marketing/email-list-building' },
          { title: 'Email Design', href: '/services/email-marketing/email-design' },
          { title: 'Email Copywriting', href: '/services/email-marketing/email-copywriting' },
          { title: 'Email Marketing Audit', href: '/services/email-marketing/email-marketing-audit' },
        ],
      },
    ],
    featuredCard: {
      title: 'View all Services',
      subtitle: "We don't stop there, check out all the services we offer here at KR Tasker",
      href: '/services',
      image: '/images/services/web-app-design.png',
    },
  },
  {
    id: 'nav-industries',
    label: 'Industries',
    href: '/work',
    menuType: 'dropdown',
    sortOrder: 2,
    isVisible: true,
    dropdownItems: [
      { title: 'B2B & Enterprise', tagline: 'High-intent lead pipelines & corporate positioning', href: '/industries/b2b-enterprise' },
      { title: 'B2C & Consumer', tagline: 'Direct-to-consumer reach & brand loyalty', href: '/industries/b2c-consumer' },
      { title: 'E-Commerce & Retail', tagline: 'Scalable Shopify Plus stores & checkout growth', href: '/industries/ecommerce-retail' },
      { title: 'SaaS & Technology', tagline: 'Custom web apps, internal tools & client portals', href: '/industries/saas-technology' },
    ],
    featuredCard: {
      title: 'Explore Case Studies',
      subtitle: 'See how we deliver measurable organic scale and revenue across every sector',
      href: '/work',
      image: '/images/services/digital-marketing.png',
    },
  },
  { id: 'nav-work', label: 'Work', href: '/work', menuType: 'link', sortOrder: 3, isVisible: true },
  { id: 'nav-about', label: 'About', href: '/about', menuType: 'link', sortOrder: 4, isVisible: true },
  { id: 'nav-blog', label: 'Blog', href: '/blog', menuType: 'link', sortOrder: 5, isVisible: true },
  { id: 'nav-contact', label: 'Contact', href: '/contact', menuType: 'link', sortOrder: 6, isVisible: true },
]

// 1. PAGES
export async function getCmsPages(): Promise<PageRecord[]> {
  let sanityPages: PageRecord[] = []

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { PAGES_QUERY } = await import('@/sanity/lib/queries')
      const sanityData = await client.fetch(PAGES_QUERY)
      if (Array.isArray(sanityData) && sanityData.length > 0) {
        sanityPages = sanityData.map((p: any) => ({
          id: p._id || p.id || `page-${p.slug}`,
          routeKey: p.slug || '',
          internalName: p.title,
          publicTitle: p.title,
          slug: p.slug ? (p.slug.startsWith('/') ? p.slug : `/${p.slug}`) : '',
          publicUrl: `https://www.krtaskerdigital.com/${(p.slug || '').replace(/^\//, '')}`,
          isSystemRoute: false,
          templateKey: p.template || 'standard',
          parentSlug: '',
          status: p.status || 'published',
          seo: {
            metaTitle: p.seo?.metaTitle || p.title,
            metaDescription: p.seo?.metaDescription || '',
            focusKeyword: p.seo?.focusKeyword || '',
            h1: p.title,
            indexStatus: 'index',
            followStatus: 'follow',
          },
          contentKeys: [],
          sections: [
            {
              id: `sec-${p.slug}`,
              type: 'rich_text',
              isEnabled: true,
              sortOrder: 1,
              data: {
                title: p.title,
                content: p.content || '',
                featuredImage: p.featuredImage || '',
                featuredImageAlt: p.featuredImageAlt || p.title,
              },
            },
          ],
          updatedAt: p._updatedAt || new Date().toISOString(),
        }))
      }
    }
  } catch (err) {
    console.warn('getCmsPages Sanity fetch error:', err)
  }

  let dbPages: PageRecord[] = []
  try {
    const stmt = db.prepare('SELECT * FROM pages ORDER BY isSystemRoute DESC, internalName ASC')
    const rows = stmt.all() as any[]
    dbPages = rows.map((row) => ({
      id: row.id,
      routeKey: row.routeKey,
      internalName: row.internalName,
      publicTitle: row.publicTitle,
      slug: row.slug,
      publicUrl: row.publicUrl,
      isSystemRoute: Boolean(row.isSystemRoute),
      templateKey: row.templateKey || 'standard',
      parentSlug: row.parentSlug || '',
      status: row.status,
      seo: JSON.parse(row.seo || '{}'),
      contentKeys: JSON.parse(row.contentKeys || '[]'),
      sections: JSON.parse(row.sections || '[]'),
      updatedAt: row.updatedAt,
    }))
  } catch (err) {
    console.error('getCmsPages DB error', err)
  }

  // Merge: Sanity custom pages take priority or append to system pages
  if (sanityPages.length > 0) {
    const sanitySlugs = new Set(sanityPages.map((sp) => sp.slug.toLowerCase()))
    const remainingDbPages = dbPages.filter(
      (dp) => !sanitySlugs.has((dp.slug || '').toLowerCase()) && !sanitySlugs.has(`/${dp.routeKey || ''}`.toLowerCase())
    )
    return [...sanityPages, ...remainingDbPages]
  }

  return dbPages
}

export async function getCmsPageBySlug(slugPath: string): Promise<PageRecord | null> {
  const cleanSlug = slugPath.replace(/^\//, '').trim()

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { PAGE_BY_SLUG_QUERY } = await import('@/sanity/lib/queries')
      const p = await client.fetch(PAGE_BY_SLUG_QUERY, { slug: cleanSlug })
      if (p && p.title) {
        return {
          id: p._id || p.id || `page-${p.slug}`,
          routeKey: p.slug || cleanSlug,
          internalName: p.title,
          publicTitle: p.title,
          slug: p.slug ? (p.slug.startsWith('/') ? p.slug : `/${p.slug}`) : `/${cleanSlug}`,
          publicUrl: `https://www.krtaskerdigital.com/${(p.slug || cleanSlug).replace(/^\//, '')}`,
          isSystemRoute: false,
          templateKey: p.template || 'standard',
          parentSlug: '',
          status: p.status || 'published',
          seo: {
            metaTitle: p.seo?.metaTitle || p.title,
            metaDescription: p.seo?.metaDescription || '',
            focusKeyword: p.seo?.focusKeyword || '',
            h1: p.title,
            indexStatus: 'index',
            followStatus: 'follow',
          },
          contentKeys: [],
          sections: [
            {
              id: `sec-${p.slug || cleanSlug}`,
              type: 'rich_text',
              isEnabled: true,
              sortOrder: 1,
              data: {
                title: p.title,
                content: p.content || '',
                featuredImage: p.featuredImage || '',
                featuredImageAlt: p.featuredImageAlt || p.title,
              },
            },
          ],
          updatedAt: p._updatedAt || new Date().toISOString(),
        }
      }
    }
  } catch (err) {
    console.warn('getCmsPageBySlug Sanity fetch error:', err)
  }

  const allPages = await getCmsPages()
  return (
    allPages.find(
      (p) =>
        p.status === 'published' &&
        (p.slug === cleanSlug || p.slug === `/${cleanSlug}` || p.routeKey === cleanSlug)
    ) || null
  )
}

export async function saveCmsPages(pages: PageRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM pages')
  const insertStmt = db.prepare(`
    INSERT INTO pages (id, routeKey, internalName, publicTitle, slug, publicUrl, isSystemRoute, templateKey, parentSlug, status, seo, contentKeys, sections, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const p of pages) {
      insertStmt.run(
        p.id,
        p.routeKey,
        p.internalName,
        p.publicTitle,
        p.slug,
        p.publicUrl,
        p.isSystemRoute ? 1 : 0,
        p.templateKey || 'standard',
        p.parentSlug || '',
        p.status,
        JSON.stringify(p.seo || {}),
        JSON.stringify(p.contentKeys || []),
        JSON.stringify(p.sections || []),
        p.updatedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 2. SERVICES
export async function getCmsServices(): Promise<ServiceRecord[]> {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { SERVICES_QUERY } = await import('@/sanity/lib/queries')
      const sanityData = await client.fetch(SERVICES_QUERY)
      if (Array.isArray(sanityData) && sanityData.length > 0) {
        return sanityData.map((s: any) => ({
          id: s._id || s.id || `srv-${s.slug}`,
          name: s.name,
          slug: s.slug,
          status: s.status || 'published',
          sortOrder: s.sortOrder || 1,
          template: s.template || (s.capabilities?.length ? 'category' : 'subservice'),
          eyebrow: s.eyebrow || '',
          parentService: s.parentService || '',
          heroHeading: s.heroHeading || '',
          heroDescription: s.heroDescription || '',
          heroCtaText: s.heroCtaText || 'Start a project',
          heroCtaLink: s.heroCtaLink || '/contact',
          heroBannerImage: s.heroBannerImage || '',
          heroBannerImageAlt: s.heroBannerImageAlt || s.name,
          capabilitiesEyebrow: s.capabilitiesEyebrow || s.eyebrow || s.name,
          capabilitiesHeading: s.capabilitiesHeading || '',
          capabilitiesCtaText: s.capabilitiesCtaText || 'About KR Tasker',
          capabilitiesCtaLink: s.capabilitiesCtaLink || '/about',
          capabilitiesTitle: s.capabilitiesTitle || 'Our Company Capabilities',
          capabilities: s.capabilities || [],
          marqueeText: s.marqueeText || "Let's Work Together.",
          visionEyebrow: s.visionEyebrow || 'We approach every project with a clear vision.',
          visionHeading: s.visionHeading || '',
          visionDescription: s.visionDescription || '',
          visionCtaText: s.visionCtaText || 'Start a project Today',
          visionCtaLink: s.visionCtaLink || '/contact',
          visionImage: s.visionImage || '',
          visionImageAlt: s.visionImageAlt || s.name,
          introHeading: s.introHeading || '',
          introContent: s.introContent || '',
          featuredImage: s.featuredImage || '',
          features: s.features || [],
          metrics: s.metrics || [],
          seo: s.seo || {
            metaTitle: s.name,
            metaDescription: s.heroDescription,
            h1: s.name,
            focusKeyword: s.name,
            indexStatus: 'index',
            followStatus: 'follow',
          },
          updatedAt: s._updatedAt || new Date().toISOString(),
        }))
      }
    }
  } catch (err) {
    // Sanity query failed or offline, fall back to SQLite
  }

  try {
    const stmt = db.prepare('SELECT * FROM services ORDER BY sortOrder ASC')
    const rows = stmt.all() as any[]
    if (rows && rows.length > 0) {
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        status: row.status,
        sortOrder: row.sortOrder,
        template: row.template || (row.capabilities ? 'category' : 'subservice'),
        eyebrow: row.eyebrow,
        heroHeading: row.heroHeading,
        heroDescription: row.heroDescription,
        heroCtaText: row.heroCtaText,
        heroCtaLink: row.heroCtaLink || '/contact',
        heroBannerImage: row.heroBannerImage || '',
        heroBannerImageAlt: row.heroBannerImageAlt || row.name,
        capabilitiesEyebrow: row.capabilitiesEyebrow,
        capabilitiesHeading: row.capabilitiesHeading,
        capabilitiesCtaText: row.capabilitiesCtaText,
        capabilitiesCtaLink: row.capabilitiesCtaLink,
        capabilitiesTitle: row.capabilitiesTitle,
        capabilities: row.capabilities ? JSON.parse(row.capabilities) : [],
        marqueeText: row.marqueeText,
        visionEyebrow: row.visionEyebrow,
        visionHeading: row.visionHeading,
        visionDescription: row.visionDescription,
        visionCtaText: row.visionCtaText,
        visionCtaLink: row.visionCtaLink,
        visionImage: row.visionImage || '',
        visionImageAlt: row.visionImageAlt || row.name,
        introHeading: row.introHeading,
        introContent: row.introContent,
        featuredImage: row.featuredImage || '',
        features: JSON.parse(row.features || '[]'),
        metrics: JSON.parse(row.metrics || '[]'),
        seo: JSON.parse(row.seo || '{}'),
        updatedAt: row.updatedAt,
      }))
    }
  } catch (err) {
    console.error('getCmsServices DB error', err)
  }

  // Fallback to static bundled services.json
  try {
    const bundled = (await import('@/data/cms/services.json')).default as ServiceRecord[]
    if (Array.isArray(bundled) && bundled.length > 0) {
      return bundled
    }
  } catch {
    // ignore
  }

  return []
}

export async function getCmsServiceBySlug(slug: string): Promise<ServiceRecord | null> {
  const cleanSlug = slug.replace(/^\/services\//, '').replace(/^\//, '')

  // 1. Sanity
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { SERVICE_BY_SLUG_QUERY } = await import('@/sanity/lib/queries')
      const s = await client.fetch(SERVICE_BY_SLUG_QUERY, { slug: cleanSlug })
      if (s && s.name) {
        return {
          id: s._id || s.id || `srv-${s.slug}`,
          name: s.name,
          slug: s.slug,
          status: s.status || 'published',
          sortOrder: s.sortOrder || 1,
          template: s.template || (s.capabilities?.length ? 'category' : 'subservice'),
          eyebrow: s.eyebrow || '',
          parentService: s.parentService || '',
          heroHeading: s.heroHeading || '',
          heroDescription: s.heroDescription || '',
          heroCtaText: s.heroCtaText || 'Start a project',
          heroCtaLink: s.heroCtaLink || '/contact',
          heroBannerImage: s.heroBannerImage || '',
          heroBannerImageAlt: s.heroBannerImageAlt || s.name,
          capabilitiesEyebrow: s.capabilitiesEyebrow || s.eyebrow || s.name,
          capabilitiesHeading: s.capabilitiesHeading || '',
          capabilitiesCtaText: s.capabilitiesCtaText || 'About KR Tasker',
          capabilitiesCtaLink: s.capabilitiesCtaLink || '/about',
          capabilitiesTitle: s.capabilitiesTitle || 'Our Company Capabilities',
          capabilities: s.capabilities || [],
          marqueeText: s.marqueeText || "Let's Work Together.",
          visionEyebrow: s.visionEyebrow || 'We approach every project with a clear vision.',
          visionHeading: s.visionHeading || '',
          visionDescription: s.visionDescription || '',
          visionCtaText: s.visionCtaText || 'Start a project Today',
          visionCtaLink: s.visionCtaLink || '/contact',
          visionImage: s.visionImage || '',
          visionImageAlt: s.visionImageAlt || s.name,
          introHeading: s.introHeading || '',
          introContent: s.introContent || '',
          featuredImage: s.featuredImage || '',
          features: s.features || [],
          metrics: s.metrics || [],
          seo: s.seo || {
            metaTitle: s.name,
            metaDescription: s.heroDescription,
            h1: s.name,
            focusKeyword: s.name,
            indexStatus: 'index',
            followStatus: 'follow',
          },
          updatedAt: s._updatedAt || new Date().toISOString(),
        }
      }
    }
  } catch (err) {
    console.warn('Sanity getCmsServiceBySlug error, falling back:', err)
  }

  // 2. Local DB / Fallback
  const allServices = await getCmsServices()
  return allServices.find((s) => s.slug === cleanSlug || s.slug === `/services/${cleanSlug}` || s.id === cleanSlug) || null
}

export async function saveCmsServices(services: ServiceRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM services')
  const insertStmt = db.prepare(`
    INSERT INTO services (id, name, slug, status, sortOrder, eyebrow, heroHeading, heroDescription, heroCtaText, introHeading, introContent, featuredImage, features, metrics, seo, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const s of services) {
      insertStmt.run(
        s.id,
        s.name,
        s.slug,
        s.status,
        s.sortOrder || 1,
        s.eyebrow || '',
        s.heroHeading,
        s.heroDescription,
        s.heroCtaText || '',
        s.introHeading || '',
        s.introContent || '',
        s.featuredImage || '',
        JSON.stringify(s.features || []),
        JSON.stringify(s.metrics || []),
        JSON.stringify(s.seo || {}),
        s.updatedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 3. WORK
export async function getCmsWork(): Promise<CaseStudyRecord[]> {
  let fallback: CaseStudyRecord[] = []
  try {
    const bundled = (await import('@/data/cms/work.json')).default as CaseStudyRecord[]
    if (Array.isArray(bundled) && bundled.length > 0) {
      fallback = bundled
    }
  } catch {
    // ignore
  }

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { WORK_QUERY } = await import('@/sanity/lib/queries')
      const sanityData = await client.fetch(WORK_QUERY)
      if (Array.isArray(sanityData) && sanityData.length > 0) {
        const sanityList = sanityData
          .filter((w: any) => w && w.slug && w.slug !== 'enterprise-fleet-portal')
          .map((w: any) => ({
            id: w._id || w.id || `work-${w.slug}`,
            client: w.client || '',
            title: w.title,
            slug: w.slug,
            year: w.year || '2026',
            category: w.category || 'Case Study',
            featuredImage: typeof w.featuredImage === 'string' ? w.featuredImage : (w.featuredImage?.asset?.url || ''),
            featuredImageAlt: w.featuredImageAlt || w.title,
            shortDescription: w.shortDescription || '',
            status: w.status || 'published',
            sortOrder: w.sortOrder || 1,
            overview: w.overview || '',
            challenge: w.challenge || '',
            solution: w.solution || '',
            results: w.results || '',
            metrics: w.metrics || [],
            seo: w.seo || {
              metaTitle: w.title,
              metaDescription: w.shortDescription,
              h1: w.title,
              focusKeyword: w.title,
              indexStatus: 'index',
              followStatus: 'follow',
            },
            updatedAt: w._updatedAt || new Date().toISOString(),
          }))

        // Merge: Sanity documents override or add to the full 10 case studies
        const sanitySlugs = new Set(sanityList.map((s) => s.slug))
        const missingFromSanity = fallback.filter((f) => !sanitySlugs.has(f.slug) && !sanitySlugs.has(f.id))
        const combined = [...sanityList, ...missingFromSanity]
        return combined.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      }
    }
  } catch (err) {
    // Sanity query fallback
  }

  try {
    const stmt = db.prepare('SELECT * FROM work ORDER BY sortOrder ASC')
    const rows = stmt.all() as any[]
    if (rows && rows.length > 0) {
      return rows.map((row) => ({
        id: row.id,
        client: row.client,
        title: row.title,
        slug: row.slug,
        year: row.year,
        category: row.category,
        featuredImage: row.featuredImage,
        featuredImageAlt: row.featuredImageAlt,
        shortDescription: row.shortDescription,
        status: row.status,
        sortOrder: row.sortOrder,
        overview: row.overview,
        challenge: row.challenge,
        solution: row.solution,
        results: row.results,
        metrics: JSON.parse(row.metrics || '[]'),
        seo: JSON.parse(row.seo || '{}'),
        updatedAt: row.updatedAt,
      }))
    }
  } catch (err) {
    console.error('getCmsWork DB error', err)
  }

  return fallback
}

export async function getCmsWorkBySlug(slug: string): Promise<CaseStudyRecord | null> {
  const cleanSlug = slug.replace(/^\/work\//, '').replace(/^\//, '')

  // 1. Sanity
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { CASE_STUDY_BY_SLUG_QUERY } = await import('@/sanity/lib/queries')
      const w = await client.fetch(CASE_STUDY_BY_SLUG_QUERY, { slug: cleanSlug })
      if (w && w.title) {
        return {
          id: w._id || w.id || `work-${w.slug}`,
          client: w.client || '',
          title: w.title,
          slug: w.slug,
          year: w.year || '2026',
          category: w.category || 'Case Study',
          featuredImage: typeof w.featuredImage === 'string' ? w.featuredImage : '',
          featuredImageAlt: w.featuredImageAlt || w.title,
          shortDescription: w.shortDescription || '',
          status: w.status || 'published',
          sortOrder: w.sortOrder || 1,
          overview: w.overview || '',
          challenge: w.challenge || '',
          solution: w.solution || '',
          results: w.results || '',
          metrics: w.metrics || [],
          seo: w.seo || {
            metaTitle: w.title,
            metaDescription: w.shortDescription,
            h1: w.title,
            focusKeyword: w.title,
            indexStatus: 'index',
            followStatus: 'follow',
          },
          updatedAt: w._updatedAt || new Date().toISOString(),
        }
      }
    }
  } catch (err) {
    console.warn('Sanity getCmsWorkBySlug error, falling back:', err)
  }

  // 2. Local DB / Bundled Fallback
  const allWork = await getCmsWork()
  return allWork.find((w) => w.slug === cleanSlug || w.slug === `/work/${cleanSlug}` || w.id === cleanSlug) || null
}

export async function saveCmsWork(work: CaseStudyRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM work')
  const insertStmt = db.prepare(`
    INSERT INTO work (id, client, title, slug, year, category, featuredImage, featuredImageAlt, shortDescription, status, sortOrder, overview, challenge, solution, results, metrics, seo, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const w of work) {
      insertStmt.run(
        w.id,
        w.client,
        w.title,
        w.slug,
        w.year,
        w.category,
        w.featuredImage || '',
        w.featuredImageAlt || '',
        w.shortDescription,
        w.status,
        w.sortOrder || 1,
        w.overview || '',
        w.challenge || '',
        w.solution || '',
        w.results || '',
        JSON.stringify(w.metrics || []),
        JSON.stringify(w.seo),
        w.updatedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 4. BLOGS
export async function getCmsBlogs(): Promise<BlogPostRecord[]> {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { POSTS_QUERY } = await import('@/sanity/lib/queries')
      const sanityData = await client.fetch(POSTS_QUERY)
      if (Array.isArray(sanityData) && sanityData.length > 0) {
        return sanityData.map((b: any) => ({
          id: b._id || b.id || `blog-${b.slug}`,
          slug: b.slug,
          title: b.title,
          category: b.category || 'Engineering',
          authorName: b.authorName || 'KR Tasker Editorial',
          authorRole: b.authorRole || 'Digital Lead',
          authorImage: b.authorImage || '',
          status: b.status || 'published',
          publishDate: b.publishDate || new Date().toISOString().split('T')[0],
          excerpt: b.excerpt || '',
          readingTime: b.readingTime || '5 min read',
          featuredImage: typeof b.featuredImage === 'string' ? b.featuredImage : '/images/services-grid/seo.png',
          featuredImageAlt: b.featuredImageAlt || b.title,
          content: typeof b.content === 'string' ? b.content : '',
          tags: b.tags || [],
          seo: b.seo || {
            metaTitle: b.title,
            metaDescription: b.excerpt,
            h1: b.title,
            focusKeyword: b.category,
            indexStatus: 'index',
            followStatus: 'follow',
          },
          updatedAt: b._updatedAt || new Date().toISOString(),
        }))
      }
    }
  } catch (err) {
    // Sanity query fallback
  }

  try {
    const stmt = db.prepare('SELECT * FROM blogs ORDER BY publishDate DESC')
    const rows = stmt.all() as any[]
    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      category: row.category,
      authorName: row.authorName,
      authorRole: row.authorRole,
      authorImage: row.authorImage,
      status: row.status,
      publishDate: row.publishDate,
      excerpt: row.excerpt,
      readingTime: row.readingTime,
      featuredImage: row.featuredImage,
      featuredImageAlt: row.featuredImageAlt,
      content: row.content,
      tags: JSON.parse(row.tags),
      seo: JSON.parse(row.seo),
      updatedAt: row.updatedAt,
    }))
  } catch (err) {
    console.error('getCmsBlogs DB error', err)
    return []
  }
}

export async function getCmsBlogBySlug(slug: string): Promise<BlogPostRecord | null> {
  const cleanSlug = slug.replace(/^\/blog\//, '').replace(/^\//, '')

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { POST_BY_SLUG_QUERY } = await import('@/sanity/lib/queries')
      const b = await client.fetch(POST_BY_SLUG_QUERY, { slug: cleanSlug })
      if (b && b.title) {
        return {
          id: b._id || b.id || `blog-${b.slug}`,
          slug: b.slug,
          title: b.title,
          category: b.category || 'Engineering',
          authorName: b.authorName || 'KR Tasker Editorial',
          authorRole: b.authorRole || 'Digital Lead',
          authorImage: b.authorImage || '',
          status: b.status || 'published',
          publishDate: b.publishDate || new Date().toISOString().split('T')[0],
          excerpt: b.excerpt || '',
          readingTime: b.readingTime || '5 min read',
          featuredImage: typeof b.featuredImage === 'string' ? b.featuredImage : '/images/services-grid/seo.png',
          featuredImageAlt: b.featuredImageAlt || b.title,
          content: typeof b.content === 'string' ? b.content : '',
          tags: b.tags || [],
          seo: b.seo || {
            metaTitle: b.title,
            metaDescription: b.excerpt,
            h1: b.title,
            focusKeyword: b.category,
            indexStatus: 'index',
            followStatus: 'follow',
          },
          updatedAt: b._updatedAt || new Date().toISOString(),
        }
      }
    }
  } catch (err) {
    console.warn('Sanity getCmsBlogBySlug error, falling back:', err)
  }

  const allBlogs = await getCmsBlogs()
  return allBlogs.find((b) => b.slug === cleanSlug || b.slug === `/blog/${cleanSlug}` || b.id === cleanSlug) || null
}

export async function saveCmsBlogs(blogs: BlogPostRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM blogs')
  const insertStmt = db.prepare(`
    INSERT INTO blogs (id, slug, title, category, authorName, authorRole, authorImage, status, publishDate, excerpt, readingTime, featuredImage, featuredImageAlt, content, tags, seo, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const b of blogs) {
      insertStmt.run(
        b.id,
        b.slug,
        b.title,
        b.category,
        b.authorName,
        b.authorRole,
        b.authorImage || '',
        b.status,
        b.publishDate,
        b.excerpt,
        b.readingTime,
        b.featuredImage,
        b.featuredImageAlt,
        typeof b.content === 'string' ? b.content : JSON.stringify(b.content),
        JSON.stringify(b.tags || []),
        JSON.stringify(b.seo),
        b.updatedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 5. TEAM
export async function getCmsTeam(): Promise<TeamMemberRecord[]> {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { TEAM_QUERY } = await import('@/sanity/lib/queries')
      const sanityData = await client.fetch(TEAM_QUERY)
      if (Array.isArray(sanityData) && sanityData.length > 0) {
        return sanityData.map((t: any) => ({
          id: t._id || t.id || `team-${t.name}`,
          name: t.name,
          role: t.role,
          photo: t.photo || '',
          photoAlt: t.photoAlt || t.name,
          shortBio: t.shortBio || '',
          linkedinUrl: t.linkedinUrl || '',
          twitterUrl: t.twitterUrl || '',
          sortOrder: t.sortOrder || 1,
          status: t.status || 'published',
          updatedAt: t._updatedAt || new Date().toISOString(),
        }))
      }
    }
  } catch (err) {
    console.warn('getCmsTeam Sanity fetch error:', err)
  }

  try {
    const stmt = db.prepare('SELECT * FROM team ORDER BY sortOrder ASC')
    const rows = stmt.all() as any[]
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      photo: row.photo,
      photoAlt: row.photoAlt,
      shortBio: row.shortBio,
      linkedinUrl: row.linkedinUrl,
      twitterUrl: row.twitterUrl,
      sortOrder: row.sortOrder,
      status: row.status,
      updatedAt: row.updatedAt,
    }))
  } catch (err) {
    console.error('getCmsTeam DB error', err)
    return []
  }
}

export async function saveCmsTeam(team: TeamMemberRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM team')
  const insertStmt = db.prepare(`
    INSERT INTO team (id, name, role, photo, photoAlt, shortBio, linkedinUrl, twitterUrl, sortOrder, status, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const t of team) {
      insertStmt.run(
        t.id,
        t.name,
        t.role,
        t.photo,
        t.photoAlt,
        t.shortBio,
        t.linkedinUrl || '',
        t.twitterUrl || '',
        t.sortOrder || 1,
        t.status,
        t.updatedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 6. ENQUIRIES
export async function getCmsEnquiries(): Promise<ContactEnquiryRecord[]> {
  try {
    const stmt = db.prepare('SELECT * FROM enquiries ORDER BY createdAt DESC')
    const rows = stmt.all() as any[]
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      service: row.service,
      budget: row.budget,
      message: row.message,
      status: row.status,
      createdAt: row.createdAt,
    }))
  } catch (err) {
    console.error('getCmsEnquiries DB error', err)
    return []
  }
}

export async function saveCmsEnquiries(enquiries: ContactEnquiryRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM enquiries')
  const insertStmt = db.prepare(`
    INSERT INTO enquiries (id, name, email, phone, service, budget, message, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const e of enquiries) {
      insertStmt.run(
        e.id,
        e.name,
        e.email,
        e.phone || '',
        e.service || '',
        e.budget || '',
        e.message,
        e.status,
        e.createdAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 7. MEDIA
export async function getCmsMedia(): Promise<MediaItemRecord[]> {
  try {
    const stmt = db.prepare('SELECT * FROM media ORDER BY uploadedAt DESC')
    const rows = stmt.all() as any[]
    return rows.map((row) => ({
      id: row.id,
      url: row.url,
      filename: row.filename,
      mimeType: row.mimeType,
      sizeBytes: row.sizeBytes,
      altText: row.altText,
      title: row.title,
      uploadedAt: row.uploadedAt,
    }))
  } catch (err) {
    console.error('getCmsMedia DB error', err)
    return []
  }
}

export async function saveCmsMedia(media: MediaItemRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM media')
  const insertStmt = db.prepare(`
    INSERT INTO media (id, url, filename, mimeType, sizeBytes, altText, title, uploadedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const m of media) {
      insertStmt.run(
        m.id,
        m.url,
        m.filename,
        m.mimeType,
        m.sizeBytes || 0,
        m.altText,
        m.title || '',
        m.uploadedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 8. REDIRECTS
export async function getCmsRedirects(): Promise<RedirectRecord[]> {
  try {
    const stmt = db.prepare('SELECT * FROM redirects ORDER BY updatedAt DESC')
    const rows = stmt.all() as any[]
    return rows.map((row) => ({
      id: row.id,
      sourcePath: row.sourcePath,
      destination: row.destination,
      statusCode: row.statusCode,
      isActive: Boolean(row.isActive),
      updatedAt: row.updatedAt,
    }))
  } catch (err) {
    console.error('getCmsRedirects DB error', err)
    return []
  }
}

export async function saveCmsRedirects(redirects: RedirectRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM redirects')
  const insertStmt = db.prepare(`
    INSERT INTO redirects (id, sourcePath, destination, statusCode, isActive, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const r of redirects) {
      insertStmt.run(
        r.id,
        r.sourcePath,
        r.destination,
        r.statusCode,
        r.isActive ? 1 : 0,
        r.updatedAt || new Date().toISOString()
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}

// 9. GLOBAL SECTIONS
export async function getCmsGlobal(): Promise<GlobalSectionsRecord> {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { SETTINGS_QUERY } = await import('@/sanity/lib/queries')
      const s = await client.fetch(SETTINGS_QUERY)
      if (s) {
        return {
          ctaHeading: s.ctaHeading || DEFAULT_GLOBAL.ctaHeading,
          ctaDescription: s.ctaDescription || DEFAULT_GLOBAL.ctaDescription,
          ctaButtonText: s.ctaButtonText || DEFAULT_GLOBAL.ctaButtonText,
          ctaButtonLink: s.ctaButtonLink || DEFAULT_GLOBAL.ctaButtonLink,
          footerPhone: s.footerPhone || DEFAULT_GLOBAL.footerPhone,
          footerEmail: s.footerEmail || DEFAULT_GLOBAL.footerEmail,
          footerAddress: s.footerAddress || DEFAULT_GLOBAL.footerAddress,
          footerCopyright: s.footerCopyright || DEFAULT_GLOBAL.footerCopyright,
          socialLinkedin: s.socialLinkedin || DEFAULT_GLOBAL.socialLinkedin,
          socialInstagram: s.socialInstagram || DEFAULT_GLOBAL.socialInstagram,
          socialFacebook: DEFAULT_GLOBAL.socialFacebook,
        }
      }
    }
  } catch (err) {
    console.warn('getCmsGlobal Sanity fetch error:', err)
  }

  try {
    const stmt = db.prepare('SELECT data FROM global_sections WHERE id = "main"')
    const row = stmt.get() as any
    if (row && row.data) return JSON.parse(row.data)
  } catch (err) {
    console.error('getCmsGlobal DB error', err)
  }
  return DEFAULT_GLOBAL
}

export async function saveCmsGlobal(globalData: GlobalSectionsRecord): Promise<void> {
  const stmt = db.prepare('INSERT OR REPLACE INTO global_sections (id, data) VALUES ("main", ?)')
  stmt.run(JSON.stringify(globalData))
}

// 10. SEO SETTINGS
export async function getCmsSeo(): Promise<SEOSettingsRecord> {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { SETTINGS_QUERY } = await import('@/sanity/lib/queries')
      const s = await client.fetch(SETTINGS_QUERY)
      if (s) {
        return {
          siteName: s.siteName || DEFAULT_SEO.siteName,
          defaultTitleTemplate: s.defaultTitleTemplate || DEFAULT_SEO.defaultTitleTemplate,
          defaultMetaDescription: s.defaultMetaDescription || DEFAULT_SEO.defaultMetaDescription,
          defaultOgImage: DEFAULT_SEO.defaultOgImage,
          robotsTxtContent: DEFAULT_SEO.robotsTxtContent,
          sitemapEnabled: true,
        }
      }
    }
  } catch (err) {
    console.warn('getCmsSeo Sanity fetch error:', err)
  }

  try {
    const stmt = db.prepare('SELECT data FROM seo_settings WHERE id = "main"')
    const row = stmt.get() as any
    if (row && row.data) return JSON.parse(row.data)
  } catch (err) {
    console.error('getCmsSeo DB error', err)
  }
  return DEFAULT_SEO
}

export async function saveCmsSeo(seoData: SEOSettingsRecord): Promise<void> {
  const stmt = db.prepare('INSERT OR REPLACE INTO seo_settings (id, data) VALUES ("main", ?)')
  stmt.run(JSON.stringify(seoData))
}

// 11. NAVIGATION MENU
export async function getCmsNavigation(): Promise<NavItemRecord[]> {
  let bundledNav: NavItemRecord[] = []
  try {
    bundledNav = ((await import('@/data/cms/navigation.json')).default as NavItemRecord[]) || []
  } catch {
    // fallback
  }

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { client } = await import('@/sanity/lib/client')
      const { NAVIGATION_QUERY } = await import('@/sanity/lib/queries')
      const sanityData = await client.fetch(NAVIGATION_QUERY)
      if (Array.isArray(sanityData) && sanityData.length > 0) {
        return sanityData.map((n: any) => {
          const id = n._id || n.id || `nav-${n.label.toLowerCase()}`
          const isServices = id === 'nav-services' || (n.label || '').toLowerCase() === 'services'
          const bundledItem = bundledNav.find(
            (b) => b.id === id || (b.label || '').toLowerCase() === (n.label || '').toLowerCase()
          )

          // If Services in Sanity cloud dataset only has legacy items or fewer than 7 categories,
          // prioritize the complete 7-service dropdown with sub-services from bundled navigation.json.
          const hasRichSubServices =
            Array.isArray(n.dropdownItems) &&
            n.dropdownItems.length >= 7 &&
            n.dropdownItems.some((item: any) => (item.id === 'marketing' || (item.title || '').toLowerCase().includes('marketing'))) &&
            n.dropdownItems.some((item: any) => Array.isArray(item.subServices) && item.subServices.length > 0)

          const dropdownItems =
            isServices && !hasRichSubServices
              ? (bundledItem?.dropdownItems || n.dropdownItems || [])
              : (n.dropdownItems || bundledItem?.dropdownItems || [])

          return {
            id,
            label: n.label,
            href: n.href,
            menuType: n.menuType || (dropdownItems.length ? 'dropdown' : 'link'),
            dropdownItems,
            featuredCard: n.featuredCard || bundledItem?.featuredCard || undefined,
            isExternal: n.href?.startsWith('http') || false,
            isOpenInNewTab: false,
            sortOrder: n.sortOrder || 1,
            isVisible: n.isVisible !== false,
          }
        })
      }
    }
  } catch (err) {
    console.warn('getCmsNavigation Sanity fetch error:', err)
  }

  try {
    const bundledNav = (await import('@/data/cms/navigation.json')).default as NavItemRecord[]
    if (Array.isArray(bundledNav) && bundledNav.length > 0) {
      return bundledNav
    }
  } catch {
    // fallback
  }

  return DEFAULT_NAV
}

export async function saveCmsNavigation(items: NavItemRecord[]): Promise<void> {
  const deleteStmt = db.prepare('DELETE FROM navigation')
  const insertStmt = db.prepare(`
    INSERT INTO navigation (id, label, href, isExternal, isOpenInNewTab, sortOrder, isVisible)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN TRANSACTION')
  try {
    deleteStmt.run()
    for (const nav of items) {
      insertStmt.run(
        nav.id,
        nav.label,
        nav.href,
        nav.isExternal ? 1 : 0,
        nav.isOpenInNewTab ? 1 : 0,
        nav.sortOrder || 1,
        nav.isVisible ? 1 : 0
      )
    }
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
}
