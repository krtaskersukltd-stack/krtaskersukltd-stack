'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WorkTogetherMarquee from '@/components/WorkTogetherMarquee'
import type { CaseStudyRecord } from '@/lib/cms-types'
import fallbackWorkData from '@/data/cms/work.json'
import styles from './CaseStudyDetail.module.css'

interface CaseStudyDetailClientProps {
  cs: CaseStudyRecord
}

const TEAM_AVATARS = [
  { name: 'K. Raza', role: 'Creative Director', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop' },
  { name: 'A. Miller', role: 'Lead Architect', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop' },
  { name: 'S. Jenkins', role: 'Brand Strategist', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop' },
  { name: 'D. Vance', role: 'UI/UX Designer', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop' },
  { name: 'E. Chen', role: 'Motion Engineer', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop' },
]

export default function CaseStudyDetailClient({ cs }: CaseStudyDetailClientProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Suggest other case studies
  const otherStudies = (fallbackWorkData as CaseStudyRecord[])
    .filter((w) => w.slug !== cs.slug && w.id !== cs.id)
    .slice(0, 3)

  // Derived pill tags
  // Derived pill tags
  const tags = [
    'Branding',
    cs.category ? cs.category.split('&')[0].trim() : 'Website',
    'SEO',
  ]

  return (
    <main className={styles.caseStudyPage}>
      <Navbar />

      {/* 1. Integrated Folder-Tab Hero Header & Media */}
      <section className={styles.heroFolderSection}>
        <div className={styles.container}>
          {/* Header Row: Pills on Left, Title on Right */}
          <div className={styles.folderHeaderGrid}>
            <div className={styles.pillsCol}>
              <div className={styles.pillsRow}>
                {tags.map((tag, idx) => (
                  <span key={idx} className={styles.pillTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.titleCol}>
              <span className={styles.eyebrowMeta}>
                {cs.year || '2023'} • {cs.client || 'Gary Neville'}
              </span>
              <h1 className={styles.mainTitle}>{cs.title}</h1>
            </div>
          </div>

          {/* Folder Cutout Hero Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className={styles.folderHeroCardWrapper}
          >
            {/* SVG ClipPath Definition for dynamic shape */}
            <svg width="0" height="0" className={styles.svgClipDef} aria-hidden="true">
              <defs>
                <clipPath id="heroFolderClip" clipPathUnits="objectBoundingBox">
                  <path d="
                    M 0, 0.04
                    C 0, 0.015, 0.01, 0, 0.025, 0
                    L 0.375, 0
                    C 0.39, 0, 0.40, 0.015, 0.40, 0.04
                    L 0.40, 0.13
                    C 0.40, 0.155, 0.41, 0.17, 0.425, 0.17
                    L 0.975, 0.17
                    C 0.99, 0.17, 1, 0.185, 1, 0.21
                    L 1, 0.96
                    C 1, 0.985, 0.99, 1, 0.975, 1
                    L 0.025, 1
                    C 0.01, 1, 0, 0.985, 0, 0.96
                    Z
                  " />
                </clipPath>
              </defs>
            </svg>

            <div className={styles.folderHeroCard}>
              <img
                src={cs.featuredImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1600&auto=format&fit=crop'}
                alt={cs.featuredImageAlt || cs.title}
                className={styles.heroImage}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Project Intro & Squad Info (2 Columns) */}
      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div className={styles.introLeft}>
              <h2 className={styles.introHeading}>
                A new personal brand identity, bespoke site and build
              </h2>
              
              <div className={styles.teamSquad}>
                <div className={styles.squircleAvatarRow}>
                  {TEAM_AVATARS.map((member, idx) => (
                    <div key={idx} className={styles.squircleAvatarWrapper} title={`${member.name} (${member.role})`}>
                      <img src={member.url} alt={member.name} className={styles.avatarImg} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.introRight}>
              <p className={styles.introDesc}>
                {cs.overview ||
                  `We were tasked to reimagine all aspects of the ${cs.client || 'client'} brand, from personal brand identity through to carefully architectured site structure, design, and build. The website acts as an overview of all digital touchpoints, from business to broadcasting, to charity and public speaking.`}
              </p>

              <div className={styles.metaInfoRow}>
                <div className={styles.metaCol}>
                  <span className={styles.metaKey}>Client</span>
                  <span className={styles.metaVal}>{cs.client || 'Gary Neville'}</span>
                </div>
                <div className={styles.metaCol}>
                  <span className={styles.metaKey}>Industry</span>
                  <span className={styles.metaVal}>{cs.category || 'Personal Branding'}</span>
                </div>
                <div className={styles.metaCol}>
                  <span className={styles.metaKey}>Duration</span>
                  <span className={styles.metaVal}>12 Weeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Visual Block 1: Inspiration Dark Video Showcase Player */}
      <section className={styles.showcaseBannerSection}>
        <div className={styles.container}>
          <div className={styles.darkVideoShowcaseCard}>
            {/* Ambient/Active Video Teaser */}
            {isPlaying && (
              <video
                autoPlay
                loop
                muted
                playsInline
                className={styles.ambientVideoPlayer}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              />
            )}

            {/* Centered Dual Wordmark Brand Display */}
            <div className={`${styles.wordmarkContent} ${isPlaying ? styles.wordmarkPlaying : ''}`}>
              <span className={styles.topSmallWordmark}>
                {(cs.client || 'G A R Y   N E V I L L E').toUpperCase()}
              </span>
              <span className={styles.bottomLargeWordmark}>
                {(cs.client || 'G A R Y   N E V I L L E').toUpperCase()}
              </span>
            </div>

            {/* Bottom Controls Bar */}
            <div className={styles.videoBottomControls}>
              {/* Lime Play/Pause Button */}
              <button
                className={styles.limePlayBtn}
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
              >
                {isPlaying ? '❚❚' : '▶'}
              </button>

              {/* Progress Scrubber Bar */}
              <div
                className={styles.videoTrackBar}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <div className={`${styles.videoTrackFill} ${isPlaying ? styles.animateTrack : ''}`} />
              </div>

              {/* Play Video Pill Button */}
              <button
                className={styles.playVideoPillBtn}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? 'Pause video ❚❚' : 'Play video ↗'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Visual Block 2: 2-Column Showcase (Mobile & Physical Collateral) */}
      <section className={styles.twoColMockupSection}>
        <div className={styles.container}>
          <div className={styles.twoColGrid}>
            <div className={styles.mockupTileLeft}>
              <div className={styles.mockupInnerFrame}>
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=900&auto=format&fit=crop"
                  alt="Mobile experience in hand"
                  className={styles.tileImage}
                />
                <div className={styles.overlayQuote}>
                  <span>NO EXCUSES.</span>
                  <span>NO SHORTCUTS.</span>
                  <span>NO REGRETS.</span>
                </div>
              </div>
            </div>

            <div className={styles.mockupTileRight}>
              <div className={styles.monogramStoneBox}>
                <span className={styles.stoneMonogram}>
                  {(cs.client || 'G — N').substring(0, 1)} — {(cs.client || 'N').substring(0, 1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Visual Block 3: Full-Width Desktop Interface Showcase */}
      <section className={styles.desktopShowcaseSection}>
        <div className={styles.container}>
          <div className={styles.browserWindow}>
            <div className={styles.browserHeader}>
              <div className={styles.browserDots}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
              <span className={styles.browserUrl}>
                www.{cs.slug ? cs.slug.replace(/[^a-z0-9-]/g, '') : 'brand'}.com
              </span>
            </div>
            <div className={styles.browserBody}>
              <img
                src={cs.featuredImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1600&auto=format&fit=crop'}
                alt="Desktop Website Experience"
                className={styles.browserImage}
              />
              <div className={styles.browserOverlayHeadline}>
                <h2>NO EXCUSES, NO SHORTCUTS, NO REGRETS.</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Story Section 1: Exclusive yet progressive */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storySplitHeader}>
            <div className={styles.storyLeft}>
              <span className={styles.storyStepBadge}>• 01 / Strategy</span>
              <h2 className={styles.storyTitle}>Exclusive yet progressive</h2>
            </div>
            <div className={styles.storyRight}>
              <p className={styles.storyParagraph}>
                {cs.challenge ||
                  `We wanted to structure an open digital architecture, creating a sense of sophisticated exclusivity without alienating users. Every interaction, page transition, and visual element was tailored to communicate authority and progressive thinking.`}
              </p>
            </div>
          </div>

          <div className={styles.fullWidthMockupCard}>
            <div className={styles.stoneBannerDisplay}>
              <span className={styles.largeMonogramText}>
                {(cs.client || 'G — N').substring(0, 1)} — {(cs.client || 'N').substring(0, 1)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Visual Block 4: Multi-Device Lifestyle Mosaic */}
      <section className={styles.lifestyleMosaicSection}>
        <div className={styles.container}>
          <div className={styles.mosaicGrid}>
            <div className={styles.mosaicCard}>
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop"
                alt="Environmental shoot"
                className={styles.mosaicImg}
              />
            </div>
            <div className={styles.mosaicCard}>
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
                alt="UI detail interaction"
                className={styles.mosaicImg}
              />
            </div>
            <div className={styles.mosaicCard}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
                alt="Portrait detail"
                className={styles.mosaicImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Story Section 2: The heart of the brand */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storySplitHeader}>
            <div className={styles.storyLeft}>
              <span className={styles.storyStepBadge}>• 02 / Identity</span>
              <h2 className={styles.storyTitle}>The heart of the brand</h2>
            </div>
            <div className={styles.storyRight}>
              <p className={styles.storyParagraph}>
                {cs.solution ||
                  `Developing the bespoke typography was at the heart of the project. The brand typography works seamlessly both as progressive uppercase and approachable lower-case storytelling, anchoring the entire digital ecosystem.`}
              </p>
            </div>
          </div>

          <div className={styles.identitySplitGrid}>
            <div className={styles.identityTypeSpecimen}>
              <span className={styles.specimenText}>
                {(cs.client || 'G A R Y   N E V I L L E').toUpperCase()}
              </span>
            </div>

            <div className={styles.identityPaletteBlock}>
              <div className={styles.paletteSwatchesRow}>
                <span className={styles.swatch} style={{ background: '#0C4651' }} />
                <span className={styles.swatch} style={{ background: '#10525F' }} />
                <span className={styles.swatch} style={{ background: '#E7F285' }} />
                <span className={styles.swatch} style={{ background: '#F8F7F2' }} />
                <span className={styles.swatch} style={{ background: '#121314' }} />
              </div>
              <div className={styles.monogramPreview}>
                <span>{cs.client || 'G — N'}</span>
                <span className={styles.monogramLower}>garyneville.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Visual Block 5: Multi-Tile Moodboard Grid */}
      <section className={styles.moodboardGridSection}>
        <div className={styles.container}>
          <div className={styles.moodboardGrid}>
            <div className={styles.tileDark}>
              <span className={styles.tileEyebrow}>CORE VALUES</span>
              <h3 className={styles.tileHeading}>INSIGHT. INTEGRITY & PURPOSE.</h3>
            </div>
            <div className={styles.tileImg}>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
                alt="Team in action"
                className={styles.fillImg}
              />
            </div>
            <div className={styles.tileDarkAccented}>
              <span className={styles.tileMonoLarge}>UA92</span>
            </div>
            <div className={styles.tileDark}>
              <h3 className={styles.tileHeading}>ATTACK THE DAY</h3>
            </div>
            <div className={styles.tileLight}>
              <span className={styles.tileSayHello}>SAY HELLO</span>
            </div>
            <div className={styles.tileImg}>
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop"
                alt="Interior workspace"
                className={styles.fillImg}
              />
            </div>
            <div className={styles.tileDark}>
              <span className={styles.tileSub}>STOCK EXCHANGE HOTEL</span>
            </div>
            <div className={styles.tileImg}>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
                alt="Digital analytics"
                className={styles.fillImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11. Story Section 3: Carefully Curated Media & Impact */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storySplitHeader}>
            <div className={styles.storyLeft}>
              <span className={styles.storyStepBadge}>• 03 / Impact</span>
              <h2 className={styles.storyTitle}>Carefully Curated Media</h2>
            </div>
            <div className={styles.storyRight}>
              <p className={styles.storyParagraph}>
                {cs.results ||
                  `With media being at the core of the brand, we curated three distinct layers of photography and video. From raw documentary grit through to stadium-level impact, every touchpoint delivers measurable commercial return.`}
              </p>
            </div>
          </div>

          <div className={styles.mediaTextureHero}>
            <div className={styles.garmentCloseUp}>
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1600&auto=format&fit=crop"
                alt="Apparel texture close-up"
                className={styles.textureImg}
              />
              <span className={styles.embroideryMonogram}>
                {(cs.client || 'G — N').substring(0, 1)} — {(cs.client || 'N').substring(0, 1)}
              </span>
            </div>
          </div>

          <div className={styles.mediaBottomSplit}>
            <div className={styles.relentlessPoster}>
              <div className={styles.repeatingLines}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className={styles.relentlessWord}>
                    RELENTLESS
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.highContrastPortrait}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                alt="High contrast portrait"
                className={styles.portraitImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 12. "What Next?" Related Projects */}
      <section className={styles.whatNextSection}>
        <div className={styles.container}>
          <div className={styles.whatNextHeader}>
            <div>
              <span className={styles.whatNextEyebrow}>• More good stuff</span>
              <h2 className={styles.whatNextTitle}>What next?</h2>
            </div>
            <Link href="/work" className={styles.browseAllBtn}>
              Browse all Work ↗
            </Link>
          </div>

          <div className={styles.relatedGrid}>
            {otherStudies.map((item) => {
              const cleanSlug = item.slug.replace(/^\/work\//, '').replace(/^\//, '')
              return (
                <Link key={item.id || item.slug} href={`/work/${cleanSlug}`} className={styles.relatedCard}>
                  <div className={styles.relatedImgWrapper}>
                    <img src={item.featuredImage} alt={item.title} className={styles.relatedImg} />
                  </div>
                  <span className={styles.relatedMeta}>
                    {item.year || '2024'} • {item.category}
                  </span>
                  <h3 className={styles.relatedTitle}>{item.title}</h3>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 13. Marquee */}
      <WorkTogetherMarquee />

      {/* 14. Contact Form Integration */}
      <div id="contact-form">
        <Contact />
      </div>

      <Footer />
    </main>
  )
}
