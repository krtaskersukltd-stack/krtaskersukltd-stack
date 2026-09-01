import { defineType, defineField } from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Studies & Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      initialValue: '2026',
    }),
    defineField({
      name: 'category',
      title: 'Project Category',
      type: 'string',
      options: {
        list: [
          { title: 'Websites & Apps', value: 'Websites & Apps' },
          { title: 'Creative & Branding', value: 'Creative & Branding' },
          { title: 'SEO', value: 'SEO' },
          { title: 'PPC & Amazon', value: 'PPC & Amazon' },
          { title: 'Digital 360', value: 'Digital 360' },
          { title: 'Google & Meta Ads', value: 'Google & Meta Ads' },
          { title: 'Web Development & CMS', value: 'Web Development & CMS' },
          { title: 'E-Commerce & Shopify', value: 'E-Commerce & Shopify' },
          { title: 'SEO & Organic Growth', value: 'SEO & Organic Growth' },
          { title: 'AI & Workflow Automation', value: 'AI & Workflow Automation' },
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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'results',
      title: 'Results Achieved',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value (e.g. +240%)', type: 'string' },
            { name: 'label', title: 'Metric Label', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'featuredImage',
    },
  },
})
