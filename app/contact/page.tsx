import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import styles from './ContactPage.module.css'

export const metadata = {
  title: 'Contact Us | KR Tasker Digital',
  description: 'Get in touch with KR Tasker Digital. Let\'s build a smarter growth strategy together.',
}

export default function ContactPage() {
  return (
    <main className={styles.contactPage}>
      <Navbar />
      <div className={styles.contactWrapper}>
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
