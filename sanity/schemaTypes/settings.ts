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
      name: 'footerHeading',
      title: 'Footer Big Heading (e.g. Digital Growth,)',
      type: 'string',
      initialValue: 'Digital Growth,',
    }),
    defineField({
      name: 'footerHeadingHighlight',
      title: 'Footer Heading Highlighted Text (e.g. Delivered.)',
      type: 'string',
      initialValue: 'Delivered.',
    }),
    defineField({
      name: 'footerPhone',
      title: 'Footer Phone Number',
      type: 'string',
      initialValue: '+44 191 348 3900',
    }),
    defineField({
      name: 'footerEmail',
      title: 'Footer Email Address',
      type: 'string',
      initialValue: 'info@krtaskerdigital.co.uk',
    }),
    defineField({
      name: 'footerAddress',
      title: 'Footer Office Address',
      type: 'text',
      rows: 2,
      initialValue: 'Office # 7, Tynegate Precinct, Gateshead NE8 3HU',
    }),
    defineField({
      name: 'footerHours',
      title: 'Footer Working Hours / Time',
      type: 'text',
      rows: 2,
      initialValue: '24/7 Service\nMonday - Sunday',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Footer Copyright Notice',
      type: 'string',
      initialValue: '© 2026 KR Tasker Digital. All Rights Reserved.',
    }),
    defineField({
      name: 'footerCtaText',
      title: 'Footer CTA Button Text',
      type: 'string',
      initialValue: 'Start A Project',
    }),
    defineField({
      name: 'footerCtaLink',
      title: 'Footer CTA Button Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'newsletterTitle',
      title: 'Footer Newsletter Title',
      type: 'string',
      initialValue: 'Newsletter',
    }),
    defineField({
      name: 'newsletterDesc',
      title: 'Footer Newsletter Description',
      type: 'text',
      rows: 2,
      initialValue: 'Stay up to date with the latest digital marketing insights, tips, and news.',
    }),
    defineField({
      name: 'socialFacebook',
      title: 'Facebook URL',
      type: 'url',
      initialValue: 'https://www.facebook.com/profile.php?id=61571387696002',
    }),
    defineField({
      name: 'socialLinkedin',
      title: 'LinkedIn URL',
      type: 'url',
      initialValue: 'https://www.linkedin.com/company/kr-tasker-digital/',
    }),
    defineField({
      name: 'socialTwitter',
      title: 'Twitter / X URL',
      type: 'url',
    }),
    defineField({
      name: 'socialInstagram',
      title: 'Instagram URL',
      type: 'url',
      initialValue: 'https://www.instagram.com/krtaskerdigital/',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Navigation Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Column Title (e.g. Services, Company, Legal)',
              type: 'string',
              validation: (r) => r.required(),
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Link Label', type: 'string', validation: (r) => r.required() },
                    { name: 'href', title: 'Link URL', type: 'string', validation: (r) => r.required() },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
    },
  },
})
