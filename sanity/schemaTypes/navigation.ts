import { defineType, defineField } from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Header Navigation Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Menu Item Label (e.g. Services, Industries, Work)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link URL / Path (e.g. /services, /work, /about)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menuType',
      title: 'Menu Type',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Link', value: 'link' },
          { title: 'Mega Dropdown Menu', value: 'dropdown' },
        ],
        layout: 'radio',
      },
      initialValue: 'link',
    }),
    defineField({
      name: 'dropdownItems',
      title: 'Dropdown Sub-Items (For Mega Menus)',
      type: 'array',
      hidden: ({ parent }) => parent?.menuType !== 'dropdown',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Item Title (e.g. Web Design, B2B & Enterprise)', type: 'string', validation: (r) => r.required() },
            { name: 'tagline', title: 'Tagline / Subtext (e.g. Deliver your business to a wider audience)', type: 'string' },
            { name: 'href', title: 'Link URL (e.g. /services/web-development)', type: 'string', validation: (r) => r.required() },
            { name: 'badge', title: 'Badge (e.g. POPULAR, NEW)', type: 'string' },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'tagline',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'featuredCard',
      title: 'Dropdown Featured Card (Right Column)',
      type: 'object',
      hidden: ({ parent }) => parent?.menuType !== 'dropdown',
      fields: [
        { name: 'title', title: 'Card Title (e.g. View all Services)', type: 'string' },
        { name: 'subtitle', title: 'Card Subtitle', type: 'string' },
        { name: 'href', title: 'Card Link URL', type: 'string' },
        { name: 'image', title: 'Card Image', type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'isVisible',
      title: 'Is Visible in Navbar',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'href',
    },
  },
})
