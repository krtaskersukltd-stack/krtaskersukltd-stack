import type { Metadata } from 'next'
import ServicesPageClient from './ServicesPageClient'

export const metadata: Metadata = {
  title: 'Our Creative Services | KR Tasker Digital',
  description: 'Ideas, Stories, And Strategies From The Creative Edge Covering Design, Development, And The Tools That Bring Bold Digital Work To Life.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
