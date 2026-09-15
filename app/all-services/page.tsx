import type { Metadata } from 'next'
import ServicesPageClient from '../services/ServicesPageClient'

export const metadata: Metadata = {
  title: 'All Creative Services | KR Tasker Digital',
  description: 'Explore all digital services offered by KR Tasker Digital, from SEO and Web Development to Paid Marketing and AI Automations.',
  alternates: { canonical: '/all-services' },
}

export default function AllServicesPage() {
  return <ServicesPageClient />
}
