import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Brand Strategy & Identity',
    content: 'Define brand mission, vision, voice, and core messaging framework for market differentiation.',
  },
  {
    title: 'Visual Identity & Logo Design',
    content: 'Bespoke logo suites, typography rules, color systems, and comprehensive brand style guides.',
  },
  {
    title: 'Rebranding & Brand Transformation',
    content: 'Modernize legacy brands to align with digital audiences and current market positioning.',
  },
]

export default function BrandingPage() {
  return (
    <ServiceTemplate
      title="Brand Strategy & Design"
      eyebrow="BRANDING & DESIGN"
      heroHeading="Build a Memorable Brand Identity That Stands Out"
      heroDescription="Transform your business with strategic brand positioning, visual identity systems, and brand guidelines."
      features={features}
    />
  )
}
