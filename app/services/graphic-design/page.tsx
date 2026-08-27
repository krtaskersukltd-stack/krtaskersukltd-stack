import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Brand Visual Identity',
    content: 'Comprehensive visual branding systems including logo suites, typography guidelines, and color palettes.',
  },
  {
    title: 'Marketing & Social Media Assets',
    content: 'Eye-catching graphic banners, social media templates, ad creatives, and digital marketing materials.',
  },
  {
    title: 'Packaging & Print Design',
    content: 'Print-ready product packaging designs, merchandise, brochures, and corporate stationery.',
  },
]

export default function GraphicDesignPage() {
  return (
    <ServiceTemplate
      title="Graphic Design"
      eyebrow="GRAPHIC DESIGN SERVICES"
      heroHeading="Creative Graphic Design That Captivates"
      heroDescription="Elevate your brand presence with stunning visual designs, custom graphics, and memorable branding assets."
      features={features}
    />
  )
}
