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
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured / Hero Image',
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
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Button Text',
      type: 'string',
      initialValue: 'Get Started',
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
      title: 'Key Features',
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
      subtitle: 'eyebrow',
    },
  },
})
