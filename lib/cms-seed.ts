import {
  getCmsPages,
  saveCmsPages,
  getCmsServices,
  saveCmsServices,
  getCmsWork,
  saveCmsWork,
  getCmsBlogs,
  saveCmsBlogs,
  getCmsTeam,
  saveCmsTeam,
  getCmsEnquiries,
  saveCmsEnquiries,
  getCmsMedia,
  saveCmsMedia,
  getCmsRedirects,
  saveCmsRedirects,
} from './cms-store'
import type {
  PageRecord,
  ServiceRecord,
  CaseStudyRecord,
  BlogPostRecord,
  TeamMemberRecord,
  ContactEnquiryRecord,
  MediaItemRecord,
  RedirectRecord,
} from './cms-types'
import bundledBlogs from '../data/blogs.json'

export async function ensureCmsSeeded() {
  // Seed Pages
  const existingPages = await getCmsPages()
  if (existingPages.length === 0) {
    const defaultPages: PageRecord[] = [
      {
        id: 'page-home',
        routeKey: 'home',
        internalName: 'Homepage',
        publicTitle: 'KR Tasker Digital | Premium Web Agency & Digital CMS',
        slug: '',
        publicUrl: 'https://www.krtaskerdigital.com/',
        isSystemRoute: true,
        status: 'published',
        seo: {
          metaTitle: 'KR Tasker Digital | Premier Web Design & Digital Engineering Agency',
          metaDescription: 'Bespoke web applications, high-converting CMS platforms, and brand strategy by KR Tasker Digital.',
          h1: 'Digital Engineering & Modern Web Architecture',
          focusKeyword: 'web design agency',
          indexStatus: 'index',
          followStatus: 'follow',
        },
        contentKeys: [
          { key: 'home.hero.heading', label: 'Hero Heading', value: 'We build digital products that scale brands', group: 'Hero' },
          { key: 'home.hero.description', label: 'Hero Subtext', value: 'Bespoke web design, CMS engineering, and organic search growth.', group: 'Hero' },
          { key: 'home.about.heading', label: 'About Heading', value: 'Crafting digital experiences with precision & code integrity', group: 'About' },
        ],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'page-services',
        routeKey: 'services',
        internalName: 'Services Overview',
        publicTitle: 'Our Services | KR Tasker Digital',
        slug: 'services',
        publicUrl: 'https://www.krtaskerdigital.com/services',
        isSystemRoute: true,
        status: 'published',
        seo: {
          metaTitle: 'Services & Capabilities | KR Tasker Digital',
          metaDescription: 'Explore our full spectrum of services from Next.js web apps to SEO architecture and brand design.',
          h1: 'Our Core Capabilities',
          focusKeyword: 'digital services',
          indexStatus: 'index',
          followStatus: 'follow',
        },
        contentKeys: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'page-work',
        routeKey: 'work',
        internalName: 'Work / Case Studies',
        publicTitle: 'Our Work | KR Tasker Digital',
        slug: 'work',
        publicUrl: 'https://www.krtaskerdigital.com/work',
        isSystemRoute: true,
        status: 'published',
        seo: {
          metaTitle: 'Selected Case Studies & Work | KR Tasker Digital',
          metaDescription: 'Browse our portfolio of high-impact web design and software engineering projects.',
          h1: 'Featured Client Projects',
          focusKeyword: 'web development case studies',
          indexStatus: 'index',
          followStatus: 'follow',
        },
        contentKeys: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'page-blog',
        routeKey: 'blog',
        internalName: 'Blog & Articles',
        publicTitle: 'Latest Insights & Articles | KR Tasker Digital',
        slug: 'blog',
        publicUrl: 'https://www.krtaskerdigital.com/blog',
        isSystemRoute: true,
        status: 'published',
        seo: {
          metaTitle: 'Digital Agency Blog & Insights | KR Tasker Digital',
          metaDescription: 'Read our latest posts on web engineering, headless CMS, and SEO strategies.',
          h1: 'Insights & Thought Leadership',
          focusKeyword: 'web development blog',
          indexStatus: 'index',
          followStatus: 'follow',
        },
        contentKeys: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'page-contact',
        routeKey: 'contact',
        internalName: 'Contact Us',
        publicTitle: 'Contact Us | KR Tasker Digital',
        slug: 'contact',
        publicUrl: 'https://www.krtaskerdigital.com/contact',
        isSystemRoute: true,
        status: 'published',
        seo: {
          metaTitle: 'Contact Our Team | KR Tasker Digital',
          metaDescription: 'Get in touch to discuss your next web design, CMS, or brand engineering project.',
          h1: 'Let’s Start a Project Together',
          focusKeyword: 'contact web agency',
          indexStatus: 'index',
          followStatus: 'follow',
        },
        contentKeys: [],
        updatedAt: new Date().toISOString(),
      },
    ]
    await saveCmsPages(defaultPages)
  }

  // Seed Services
  const existingServices = await getCmsServices()
  if (existingServices.length === 0) {
    const defaultServices: ServiceRecord[] = [
      {
        id: 'srv-web-dev',
        name: 'Web Engineering & CMS Solutions',
        slug: 'web-development',
        status: 'published',
        sortOrder: 1,
        eyebrow: 'ENGINEERING',
        heroHeading: 'Custom Next.js & Headless Architecture',
        heroDescription: 'Ultra-fast, SEO-optimized web applications built on Next.js and custom headless CMS engines.',
        heroCtaText: 'Discuss Web Project',
        introHeading: 'Why Headless Architecture Matters',
        introContent: 'We break away from slow monolithic website templates. Our codebases deliver sub-second page loads, pixel-perfect design rendering, and effortless admin management.',
        features: [
          { id: 'f1', title: 'Next.js App Router', description: 'Server-side rendering and static page generation for lightning speed.', sortOrder: 1 },
          { id: 'f2', title: 'Headless CMS Integration', description: 'Flexible content keys and dynamic editorial controls.', sortOrder: 2 },
          { id: 'f3', title: 'Type-Safe APIs', description: 'TypeScript contracts ensuring zero runtime breakages.', sortOrder: 3 },
        ],
        metrics: [
          { value: '99/100', label: 'Lighthouse Performance Score' },
          { value: '<200ms', label: 'Server Response Time' },
        ],
        seo: {
          metaTitle: 'Web Engineering & CMS Development | KR Tasker Digital',
          metaDescription: 'Bespoke Next.js web application development and headless CMS integration.',
          h1: 'Web Engineering & CMS Solutions',
          focusKeyword: 'Next.js development',
          indexStatus: 'index',
          followStatus: 'follow',
        },
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'srv-seo',
        name: 'SEO & Organic Growth Engine',
        slug: 'seo-organic-growth',
        status: 'published',
        sortOrder: 2,
        eyebrow: 'GROWTH',
        heroHeading: 'Technical SEO & Data-Driven Search Authority',
        heroDescription: 'Engineered search presence with dynamic sitemaps, structured schema, canonical controls, and page speed optimization.',
        heroCtaText: 'Start SEO Audit',
        features: [
          { id: 'f4', title: 'Technical SEO Auditing', description: 'Comprehensive crawls identifying indexing, canonical, and link issues.', sortOrder: 1 },
          { id: 'f5', title: 'On-Page Meta Controls', description: 'SERP previews and real-time content health feedback.', sortOrder: 2 },
        ],
        metrics: [
          { value: '+180%', label: 'Average Organic Traffic Growth' },
          { value: '1st Page', label: 'Search Ranking Target' },
        ],
        seo: {
          metaTitle: 'SEO & Technical Search Growth | KR Tasker Digital',
          metaDescription: 'Data-driven technical SEO, meta data management, and structured data execution.',
          h1: 'SEO & Organic Search Engine',
          focusKeyword: 'technical SEO agency',
          indexStatus: 'index',
          followStatus: 'follow',
        },
        updatedAt: new Date().toISOString(),
      },
    ]
    await saveCmsServices(defaultServices)
  }

  // Seed Work / Case Studies
  const existingWork = await getCmsWork()
  if (existingWork.length === 0) {
    const defaultWork: CaseStudyRecord[] = [
      {
        id: 'cs-1',
        client: 'Global Logistics Corp',
        title: 'Enterprise Fleet Portal & Digital Infrastructure',
        slug: 'enterprise-fleet-portal',
        year: '2026',
        category: 'Web Engineering',
        featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        featuredImageAlt: 'Dashboard analytics visualization',
        shortDescription: 'Modernizing legacy administrative systems into a real-time responsive Next.js CMS platform.',
        status: 'published',
        sortOrder: 1,
        overview: 'Rebuilt core customer interaction portal with server-side dynamic rendering.',
        challenge: 'Legacy system was slow, insecure, and un-editable by non-technical marketing teams.',
        solution: 'Built custom admin dashboard with role-based access control and live status syncing.',
        results: 'Reduced page loading latency by 85% and increased administrative editing throughput by 3x.',
        metrics: [
          { value: '+240%', label: 'User Engagement' },
          { value: '0.4s', label: 'Page Load Time' },
        ],
        seo: {
          metaTitle: 'Enterprise Fleet Portal Case Study | KR Tasker Digital',
          metaDescription: 'Case study on enterprise fleet management portal redesign using Next.js and custom CMS.',
          h1: 'Enterprise Fleet Portal Case Study',
          focusKeyword: 'fleet portal case study',
          indexStatus: 'index',
          followStatus: 'follow',
        },
        updatedAt: new Date().toISOString(),
      },
    ]
    await saveCmsWork(defaultWork)
  }

  // Seed Blogs
  const existingBlogs = await getCmsBlogs()
  if (existingBlogs.length === 0) {
    const defaultBlogs: BlogPostRecord[] = (bundledBlogs as any[]).map((b) => ({
      id: String(b.id),
      slug: b.slug,
      title: b.title,
      category: b.category,
      authorName: b.authorName || 'KR Admin',
      authorRole: b.authorRole || 'Content Specialist',
      authorImage: b.authorImage || '',
      status: 'published',
      publishDate: b.date || '2026-07-01',
      excerpt: typeof b.content === 'string' ? b.content.slice(0, 160) : (b.content[0]?.text?.slice(0, 160) || b.title),
      readingTime: b.readTime || '5 Min Read',
      featuredImage: b.imageUrl,
      featuredImageAlt: b.title,
      content: typeof b.content === 'string' ? b.content : JSON.stringify(b.content),
      tags: [b.category, 'Web Architecture', 'Engineering'],
      seo: {
        metaTitle: `${b.title} | KR Tasker Digital Blog`,
        metaDescription: typeof b.content === 'string' ? b.content.slice(0, 150) : (b.content[0]?.text?.slice(0, 150) || b.title),
        h1: b.title,
        focusKeyword: b.category,
        indexStatus: 'index',
        followStatus: 'follow',
      },
      updatedAt: new Date().toISOString(),
    }))
    await saveCmsBlogs(defaultBlogs)
  }

  // Seed Team
  const existingTeam = await getCmsTeam()
  if (existingTeam.length === 0) {
    const defaultTeam: TeamMemberRecord[] = [
      {
        id: 'team-1',
        name: 'Andy Golpys',
        role: 'Co-Founder & Technical Director',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
        photoAlt: 'Andy Golpys',
        shortBio: 'Leading architectural vision and client strategy across web technologies.',
        linkedinUrl: 'https://linkedin.com',
        sortOrder: 1,
        status: 'published',
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'team-2',
        name: 'Kerry Hounslea',
        role: 'Content & Strategy Lead',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
        photoAlt: 'Kerry Hounslea',
        shortBio: 'Specializing in SEO strategy, brand narrative, and enterprise editorial content.',
        linkedinUrl: 'https://linkedin.com',
        sortOrder: 2,
        status: 'published',
        updatedAt: new Date().toISOString(),
      },
    ]
    await saveCmsTeam(defaultTeam)
  }

  // Seed Enquiries
  const existingEnquiries = await getCmsEnquiries()
  if (existingEnquiries.length === 0) {
    const defaultEnquiries: ContactEnquiryRecord[] = [
      {
        id: 'enq-1',
        name: 'Sarah Jenkins',
        email: 'sarah.j@enterprise.co.uk',
        phone: '+44 7700 900077',
        service: 'Web Engineering & CMS Solutions',
        budget: '£10k - £25k',
        message: 'Looking to migrate our company website to a modern Next.js headless CMS architecture.',
        status: 'new',
        createdAt: new Date().toISOString(),
      },
    ]
    await saveCmsEnquiries(defaultEnquiries)
  }

  // Seed Media
  const existingMedia = await getCmsMedia()
  if (existingMedia.length === 0) {
    const defaultMedia: MediaItemRecord[] = [
      {
        id: 'med-1',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        filename: 'analytics-dashboard.jpg',
        mimeType: 'image/jpeg',
        sizeBytes: 245000,
        altText: 'Abstract visualization of enterprise dashboard interface',
        title: 'Enterprise Analytics Dashboard',
        uploadedAt: new Date().toISOString(),
      },
      {
        id: 'med-2',
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
        filename: 'laptop-code-setup.jpg',
        mimeType: 'image/jpeg',
        sizeBytes: 180000,
        altText: 'Modern web development workstation',
        title: 'Development Workstation',
        uploadedAt: new Date().toISOString(),
      },
    ]
    await saveCmsMedia(defaultMedia)
  }

  // Seed Redirects
  const existingRedirects = await getCmsRedirects()
  if (existingRedirects.length === 0) {
    const defaultRedirects: RedirectRecord[] = [
      {
        id: 'red-1',
        sourcePath: '/old-contact-us',
        destination: '/contact',
        statusCode: 301,
        isActive: true,
        updatedAt: new Date().toISOString(),
      },
    ]
    await saveCmsRedirects(defaultRedirects)
  }
}
