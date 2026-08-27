import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Google Ads & Search Campaigns',
    content: 'High-intent search keyword bidding, ad copy optimization, and negative keyword filtering to maximize ROI.',
  },
  {
    title: 'Meta & Social Paid Ads',
    content: 'Targeted Facebook and Instagram campaigns built to engage prospective customers with compelling video and image ads.',
  },
  {
    title: 'Remarketing & Audience Retargeting',
    content: 'Re-engage previous site visitors with tailored ad messaging across Google Display Network and social platforms.',
  },
]

export default function PpcPage() {
  return (
    <ServiceTemplate
      title="PPC Management"
      eyebrow="PAY-PER-CLICK SERVICES"
      heroHeading="High-Return PPC Campaigns That Deliver Leads"
      heroDescription="Maximize your return on ad spend with precision-targeted Google Ads, Meta Ads, and PPC campaign management."
      features={features}
    />
  )
}
