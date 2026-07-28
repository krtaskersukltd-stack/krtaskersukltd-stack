import type { Metadata } from 'next'
import './globals.css'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'KR Tasker Digital | Performance Driven Digital Growth',
  description: 'A leading full-service UK digital marketing agency',
  icons: {
    icon: '/images/fav.png',
    shortcut: '/images/fav.png',
    apple: '/images/fav.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ScrollProgressBar />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
