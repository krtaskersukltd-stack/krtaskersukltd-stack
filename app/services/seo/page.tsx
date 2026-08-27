import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Technical SEO Audits',
    content: 'Comprehensive crawl analysis, Core Web Vitals optimization, schema markup injection, and site architecture fixes.',
  },
  {
    title: 'On-Page & Keyword Strategy',
    content: 'Targeted keyword research, content optimization, and internal link structure to dominate search engine results.',
  },
  {
    title: 'Link Building & Authority Growth',
    content: 'Ethical outreach and high-authority backlink acquisition that builds long-term domain rank power.',
  },
]

export default function SeoPage() {
  return (
    <ServiceTemplate
      title="SEO Strategy"
      eyebrow="SEARCH ENGINE OPTIMIZATION"
      heroHeading="Dominate Google Search Results & Scale Organic Traffic"
      heroDescription="Proven technical, on-page, and authority SEO strategies that drive sustainable organic revenue growth."
      features={features}
    />
  )
}
