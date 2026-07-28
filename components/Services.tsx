'use client'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Services.module.css'

gsap.registerPlugin(ScrollTrigger)

interface ServiceCardProps {
  title: string
  desc: string
  tags: string[]
  isDark: boolean
  link: string
  images: string[]
}

const servicesData: ServiceCardProps[] = [
  {
    title: 'Digital Marketing',
    desc: 'We deliver full-funnel digital marketing strategies that combine SEO, paid media, social advertising, and integrated campaigns. From driving organic visibility to scaling paid performance, our specialist teams work together to maximise reach, conversions, and long-term growth across every channel.',
    tags: ['Digital 360','SEO','PPC','Social Media Marketing','Google ads','Email marketing','CRO'],
    isDark: true,
    link: '/services/digital-marketing',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop',
    ]
  },
  {
    title: 'Websites & App Designing',
    desc: 'We create fast, conversion-oriented websites, apps, and e-commerce solutions using WordPress, Shopify, Webflow, and custom platforms. From UX/UI strategy to launch, our skilled team blends creativity and accuracy. We improve every project for speed, search, scalability, and measurable change.',
    tags: ['Web design & Dev','App Design & Dev','Branding','Logos'],
    isDark: false,
    link: '/services/websites-apps',
    images: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=600&auto=format&fit=crop',
    ]
  },
  {
    title: 'AI Solutions',
    desc: 'Harness the power of artificial intelligence to transform your business operations, customer experiences, and decision-making. From intelligent automation and predictive analytics to custom AI-powered tools and chatbots, we help you integrate cutting-edge technology that drives efficiency, innovation, and competitive advantage.',
    tags: ['Ai strategy','Custom AI Solutions','Agents & Chatbots','AI Automation','AI Integration'],
    isDark: true,
    link: '/services/ai-solutions',
    images: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop',
    ]
  }
]

function ServiceCardSlideshow({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className={styles.slideshowContainer}>
      {images.map((img, i) => (
        <div
          key={img}
          className={styles.slideshowImage}
          style={{
            backgroundImage: `url(${img})`,
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}
    </div>
  )
}

function ServiceCard({ title, desc, tags, isDark, link, images }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Rotation mapping (max 10 degrees)
    const rotateX = ((centerY - y) / centerY) * 8
    const rotateY = ((x - centerX) / centerX) * 8

    // Translation offsets for depth effect
    const pullX = ((x - centerX) / centerX) * 12
    const pullY = ((y - centerY) / centerY) * 12

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      scale: 1.015,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    })

    const slideshow = card.querySelector(`.${styles.slideshowContainer}`)
    const cardInfo = card.querySelector(`.${styles.cardInfo}`)
    const cta = card.querySelector(`.${styles.cta}`)

    if (slideshow) {
      gsap.to(slideshow, {
        x: pullX * 0.8,
        y: pullY * 0.8,
        z: 15,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }
    if (cardInfo) {
      gsap.to(cardInfo, {
        x: -pullX * 0.3,
        y: -pullY * 0.3,
        z: -10,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }
    if (cta) {
      gsap.to(cta, {
        x: pullX * 0.4,
        y: pullY * 0.4,
        z: 10,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto'
    })

    const slideshow = card.querySelector(`.${styles.slideshowContainer}`)
    const cardInfo = card.querySelector(`.${styles.cardInfo}`)
    const cta = card.querySelector(`.${styles.cta}`)

    if (slideshow) {
      gsap.to(slideshow, { x: 0, y: 0, z: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
    }
    if (cardInfo) {
      gsap.to(cardInfo, { x: 0, y: 0, z: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
    }
    if (cta) {
      gsap.to(cta, { x: 0, y: 0, z: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
    }
  }

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${styles.card} ${isDark ? styles.cardTeal : styles.cardCream}`}
    >
      <div className={styles.cardLeft}>
        <div className={styles.cardInfo}>
          <div className={styles.cardText}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.desc}>{desc}</p>
          </div>
          <div className={styles.tags}>
            {tags.map(tag => (
              <motion.span key={tag} whileHover={{ scale: 1.05, y: -2 }}
                className={`${styles.tag} ${isDark ? styles.tagCream : styles.tagTeal}`}>
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
        <motion.a 
          href={link} 
          whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(230,255,42,0.5)' }} 
          whileTap={{ scale: 0.97 }}
          data-cursor="Build"
          className={styles.cta}
        >
          Start a project
        </motion.a>
      </div>
      <div className={styles.slideshowWrapper} data-cursor="View">
        <ServiceCardSlideshow images={images} />
      </div>
    </div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`)

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0.3, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none none',
          }
        }
      )
    })
  }, [])

  return (
    <section ref={ref} className={styles.servicesSec}>
      <div className={styles.headingContainer}>
        <h2 className={styles.heading}>
          Our core <span className={styles.headingSpan}>Services</span>
        </h2>
      </div>
      <div ref={containerRef} className={styles.container}>
        {servicesData.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  )
}
