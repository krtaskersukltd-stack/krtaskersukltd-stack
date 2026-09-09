'use client'

import AnimatedHeading from '@/components/AnimatedHeading'
import React from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './TeamPage.module.css'
import WorkTogetherMarquee from '@/components/WorkTogetherMarquee'
import Button from '@/components/Button'

const teamMembers = [
  { name: 'John Doe', role: 'Sales Manager', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop' },
  { name: 'John Doe', role: 'Sales Manager', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop' },
  { name: 'John Doe', role: 'Sales Manager', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop' },
  { name: 'John Doe', role: 'Sales Manager', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop' },
  { name: 'John Doe', role: 'Sales Manager', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop' },
  { name: 'Jane Doe', role: 'Sales Manager', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop' },
  { name: 'Jane Doe', role: 'Sales Manager', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop' },
  { name: 'John Doe', role: 'Sales Manager', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop' },
  { name: 'Jane Doe', role: 'Sales Manager', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop' },
  { name: 'John Doe', role: 'Sales Manager', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop' },
  { name: 'Jane Doe', role: 'Sales Manager', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop' },
  { name: 'John Doe', role: 'Sales Manager', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop' },
]

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        
        {/* Header Section */}
        <section className={styles.headerSection}>
          <AnimatedHeading as="h1" className={styles.title}>
            We bring a wealth of <span className={styles.tealText}>skills and experience</span><br/>
            from a wide range of backgrounds.
          </AnimatedHeading>
          <p className={styles.subtitle}>
            Our philosophy is simple. Hire great people and give them<br/>
            the resources and support to do their best work.
          </p>
        </section>

        {/* Team Grid */}
        <section className={styles.teamSection}>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, i) => (
              <div key={i} className={styles.teamCard}>
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className={styles.teamImage}
                  sizes="(max-width: 768px) 75vw, 25vw"
                />
                <div className={styles.infoBox}>
                  <AnimatedHeading as="h3" className={styles.memberName}>{member.name}</AnimatedHeading>
                  <p className={styles.memberRole}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hiring Section */}
        <section className={styles.hiringSection}>
          <div className={styles.hiringLeft}>
            <AnimatedHeading as="h2" className={styles.hiringTitle}>
              We are looking for <span className={styles.tealText}>great</span> people
            </AnimatedHeading>
            <p className={styles.hiringDesc}>
              Interested in working with a world-class team on problems
              that really matter? We are growing fast and hiring access
              all departments. Join our 100% remote team
            </p>
            <div className={styles.hiringButtons}>
              <Button href="#">Our Benefits</Button>
              <Button href="#" variant="secondary">View Open Roles (45)</Button>
            </div>
          </div>
          
          <div className={styles.hiringCollage}>
            <div className={`${styles.collageBox} ${styles.box1}`} />
            <div className={`${styles.collageBox} ${styles.box2}`} />
            <div className={`${styles.collageBox} ${styles.box3}`} />
            <div className={`${styles.collageBox} ${styles.box4}`} />
            <div className={`${styles.collageBox} ${styles.box5}`} />
          </div>
        </section>

      </main>
      <WorkTogetherMarquee/>
      <Footer />
    </>
  )
}
