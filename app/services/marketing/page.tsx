import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Integrated Growth Strategy',
    content: 'Holistic multi-channel marketing plans tailored to customer acquisition and retention goals.',
  },
  {
    title: 'Brand Positioning',
    content: 'Define your unique value proposition, target buyer personas, and competitive market positioning.',
  },
  {
    title: 'Performance Marketing',
    content: 'Data-driven paid media execution focused on cost per acquisition (CPA) and return on ad spend (ROAS).',
  },
]

export default function MarketingPage() {
  return (
    <ServiceTemplate
      title="Marketing"
      eyebrow="MARKETING SERVICES"
      heroHeading="Strategic Marketing That Accelerates Business Growth"
      heroDescription="Data-backed marketing strategies and creative execution that connect your brand with the right audience."
      features={features}
    />
  )
}
