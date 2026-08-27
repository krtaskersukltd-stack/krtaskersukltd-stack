import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Automated Lifecycle Flows',
    content: 'Welcome series, abandoned cart recovery, browse abandonment, and post-purchase customer nurture sequences built in Klaviyo & Mailchimp.',
  },
  {
    title: 'Campaign Strategy & Design',
    content: 'High-converting email copy and bespoke responsive HTML email designs aligned with your brand identity.',
  },
  {
    title: 'List Segmentation & Deliverability',
    content: 'Advanced subscriber segmentation, domain warming, and inbox deliverability monitoring for maximum open rates.',
  },
  {
    title: 'A/B Subject Line & Creative Testing',
    content: 'Continuous testing of email subject lines, send times, preview text, and call-to-action buttons.',
  },
]

export default function EmailMarketingPage() {
  return (
    <ServiceTemplate
      title="Email Marketing"
      eyebrow="EMAIL MARKETING SERVICES"
      heroHeading="Turn Subscribers into Loyal Repeat Customers"
      heroDescription="High-converting email campaigns and automated revenue flows that maximize customer lifetime value and drive predictable sales."
      features={features}
    />
  )
}
