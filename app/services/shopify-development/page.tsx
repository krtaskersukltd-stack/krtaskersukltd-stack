import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Custom Shopify Theme Development',
    content: 'Bespoke Liquid and Hydrogen theme builds designed for fast page speeds and high conversion rates.',
  },
  {
    title: 'Shopify Plus & App Integrations',
    content: 'Enterprise Shopify Plus setups, custom app development, and third-party ERP/CRM integrations.',
  },
  {
    title: 'Migration to Shopify',
    content: 'Seamless data migration from WooCommerce, Magento, or custom stacks with zero lost traffic or SEO rankings.',
  },
]

export default function ShopifyDevelopmentPage() {
  return (
    <ServiceTemplate
      title="Shopify Development"
      eyebrow="SHOPIFY & E-COMMERCE"
      heroHeading="High-Converting Shopify Stores Built for Scale"
      heroDescription="Custom Shopify themes, headless e-commerce builds, and Shopify Plus solutions designed to maximize online sales."
      features={features}
    />
  )
}
