import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Digital Transformation Roadmap',
    content: 'Strategic guidance on adopting modern tech stacks, automation tools, and cloud infrastructure.',
  },
  {
    title: 'Operations & Process Optimization',
    content: 'Streamline internal workflows, eliminate operational bottlenecks, and improve team productivity.',
  },
  {
    title: 'Market Expansion & Go-To-Market',
    content: 'Data-driven GTM strategy for launching new products, services, or entering new geographical markets.',
  },
]

export default function BusinessConsultancyPage() {
  return (
    <ServiceTemplate
      title="Business Consultancy"
      eyebrow="BUSINESS CONSULTING"
      heroHeading="Expert Business Consultancy for Growth & Efficiency"
      heroDescription="Strategic business advisory, digital transformation, and process optimization to help your company scale."
      features={features}
    />
  )
}
