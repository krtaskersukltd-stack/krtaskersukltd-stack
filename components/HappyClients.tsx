'use client'

import { motion } from 'framer-motion'
import styles from './HappyClients.module.css'

type QuotePart = {
  text: string
  accent?: boolean
}

type Client = {
  name: string
  role: string
  initial: string
  imageUrl: string
  avatarUrl: string
  quoteParts: QuotePart[]
}

const clients: Client[] = [
  {
    name: 'James Walker',
    role: 'Director of Operations',
    initial: 'JW',
    imageUrl:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=900&auto=format&fit=crop',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&h=160&auto=format&fit=crop',
    quoteParts: [
      { text: '“ ' },
      { text: 'KR Tasker', accent: true },
      { text: ' went above and beyond to make sure we got something we were happy with. ”' },
    ],
  },
  {
    name: 'Sophie Carter',
    role: 'Co-founder at Cyberdyne',
    initial: 'SC',
    imageUrl:
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=900&auto=format&fit=crop',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&h=160&auto=format&fit=crop',
    quoteParts: [
      { text: '“ We have a ' },
      { text: 'brand that truthfully', accent: true },
      { text: ' represents what we do. ”' },
    ],
  },
  {
    name: 'Sarah Jenkins',
    role: 'Marketing Lead at Apex',
    initial: 'SJ',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&h=160&auto=format&fit=crop',
    quoteParts: [
      { text: '“ I could recommend ' },
      { text: 'KR Tasker', accent: true },
      { text: '. They are absolutely enough. ”' },
    ],
  },
  {
    name: 'Liam O’Connor',
    role: 'Product Manager at RetailCo',
    initial: 'LO',
    imageUrl:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&h=160&auto=format&fit=crop',
    quoteParts: [
      { text: '“ Finally, ' },
      { text: 'an agency', accent: true },
      { text: ' that does exactly what they say they do. ”' },
    ],
  },
]

export default function HappyClients() {
  return (
    <section className={styles.happyClientsSection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.tag}>Hear it from our friends</span>
          <h2 className={styles.heading}>What Our Happy Clients Say About Us</h2>
        </header>

        <div className={styles.grid}>
          {clients.map((client, index) => (
            <motion.article
              key={client.name}
              className={styles.testimonial}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className={styles.card}
                style={{ backgroundImage: `url("${client.imageUrl}")` }}
              >
                <div className={styles.profileRow}>
                  <div
                    className={styles.avatar}
                    style={{ backgroundImage: `url("${client.avatarUrl}")` }}
                    aria-hidden="true"
                  >
                    <span>{client.initial}</span>
                  </div>

                  <div className={styles.meta}>
                    <p className={styles.name}>{client.name}</p>
                    <p className={styles.role}>{client.role}</p>
                  </div>
                </div>
              </div>

              <blockquote className={styles.quote}>
                {client.quoteParts.map((part, partIndex) => (
                  <span
                    key={`${client.name}-${partIndex}`}
                    className={part.accent ? styles.quoteAccent : undefined}
                  >
                    {part.text}
                  </span>
                ))}
              </blockquote>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}