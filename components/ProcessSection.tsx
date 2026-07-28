'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ProcessSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', title: 'Audit and Research', desc: 'We analyse your current digital presence, technical health, content, competitors and audience. This establishes clear baseline metrics and uncovers the highest-impact opportunities for growth.' },
  { num: '02', title: 'Strategy Development', desc: 'Based on our findings, we build a bespoke strategy around your goals, target markets and competitive landscape, with clear channels, priorities, budgets and success measures.' },
  { num: '03', title: 'Campaign Build', desc: 'We create every campaign element with precision, from creative and landing pages to audience targeting, tracking, attribution and the conversion journey.' },
  { num: '04', title: 'Content Creation', desc: 'Our team creates search-optimised pages, ads, social content and campaign assets aligned to your strategy. Every piece is crafted to attract, engage and convert.' },
  { num: '05', title: 'Launch and Optimise', desc: 'Campaigns go live with careful monitoring, rapid testing and continuous optimisation. We improve performance across every active channel as meaningful data arrives.' },
  { num: '06', title: 'Report and Scale', desc: 'Clear reporting turns performance data into practical next steps. We scale the winning activity and continuously refine the strategy to support sustainable growth.' },
]

const logos = [
  ['Google', '/images/digital-icon/logos_google.png'],
  ['Google Ads', '/images/digital-icon/logos_google-ads.png'],
  ['Meta', '/images/digital-icon/logos_meta.png'],
  ['Ahrefs', '/images/digital-icon/ahrefs-seo-tool-seeklogo 1.png'],
  ['Semrush', '/images/digital-icon/semrush-seeklogo 1.png'],
]

function StepIcon({ index }: { index: number }) {
  const paths = [
    <><path d="M20 11a8 8 0 1 1-2.34-5.66"/><path d="M20 4v7h-7"/></>,
    <><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"/><path d="m13.5 7.5 3 3"/></>,
    <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m7 12 3 3 7-7"/></>,
    <><path d="M5 20V8"/><path d="m2 11 3-3 3 3"/><path d="M11 20h10"/><path d="M11 15h7"/><path d="M11 10h4"/></>,
    <><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/></>,
    <><path d="M4 20V10"/><path d="M10 20V6"/><path d="M16 20v-7"/><path d="m3 8 6-5 6 5 6-5"/></>,
  ]
  return <svg className={styles.stepIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">{paths[index]}</svg>
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 901px)', () => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.16)
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      gsap.fromTo(track.querySelectorAll(`.${styles.stepCard}`),
        { y: 45, opacity: 0.55 },
        { y: 0, opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: section, start: 'top 70%', end: 'top top', scrub: true } }
      )

      return () => tween.kill()
    })
    return () => media.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.processSection}>
      <div ref={trackRef} className={styles.horizontalTrack}>
        <div className={styles.introBlock}>
          <span className={styles.eyebrow}>How we make growth happen</span>
          <h2 className={styles.tag}>Our <b>Process</b></h2>
          <p className={styles.introText}>A clear, collaborative process that takes your project from insight to measurable, scalable growth.</p>
          <div className={styles.logoGrid}>
            {logos.map(([brand, src]) => <div key={brand} className={styles.logoCard}><img src={src} alt={brand} /></div>)}
          </div>
        </div>

        <div className={styles.trackSpacer} aria-hidden="true" />

        {steps.map((step, index) => (
          <article key={step.num} className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNum}>{step.num}</span>
              <StepIcon index={index} />
            </div>
            <div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          </article>
        ))}
        <div className={styles.endSpace} aria-hidden="true" />
      </div>
    </section>
  )
}
