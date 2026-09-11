import { defineType, defineField } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Menu Category / Eyebrow',
      type: 'string',
      description: 'Used for grouping in header menu (e.g., Digital Marketing, Websites & Apps, AI & Automation)',
      options: {
        list: [
          { title: 'Digital Marketing', value: 'Digital Marketing' },
          { title: 'Websites & Apps', value: 'Websites & Apps' },
          { title: 'AI & Automation', value: 'AI & Automation' },
        ],
      },
      initialValue: 'Websites & Apps',
    }),
    defineField({
      name: 'parentService',
      title: 'Parent Service / Category',
      type: 'string',
      description: 'The parent service or category displayed as small text under the service name in menus (e.g. Digital Marketing, Websites & Apps, Designing, AI & Automation).',
      options: {
        list: [
          { title: 'Digital Marketing', value: 'Digital Marketing' },
          { title: 'Websites & Apps', value: 'Websites & Apps' },
          { title: 'Designing', value: 'Designing' },
          { title: 'AI & Automation', value: 'AI & Automation' },
          { title: 'Email Marketing', value: 'Email Marketing' },
          { title: 'Social Media', value: 'Social Media' },
          { title: 'Marketplace & Amazon', value: 'Marketplace & Amazon' },
          { title: 'SEO & Growth', value: 'SEO & Growth' },
          { title: 'Business Consultancy', value: 'Business Consultancy' },
          { title: 'Industries', value: 'Industries' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Publish Status',
      type: 'string',
      options: {
        list: [
          { title: 'Published', value: 'published' },
          { title: 'Draft', value: 'draft' },
        ],
        layout: 'radio',
      },
      initialValue: 'published',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'template',
      title: 'Page Template Layout',
      type: 'string',
      description: 'Choose between the Main Service/Industry Hub layout (Figma design with Capabilities list) and the Sub-Service Capability layout (Orbit & Features accordion)',
      options: {
        list: [
          { title: 'Main Category / Industry Hub (Figma Layout)', value: 'category' },
          { title: 'Sub-Service Capability Page (Orbit Layout)', value: 'subservice' },
        ],
        layout: 'radio',
      },
      initialValue: 'category',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description / Right Paragraph',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Button Text',
      type: 'string',
      initialValue: 'Start a project',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Hero CTA Button Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'heroBannerImage',
      title: 'Hero Showcase Banner Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'capabilitiesEyebrow',
      title: 'Capabilities Section Eyebrow Tag',
      type: 'string',
      initialValue: 'Digital Marketing',
    }),
    defineField({
      name: 'capabilitiesHeading',
      title: 'Capabilities Section Main Heading',
      type: 'text',
      rows: 3,
      initialValue: 'Are You A Startup Brand, Well Established Company, In The UK Or Worldwide? It Doesn’t Matter. We Work With A Range Of Clients.',
    }),
    defineField({
      name: 'capabilitiesCtaText',
      title: 'Capabilities Section CTA Button Text',
      type: 'string',
      initialValue: 'About KR Tasker',
    }),
    defineField({
      name: 'capabilitiesCtaLink',
      title: 'Capabilities Section CTA Button Link',
      type: 'string',
      initialValue: '/about',
    }),
    defineField({
      name: 'capabilitiesTitle',
      title: 'Capabilities Section Subtitle',
      type: 'string',
      initialValue: 'Our Company Capabilities',
    }),
    defineField({
      name: 'capabilities',
      title: 'Company Capabilities (Sub-Pages)',
      type: 'array',
      description: 'List of sub-services / sub-pages displayed with arrow links',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Capability / Sub-Service Name', type: 'string', validation: (r) => r.required() },
            { name: 'slug', title: 'Sub-Page Slug / URL (e.g. /services/digital-360 or digital-360)', type: 'string', validation: (r) => r.required() },
            { name: 'description', title: 'Short Description (Optional)', type: 'string' },
            { name: 'badge', title: 'Badge (Optional)', type: 'string' },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'slug',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'marqueeText',
      title: 'Marquee Banner Text',
      type: 'string',
      initialValue: "Let's Work Together.",
    }),
    defineField({
      name: 'visionEyebrow',
      title: 'Vision Split Section Eyebrow Tag',
      type: 'string',
      initialValue: 'We approach every project with a clear vision.',
    }),
    defineField({
      name: 'visionHeading',
      title: 'Vision Split Section Heading',
      type: 'text',
      rows: 3,
      initialValue: "We like to remove the 'waffle' and Impactful marketing, easy to use strategy that are Crucial.",
    }),
    defineField({
      name: 'visionDescription',
      title: 'Vision Split Section Description',
      type: 'text',
      rows: 4,
      initialValue: "We don't just build pretty websites. Here at KR Tasker Digital, we understand all aspects of a successful site, from design through web development and testing, to SEO and Hosting. We tailor our service to the client and the project requirements.",
    }),
    defineField({
      name: 'visionCtaText',
      title: 'Vision Split Section CTA Button Text',
      type: 'string',
      initialValue: 'Start a project Today',
    }),
    defineField({
      name: 'visionCtaLink',
      title: 'Vision Split Section CTA Button Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'visionImage',
      title: 'Vision Split Section Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured / Sub-Service Accordion Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'introHeading',
      title: 'Intro Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'introContent',
      title: 'Intro Content',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'features',
      title: 'Key Features (Sub-Service Accordion)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Feature Description', type: 'text', rows: 2 },
            { name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 1 },
          ],
        },
      ],
    }),
    defineField({
      name: 'metrics',
      title: 'Performance Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value (e.g. +180% or 99/100)', type: 'string' },
            { name: 'label', title: 'Metric Label', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
        { name: 'h1', title: 'H1 Tag', type: 'string' },
        { name: 'focusKeyword', title: 'Focus Keyword', type: 'string' },
        {
          name: 'indexStatus',
          title: 'Search Indexing',
          type: 'string',
          options: {
            list: [
              { title: 'Index (Visible in search)', value: 'index' },
              { title: 'No Index (Hidden from search)', value: 'noindex' },
            ],
          },
          initialValue: 'index',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      parentService: 'parentService',
      eyebrow: 'eyebrow',
      template: 'template',
    },
    prepare({ title, parentService, eyebrow, template }) {
      const typeLabel = template === 'category' ? 'Hub Category' : 'Sub-Service'
      const parentLabel = parentService ? `Parent: ${parentService}` : (eyebrow ? `Category: ${eyebrow}` : typeLabel)
      return {
        title: title || 'Untitled Service',
        subtitle: parentLabel,
      }
    },
  },
})
