import { defineType, defineField } from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Site Settings & Global',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'KR Tasker Digital',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Social Share Image (OpenGraph)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'defaultTitleTemplate',
      title: 'Default SEO Title Template',
      type: 'string',
      initialValue: '%s | KR Tasker Digital',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaHeading',
      title: 'Global CTA Heading',
      type: 'string',
      initialValue: 'Ready to elevate your digital presence?',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Global CTA Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Global CTA Button Text',
      type: 'string',
      initialValue: 'Get Started Today',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'Global CTA Button Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'footerPhone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '+44 (0) 20 8123 4567',
    }),
    defineField({
      name: 'footerEmail',
      title: 'Email Address',
      type: 'string',
      initialValue: 'info@krtaskerdigital.com',
    }),
    defineField({
      name: 'footerAddress',
      title: 'Office Address',
      type: 'text',
      rows: 2,
      initialValue: '71-75 Shelton Street, Covent Garden, London, WC2H 9JQ',
    }),
    defineField({
      name: 'socialLinkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'socialTwitter',
      title: 'Twitter URL',
      type: 'url',
    }),
    defineField({
      name: 'socialInstagram',
      title: 'Instagram URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
    },
  },
})
