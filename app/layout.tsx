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
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500,400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
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
