import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Custom AI Models',
    content: 'Tailored artificial intelligence models trained on your domain data for predictive accuracy and strategic decision making.',
  },
  {
    title: 'Machine Learning Pipelines',
    content: 'Robust ML data pipelines designed to ingest, process, and extract actionable insights from big data in real time.',
  },
  {
    title: 'Natural Language Processing (NLP)',
    content: 'Automated text analysis, document parsing, sentiment detection, and multilingual translation tools built with modern LLMs.',
  },
  {
    title: 'Computer Vision Systems',
    content: 'Image recognition, video analytics, and object detection systems integrated into enterprise infrastructure.',
  },
  {
    title: 'Predictive Analytics',
    content: 'Forecasting algorithms that anticipate market shifts, customer churn, and inventory requirements.',
  },
  {
    title: 'Enterprise AI Governance',
    content: 'Secure, compliant, and ethical AI deployment frameworks that safeguard sensitive enterprise data.',
  },
]

export default function AiSolutionsPage() {
  return (
    <ServiceTemplate
      title="AI Solutions"
      eyebrow="ENTERPRISE AI SOLUTIONS"
      heroHeading="Cutting-Edge AI Solutions for Growth & Scalability"
      heroDescription="Leverage machine learning, LLMs, and predictive analytics to solve complex business challenges and drive competitive advantage."
      features={features}
    />
  )
}
