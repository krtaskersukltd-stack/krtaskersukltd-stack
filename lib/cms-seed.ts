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

  // Seed All 16 Core Services
  const existingServices = await getCmsServices()
  const defaultServices: ServiceRecord[] = [
    {
      id: 'srv-digital-360',
      name: 'Digital 360',
      slug: 'digital-360',
      status: 'published',
      sortOrder: 1,
      eyebrow: 'SOLUTIONS',
      heroHeading: 'End-to-End Digital Transformation',
      heroDescription: '360-degree digital strategy, web design, and growth engineering for ambitious brands.',
      heroCtaText: 'Get Started',
      features: [{ id: 'f-d360-1', title: 'Complete Digital Audit', description: 'Comprehensive review of web presence, search rankings, and conversion funnels.', sortOrder: 1 }],
      metrics: [{ value: '360°', label: 'Coverage' }],
      seo: { metaTitle: 'Digital 360 Services | KR Tasker Digital', metaDescription: 'End-to-end digital transformation and strategy.', h1: 'Digital 360 Solutions', focusKeyword: 'Digital 360', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv-business-consultancy',
      name: 'Business Consultancy',
      slug: 'business-consultancy',
      status: 'published',
      sortOrder: 2,
      eyebrow: 'CONSULTING',
      heroHeading: 'Strategic Growth & Business Transformation',
      heroDescription: 'Expert business consultancy helping enterprises innovate, streamline operations, and scale.',
      heroCtaText: 'Book Consultation',
      features: [{ id: 'f-bc-1', title: 'Strategic Roadmap', description: 'Tailored growth planning and operational optimization.', sortOrder: 1 }],
      metrics: [{ value: '10x', label: 'ROI Potential' }],
      seo: { metaTitle: 'Business Consultancy | KR Tasker Digital', metaDescription: 'Strategic growth and digital transformation consultancy.', h1: 'Business Consultancy', focusKeyword: 'Business Consultancy', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv-web-dev',
      name: 'Web Engineering & CMS Solutions',
      slug: 'web-development',
      status: 'published',
      sortOrder: 3,
      eyebrow: 'ENGINEERING',
      heroHeading: 'Custom Next.js & Headless Architecture',
      heroDescription: 'Ultra-fast, SEO-optimized web applications built on Next.js and custom headless CMS engines.',
      heroCtaText: 'Discuss Web Project',
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
      id: 'srv-shopify',
      name: 'Shopify Development & E-Commerce',
      slug: 'shopify-development',
      status: 'published',
      sortOrder: 4,
      eyebrow: 'E-COMMERCE',
      heroHeading: 'High-Converting Headless & Liquid Stores',
      heroDescription: 'Custom Shopify theme design, app development, and conversion-focused e-commerce storefronts.',
      heroCtaText: 'Build Shopify Store',
      features: [{ id: 'f-shop-1', title: 'Custom Shopify Themes', description: 'Pixel-perfect custom storefronts tailored for conversion.', sortOrder: 1 }],
      metrics: [{ value: '+45%', label: 'Checkout Conversion' }],
      seo: { metaTitle: 'Shopify Development Services | KR Tasker Digital', metaDescription: 'Custom Shopify storefront development and e-commerce growth.', h1: 'Shopify Development', focusKeyword: 'Shopify Development', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv-seo',
      name: 'SEO & Organic Growth Engine',
      slug: 'seo',
      status: 'published',
      sortOrder: 5,
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
    {
      id: 'srv-graphic-design',
      name: 'Graphic & UI/UX Design',
      slug: 'graphic-design',
      status: 'published',
      sortOrder: 6,
      eyebrow: 'DESIGN',
      heroHeading: 'Stunning Visual Identity & Design Systems',
      heroDescription: 'Creative graphic design, UI/UX prototyping, brand assets, and digital design systems.',
      heroCtaText: 'View Portfolio',
      features: [{ id: 'f-gd-1', title: 'UI/UX Design', description: 'Modern, user-centric interfaces built for maximum engagement.', sortOrder: 1 }],
      metrics: [{ value: '100%', label: 'Custom Aesthetics' }],
      seo: { metaTitle: 'Graphic & UI/UX Design | KR Tasker Digital', metaDescription: 'Creative graphic design, brand identity, and UI/UX design systems.', h1: 'Graphic & UI/UX Design', focusKeyword: 'Graphic Design', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv-marketing',
      name: 'Performance Marketing & Growth',
      slug: 'marketing',
      status: 'published',
      sortOrder: 7,
      eyebrow: 'MARKETING',
      heroHeading: 'Data-Driven Campaign Management & ROI',
      heroDescription: 'Multi-channel marketing strategies focused on audience acquisition, engagement, and revenue growth.',
      heroCtaText: 'Launch Campaign',
      features: [{ id: 'f-m-1', title: 'Growth Strategy', description: 'Targeted campaigns engineered for measurable business ROI.', sortOrder: 1 }],
      metrics: [{ value: '3.5x', label: 'Average ROAS' }],
      seo: { metaTitle: 'Performance Marketing Services | KR Tasker Digital', metaDescription: 'Data-driven marketing and growth strategies.', h1: 'Performance Marketing', focusKeyword: 'Digital Marketing', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv-social-media',
      name: 'Social Media Management & Strategy',
      slug: 'social-media',
      status: 'published',
      sortOrder: 8,
      eyebrow: 'SOCIAL',
      heroHeading: 'Engaging Content & Audience Building',
      heroDescription: 'Strategic social media management across Meta, LinkedIn, Instagram, and TikTok.',
      heroCtaText: 'Grow Socials',
      features: [{ id: 'f-sm-1', title: 'Content Calendar & Creative', description: 'Regular high-quality post creation and community management.', sortOrder: 1 }],
      metrics: [{ value: '+250%', label: 'Social Engagement' }],
      seo: { metaTitle: 'Social Media Management | KR Tasker Digital', metaDescription: 'Strategic social media content and brand community growth.', h1: 'Social Media Strategy', focusKeyword: 'Social Media Marketing', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv-amazon-ebay',
      name: 'Amazon & eBay Store Optimization',
      slug: 'amazon-ebay',
      status: 'published',
      sortOrder: 9,
      eyebrow: 'MARKETPLACE',
      heroHeading: 'Marketplace Listing & Sales Optimization',
      heroDescription: 'Maximize product visibility, A+ content, and sales velocity on Amazon & eBay marketplaces.',
      heroCtaText: 'Optimize Store',
      features: [{ id: 'f-ae-1', title: 'A+ Content & SEO', description: 'Optimized product descriptions, bullet points, and keyword rankings.', sortOrder: 1 }],
      metrics: [{ value: '+60%', label: 'Marketplace Sales' }],
      seo: { metaTitle: 'Amazon & eBay Store Optimization | KR Tasker Digital', metaDescription: 'Marketplace store management, listing optimization, and sales growth.', h1: 'Amazon & eBay Optimization', focusKeyword: 'Amazon Optimization', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv-email-marketing',
      name: 'Email Marketing & Automation',
      slug: 'email-marketing',
      status: 'published',
      sortOrder: 10,
      eyebrow: 'AUTOMATION',
      heroHeading: 'Automated Retention & Sales Funnels',
      heroDescription: 'High-converting email campaigns, welcome flows, abandoned cart sequences, and Klaviyo/Mailchimp integration.',
      heroCtaText: 'Automate Emails',
      features: [{ id: 'f-em-1', title: 'Automated Lifecycle Flows', description: 'Targeted messaging based on customer purchase behavior.', sortOrder: 1 }],
      metrics: [{ value: '45%', label: 'Average Open Rate' }],
      seo: { metaTitle: 'Email Marketing & Automation | KR Tasker Digital', metaDescription: 'Automated email flows, retention marketing, and customer campaigns.', h1: 'Email Marketing Solutions', focusKeyword: 'Email Marketing', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv-ai-automation',
      name: 'AI Automation & Workflow Integration',
      slug: 'ai-automation',
      status: 'published',
      sortOrder: 11,
      eyebrow: 'AI & AUTOMATION',
      heroHeading: 'Streamline Operations with Custom AI Agents',
      heroDescription: 'Integrate artificial intelligence, automated chatbots, workflow pipelines, and predictive analytics into your business.',
      heroCtaText: 'Automate Workflows',
      features: [{ id: 'f-aia-1', title: 'Custom AI Workflows', description: 'Automate repetitive data tasks and customer interactions with AI.', sortOrder: 1 }],
      metrics: [{ value: '80%', label: 'Time Saved' }],
      seo: { metaTitle: 'AI Automation & Workflow Solutions | KR Tasker Digital', metaDescription: 'Custom AI agents, workflow automation, and process integration.', h1: 'AI Automation & Integration', focusKeyword: 'AI Automation', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv-ai-solutions',
      name: 'Custom AI Solutions',
      slug: 'ai-solutions',
      status: 'published',
      sortOrder: 12,
      eyebrow: 'ARTIFICIAL INTELLIGENCE',
      heroHeading: 'Tailored Machine Learning & LLM Systems',
      heroDescription: 'Bespoke AI model fine-tuning, RAG knowledge bases, and custom enterprise AI integrations.',
      heroCtaText: 'Explore AI Solutions',
      features: [{ id: 'f-ais-1', title: 'Enterprise LLM Apps', description: 'Secure internal search and AI assistants trained on corporate data.', sortOrder: 1 }],
      metrics: [{ value: '99.9%', label: 'AI Model Precision' }],
      seo: { metaTitle: 'Custom AI Solutions | KR Tasker Digital', metaDescription: 'Bespoke LLM systems, AI assistants, and enterprise machine learning.', h1: 'Custom AI Solutions', focusKeyword: 'AI Solutions', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv-branding',
      name: 'Brand Strategy & Identity',
      slug: 'branding',
      status: 'published',
      sortOrder: 13,
      eyebrow: 'IDENTITY',
      heroHeading: 'Distinct Brand Identity & Narrative',
      heroDescription: 'Positioning, logo design, brand guidelines, and tone-of-voice development that commands authority.',
      heroCtaText: 'Build Brand',
      features: [{ id: 'f-br-1', title: 'Brand Guidelines', description: 'Comprehensive visual and verbal style guides for consistent branding.', sortOrder: 1 }],
      metrics: [{ value: '100%', label: 'Brand Recognition' }],
      seo: { metaTitle: 'Brand Strategy & Identity | KR Tasker Digital', metaDescription: 'Bespoke brand strategy, logo design, and identity systems.', h1: 'Brand Strategy & Identity', focusKeyword: 'Brand Identity', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv-digital-marketing',
      name: 'Digital Marketing 360',
      slug: 'digital-marketing',
      status: 'published',
      sortOrder: 14,
      eyebrow: 'GROWTH',
      heroHeading: 'Full-Funnel Digital Marketing Services',
      heroDescription: 'Omnichannel digital marketing, content strategy, PPC management, and search marketing.',
      heroCtaText: 'Grow Revenue',
      features: [{ id: 'f-dm-1', title: 'Omnichannel Strategy', description: 'Synchronized campaigns across search, social, and display networks.', sortOrder: 1 }],
      metrics: [{ value: '3x', label: 'Conversion Lift' }],
      seo: { metaTitle: 'Digital Marketing 360 | KR Tasker Digital', metaDescription: 'Omnichannel digital marketing strategies and performance campaigns.', h1: 'Digital Marketing 360', focusKeyword: 'Digital Marketing Agency', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv-ppc',
      name: 'PPC & Paid Search Management',
      slug: 'ppc',
      status: 'published',
      sortOrder: 15,
      eyebrow: 'PAID MEDIA',
      heroHeading: 'Google Ads & Paid Social Campaigns',
      heroDescription: 'High-ROI paid search, shopping ads, retargeting, and Meta ad campaign management.',
      heroCtaText: 'Launch PPC',
      features: [{ id: 'f-ppc-1', title: 'Google Ads Management', description: 'Conversion-optimized search and shopping campaigns.', sortOrder: 1 }],
      metrics: [{ value: '4.2x', label: 'Average ROAS' }],
      seo: { metaTitle: 'PPC & Paid Search Management | KR Tasker Digital', metaDescription: 'Google Ads, Meta Ads, and paid media management.', h1: 'PPC & Paid Search Management', focusKeyword: 'PPC Management', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'srv-websites-apps',
      name: 'Websites & Custom Applications',
      slug: 'websites-apps',
      status: 'published',
      sortOrder: 16,
      eyebrow: 'DEVELOPMENT',
      heroHeading: 'Custom Web & Mobile App Development',
      heroDescription: 'Tailored web portals, SaaS platforms, and mobile-responsive custom applications.',
      heroCtaText: 'Build Application',
      features: [{ id: 'f-wa-1', title: 'Custom Web Apps', description: 'Scalable Next.js and Node.js custom web software.', sortOrder: 1 }],
      metrics: [{ value: '99.9%', label: 'Uptime Reliability' }],
      seo: { metaTitle: 'Websites & Custom Applications | KR Tasker Digital', metaDescription: 'Custom web application development and SaaS software engineering.', h1: 'Websites & Custom Applications', focusKeyword: 'Custom Web Applications', indexStatus: 'index', followStatus: 'follow' },
      updatedAt: new Date().toISOString(),
    },
  ]

  if (existingServices.length < defaultServices.length) {
    const existingSlugs = new Set(existingServices.map((s) => s.slug))
    const missingServices = defaultServices.filter((s) => !existingSlugs.has(s.slug))
    await saveCmsServices([...existingServices, ...missingServices])
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
