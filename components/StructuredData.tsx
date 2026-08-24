import React from 'react'

interface Props {
  type: 'Organization' | 'WebSite' | 'Service' | 'BlogPosting' | 'BreadcrumbList'
  data: Record<string, any>
}

export default function StructuredData({ type, data }: Props) {
  let jsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
