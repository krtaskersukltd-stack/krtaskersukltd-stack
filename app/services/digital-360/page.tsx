import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: '360° Multi-Channel Strategy',
    content: 'Unified brand strategy encompassing Web, SEO, PPC, Social Media, Email, and Content Marketing.',
  },
  {
    title: 'Dedicated Growth Team',
    content: 'Full access to senior strategists, developers, designers, and copywriters acting as your extended team.',
  },
  {
    title: 'Continuous Optimization & Reporting',
    content: 'Monthly performance reviews, real-time ROI tracking, and ongoing multi-channel campaign adjustments.',
  },
]

export default function Digital360Page() {
  return (
    <ServiceTemplate
      title="Digital 360"
      eyebrow="DIGITAL 360 SOLUTIONS"
      heroHeading="Complete 360° Digital Transformation & Marketing"
      heroDescription="An all-in-one digital growth partnership covering web development, SEO, paid media, and brand strategy."
      features={features}
    />
  )
}
