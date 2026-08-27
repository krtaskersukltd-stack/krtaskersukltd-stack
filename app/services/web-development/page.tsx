import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Modern Full-Stack Applications',
    content: 'React, Next.js, and TypeScript web applications built for speed, accessibility, and high performance.',
  },
  {
    title: 'Custom API & Backend Systems',
    content: 'Scalable REST and GraphQL APIs, database architecture, and cloud infrastructure deployment.',
  },
  {
    title: 'Headless CMS Integration',
    content: 'Flexible content management systems that empower marketing teams to publish updates effortlessly.',
  },
]

export default function WebDevelopmentPage() {
  return (
    <ServiceTemplate
      title="Web Development"
      eyebrow="WEB DEVELOPMENT SERVICES"
      heroHeading="High-Performance Custom Web Applications"
      heroDescription="We build modern, fast, and scalable web applications engineered to deliver seamless user experiences and business growth."
      features={features}
    />
  )
}
