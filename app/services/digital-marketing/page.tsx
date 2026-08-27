import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Search Engine Marketing (SEM)',
    content: 'Targeted pay-per-click campaigns and search ads designed to drive instant, high-intent traffic to your core products and services.',
  },
  {
    title: 'Social Media Advertising',
    content: 'Full-funnel paid campaigns across Meta, LinkedIn, TikTok, and Pinterest with dynamic retargeting and creative testing.',
  },
  {
    title: 'Conversion Rate Optimization (CRO)',
    content: 'A/B testing, user journey heatmaps, and funnel optimizations that turn existing site visitors into paying clients.',
  },
  {
    title: 'Content Marketing & Strategy',
    content: 'High-authority blog articles, lead magnets, and video assets crafted to engage your target market.',
  },
  {
    title: 'Analytics & Attribution',
    content: 'Custom GA4 tracking dashboards and multi-touch attribution reporting for clear marketing ROI visibility.',
  },
]

export default function DigitalMarketingPage() {
  return (
    <ServiceTemplate
      title="Digital Marketing"
      eyebrow="DIGITAL MARKETING SERVICES"
      heroHeading="Full-Funnel Digital Marketing Agency in UK"
      heroDescription="We offer data-driven digital marketing strategies, industry experience, and proven ROI campaigns that build brand authority and scale revenue."
      features={features}
    />
  )
}
