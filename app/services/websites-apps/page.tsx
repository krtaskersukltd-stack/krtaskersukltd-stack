import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Progressive Web Apps (PWA)',
    content: 'App-like web experiences with offline support, push notifications, and fast mobile performance.',
  },
  {
    title: 'Cross-Platform Mobile Apps',
    content: 'React Native mobile applications built for seamless iOS and Android store deployment.',
  },
  {
    title: 'Enterprise Portals',
    content: 'Secure customer portals, employee dashboards, and SaaS product interfaces.',
  },
]

export default function WebsitesAppsPage() {
  return (
    <ServiceTemplate
      title="Websites & Mobile Apps"
      eyebrow="WEBSITES & MOBILE APPS"
      heroHeading="Custom Websites & Mobile Applications"
      heroDescription="End-to-end design and engineering for web platforms and cross-platform mobile apps."
      features={features}
    />
  )
}
