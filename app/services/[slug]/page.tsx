import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCmsServices } from '@/lib/cms-store'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import Contact from '@/components/Contact'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const services = await getCmsServices()
  const srv = services.find((s) => s.slug === slug || s.slug === `/services/${slug}`)

  if (!srv) return {}

  const title = srv.seo?.metaTitle || `${srv.name} | KR Tasker Digital`
  const description = srv.seo?.metaDescription || srv.heroDescription

  return {
    title,
    description,
    robots: {
      index: srv.seo?.indexStatus === 'index',
      follow: srv.seo?.followStatus === 'follow',
    },
    alternates: {
      canonical: srv.seo?.canonicalUrl || `https://www.krtaskerdigital.com/services/${srv.slug}`,
    },
    openGraph: {
      title: srv.seo?.ogTitle || title,
      description: srv.seo?.ogDescription || description,
      images: srv.seo?.ogImage ? [{ url: srv.seo.ogImage }] : [],
    },
  }
}

export default async function DynamicServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const services = await getCmsServices()
  const srv = services.find((s) => s.slug === slug || s.slug === `/services/${slug}`)

  if (!srv || srv.status !== 'published') {
    notFound()
  }

  const h1Text = srv.seo?.h1 || srv.heroHeading || srv.name

  return (
    <main className="min-h-screen flex flex-col bg-[#faf9f4]">
      <StructuredData
        type="Service"
        data={{
          name: srv.name,
          serviceType: srv.eyebrow || 'Digital Engineering',
          description: srv.heroDescription,
          provider: {
            '@type': 'Organization',
            name: 'KR Tasker Digital',
          },
        }}
      />
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#0C4651] text-white pt-36 pb-20 px-6 sm:px-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E6FF2A] bg-[#125764] px-3 py-1 rounded-full inline-block">
            {srv.eyebrow || 'SERVICES'}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            {h1Text}
          </h1>
          <p className="text-base sm:text-xl text-[#d2e7eb] max-w-3xl font-normal leading-relaxed">
            {srv.heroDescription}
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block bg-[#E6FF2A] text-[#191e00] font-bold px-8 py-3.5 rounded-xl shadow-lg hover:opacity-90 transition-all text-sm"
            >
              {srv.heroCtaText || 'Get Started Today'}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      {srv.features && srv.features.length > 0 && (
        <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto w-full space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900">Key Capabilities & Features</h2>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Engineered to deliver high performance, conversion velocity, and operational scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {srv.features.map((feat) => (
              <div key={feat.id} className="bg-white p-8 rounded-2xl border border-[#E5E4E0] shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0C4651]/10 text-[#0C4651] flex items-center justify-center font-bold text-base">
                  ✓
                </div>
                <h3 className="font-bold text-xl text-gray-900">{feat.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Metrics Banner */}
      {srv.metrics && srv.metrics.length > 0 && (
        <section className="bg-[#09353e] text-white py-16 px-6 sm:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {srv.metrics.map((met, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl sm:text-5xl font-black text-[#E6FF2A]">{met.value}</div>
                <div className="text-xs uppercase tracking-wider text-[#84b4bd] font-medium">{met.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Contact />
      <Footer />
    </main>
  )
}
