import ServiceTemplate from '@/components/ServiceTemplate'

const features = [
  {
    title: 'Process Automation',
    content: 'Professional, end-to-end strategy, execution, and optimization for Process Automation to maximize conversions, build brand authority, and accelerate customer growth.',
  },
  {
    title: 'Custom Chatbots',
    content: 'Professional, end-to-end strategy, execution, and optimization for Custom Chatbots to maximize conversions, build brand authority, and accelerate customer growth.',
  },
  {
    title: 'AI Agents & Integrations',
    content: 'Professional, end-to-end strategy, execution, and optimization for AI Agents & Integrations to maximize conversions, build brand authority, and accelerate customer growth.',
  },
  {
    title: 'Data Extraction & Analysis',
    content: 'Professional, end-to-end strategy, execution, and optimization for Data Extraction & Analysis to maximize conversions, build brand authority, and accelerate customer growth.',
  },
  {
    title: 'OpenAI API Custom Tooling',
    content: 'Professional, end-to-end strategy, execution, and optimization for OpenAI API Custom Tooling to maximize conversions, build brand authority, and accelerate customer growth.',
  },
  {
    title: 'Workflow Efficiency Optimization',
    content: 'Professional, end-to-end strategy, execution, and optimization for Workflow Efficiency Optimization to maximize conversions, build brand authority, and accelerate customer growth.',
  },
]

export default function AiAutomationPage() {
  return (
    <ServiceTemplate
      title="AI Automation"
      eyebrow="AI & AUTOMATION SERVICES"
      heroHeading="Transform Your Business With AI Automation"
      heroDescription="Streamline operational workflows, implement intelligent AI agents, and automate repetitive tasks to boost efficiency and cut overhead costs."
      features={features}
    />
  )
}
