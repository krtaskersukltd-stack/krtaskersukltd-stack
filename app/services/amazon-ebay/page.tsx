import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Amazon Storefront & A+ Content',
    content: 'Custom Amazon storefront design, A+ Content (EBC), and keyword-optimized product listings.',
  },
  {
    title: 'Amazon PPC & Advertising',
    content: 'Sponsored Products, Sponsored Brands, and Display ad management to maximize ACoS and sales velocity.',
  },
  {
    title: 'eBay Store Optimization',
    content: 'Custom eBay store templates, listing SEO, and inventory management setups.',
  },
]

export default function AmazonEbayPage() {
  return (
    <ServiceTemplate
      title="Amazon & eBay Services"
      eyebrow="MARKETPLACE OPTIMIZATION"
      heroHeading="Scale Your Amazon & eBay Marketplace Sales"
      heroDescription="Professional storefront design, listing SEO, and PPC management for Amazon and eBay sellers."
      features={features}
    />
  )
}
