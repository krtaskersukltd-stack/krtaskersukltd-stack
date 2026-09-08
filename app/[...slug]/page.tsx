import AnimatedHeading from '@/components/AnimatedHeading'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCmsPageBySlug, getCmsPages, getCmsGlobal, getCmsWork } from '@/lib/cms-store'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import Contact from '@/components/Contact'
import Testimonials from '@/components/Testimonials'

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params
  const slugPath = resolvedParams.slug.join('/')
  const targetPage = await getCmsPageBySlug(slugPath)

  if (!targetPage) return {}

  const title = targetPage.seo?.metaTitle || targetPage.publicTitle || targetPage.internalName
  const description = targetPage.seo?.metaDescription || ''

  return {
    title,
    description,
    robots: {
      index: targetPage.seo?.indexStatus === 'index',
      follow: targetPage.seo?.followStatus === 'follow',
    },
    alternates: {
      canonical: targetPage.seo?.canonicalUrl || targetPage.publicUrl,
    },
    openGraph: {
      title: targetPage.seo?.ogTitle || title,
      description: targetPage.seo?.ogDescription || description,
      images: targetPage.seo?.ogImage ? [{ url: targetPage.seo.ogImage }] : [],
    },
  }
}

export default async function DynamicCMSPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params
  const slugPath = resolvedParams.slug.join('/')
  const targetPage = await getCmsPageBySlug(slugPath)

  if (!targetPage) {
    notFound()
  }

  const h1Text = targetPage.seo?.h1 || targetPage.publicTitle || targetPage.internalName
  const sections = targetPage.sections || []

  return (
    <main className="min-h-screen flex flex-col bg-[#faf9f4]">
      <StructuredData
        type="WebSite"
        data={{
          name: targetPage.publicTitle,
          url: targetPage.publicUrl,
        }}
      />
      <Navbar />

      {/* Dynamic Template Header */}
      <section className="bg-[#0C4651] text-white pt-36 pb-20 px-6 sm:px-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E6FF2A] bg-[#125764] px-3 py-1 rounded-full inline-block">
            {targetPage.templateKey === 'seo_landing' ? 'SEO LANDING PAGE' : 'KR TASKER DIGITAL'}
          </span>
          <AnimatedHeading as="h1" className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            {h1Text}
          </AnimatedHeading>
          {targetPage.seo?.metaDescription && (
            <p className="text-base sm:text-xl text-[#d2e7eb] max-w-3xl font-normal leading-relaxed">
              {targetPage.seo.metaDescription}
            </p>
          )}
        </div>
      </section>

      {/* Dynamic Controlled Sections */}
      <section className="flex-1 py-16 px-6 sm:px-12 max-w-6xl mx-auto w-full space-y-16">
        {sections.length === 0 ? (
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E5E4E0] shadow-sm space-y-6">
            <AnimatedHeading as="h2" className="text-2xl font-bold text-gray-900">Overview</AnimatedHeading>
            <div className="prose prose-teal max-w-none text-gray-700 leading-relaxed">
              <p>
                Welcome to {targetPage.internalName}. Partner with KR Tasker Digital for bespoke web architecture, search engine optimization, and enterprise digital solutions.
              </p>
            </div>
          </div>
        ) : (
          sections
            .filter((sec) => sec.isEnabled)
            .map((sec) => {
              if (sec.type === 'hero' || sec.type === 'rich_text') {
                return (
                  <div key={sec.id} className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E5E4E0] shadow-sm space-y-4">
                    {sec.data?.title && <AnimatedHeading as="h2" className="text-2xl font-bold text-gray-900">{sec.data.title}</AnimatedHeading>}
                    <div className="prose prose-teal max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                      {sec.data?.content || sec.data?.subtext || ''}
                    </div>
                  </div>
                )
              }

              if (sec.type === 'features' && Array.isArray(sec.data?.items)) {
                return (
                  <div key={sec.id} className="space-y-8">
                    {sec.data?.heading && (
                      <AnimatedHeading as="h2" className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">{sec.data.heading}</AnimatedHeading>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {sec.data.items.map((item: any, idx: number) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E5E4E0] shadow-sm space-y-2">
                          <AnimatedHeading as="h3" className="font-bold text-lg text-[#0C4651]">{item.title}</AnimatedHeading>
                          <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }

              if (sec.type === 'faq' && Array.isArray(sec.data?.items)) {
                return (
                  <div key={sec.id} className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E5E4E0] shadow-sm space-y-6">
                    <AnimatedHeading as="h2" className="text-2xl font-bold text-gray-900">Frequently Asked Questions</AnimatedHeading>
                    <div className="divide-y divide-gray-100">
                      {sec.data.items.map((faq: any, idx: number) => (
                        <div key={idx} className="py-4 space-y-1">
                          <AnimatedHeading as="h3" className="font-semibold text-base text-gray-900">{faq.question}</AnimatedHeading>
                          <p className="text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <div key={sec.id} className="bg-white p-8 rounded-2xl border border-[#E5E4E0]">
                  <AnimatedHeading as="h3" className="font-bold text-gray-900">{sec.data?.title || sec.type}</AnimatedHeading>
                  <p className="text-xs text-gray-500 mt-1">{sec.data?.content || ''}</p>
                </div>
              )
            })
        )}
      </section>

      <Contact />
      <Footer />
    </main>
  )
}
