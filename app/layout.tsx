import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-accent',
})

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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
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
