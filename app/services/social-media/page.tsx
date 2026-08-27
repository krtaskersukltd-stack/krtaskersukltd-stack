import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Social Content Creation',
    content: 'Engaging video reels, carousel posts, graphics, and copy tailored for Instagram, TikTok, LinkedIn, and X.',
  },
  {
    title: 'Community Management',
    content: 'Active audience engagement, direct message response management, and brand reputation monitoring.',
  },
  {
    title: 'Influencer & Creator Outreach',
    content: 'End-to-end influencer partnerships and user-generated content (UGC) campaigns to expand reach.',
  },
]

export default function SocialMediaPage() {
  return (
    <ServiceTemplate
      title="Social Media Management"
      eyebrow="SOCIAL MEDIA MARKETING"
      heroHeading="Build an Engaged Brand Community on Social Media"
      heroDescription="Strategic content creation, community management, and paid social campaigns that turn followers into brand advocates."
      features={features}
    />
  )
}
