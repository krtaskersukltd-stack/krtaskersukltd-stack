'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import styles from './Navbar.module.css'
import type { ServiceRecord } from '@/lib/cms-types'

export interface SubServiceLink {
  title: string
  href: string
}

export interface MainServiceItem {
  id?: string
  title: string
  tagline: string
  href: string
  badge?: string
  image?: string
  subServices: SubServiceLink[]
}

const MAIN_SERVICES: MainServiceItem[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'Full-funnel performance and growth',
    href: '/services/digital-marketing',
    image: '/images/services/digital-marketing.png',
    subServices: [
      { title: 'Digital 360', href: '/services/digital-360' },
      { title: 'Social Media Marketing', href: '/services/social-media' },
      { title: 'PPC', href: '/services/ppc' },
    ],
  },
  {
    id: 'website-development',
    title: 'Website Development',
    tagline: 'Deliver your business to a wider audience',
    href: '/services/web-development',
    image: '/images/services/web-app-design.png',
    subServices: [
      { title: 'Website Design & Development', href: '/services/website-design-development' },
      { title: 'E-Commerce Web Development', href: '/services/ecommerce-web-development' },
      { title: 'B2B', href: '/services/b2b' },
      { title: 'SaaS', href: '/services/saas' },
      { title: 'Custom Web Development', href: '/services/custom-web-development' },
    ],
  },
  {
    id: 'graphics-design',
    title: 'Graphics Design',
    tagline: "Creating brands and visual experiences you're proud of",
    href: '/services/branding',
    image: '/images/services/graphic-branding.jpg',
    subServices: [
      { title: 'UI/UX Design', href: '/services/ui-ux-design' },
      { title: '3D Design & Automation', href: '/services/3d-design-automation' },
      { title: 'Graphic Design', href: '/services/graphic-design' },
      { title: 'Branding', href: '/services/branding' },
      { title: 'Logo Making', href: '/services/logo-making' },
    ],
  },
  {
    id: 'ai-automation',
    title: 'Ai Automation',
    tagline: 'Smart workflows and intelligent solutions',
    href: '/services/ai-solutions',
    image: '/images/services/ai-automation.jpg',
    subServices: [
      { title: 'AI Chatbot', href: '/services/ai-chatbot' },
      { title: 'AI Voice Agent', href: '/services/ai-voice-agent' },
      { title: 'CRM Automation', href: '/services/crm-automation' },
      { title: 'AI Integration', href: '/services/ai-integration' },
    ],
  },
  {
    id: 'amazon-ebay',
    title: 'Amazon / eBay',
    tagline: 'Marketplace growth, PPC & optimization',
    href: '/services/amazon-ebay',
    image: '/images/services/amazon-ebay.jpg',
    subServices: [
      { title: 'Full Service Management', href: '/services/full-service-management' },
      { title: 'Advertising (PPC) Management', href: '/services/advertising-ppc-management' },
      { title: 'Amazon SEO', href: '/services/amazon-seo' },
      { title: 'Amazon Account Audit', href: '/services/amazon-account-audit' },
      { title: 'Listing Optimization', href: '/services/listing-optimization' },
      { title: 'Account Suspension', href: '/services/account-suspension' },
    ],
  },
  {
    id: 'seo',
    title: 'SEO',
    tagline: 'Get your brand seen online',
    href: '/services/seo',
    image: '/images/services/seo-brand-strategy.png',
    subServices: [
      { title: 'Local SEO', href: '/services/local-seo' },
      { title: 'International SEO', href: '/services/international-seo' },
      { title: 'National SEO', href: '/services/national-seo' },
      { title: 'E-Commerce SEO', href: '/services/ecommerce-seo' },
      { title: 'Link Building', href: '/services/link-building' },
      { title: 'Lead Generation SEO', href: '/services/lead-gen-seo' },
      { title: 'Technical SEO', href: '/services/technical-seo' },
      { title: 'SEO Audit (Free)', href: '/services/seo-audit' },
    ],
  },
  {
    id: 'email-marketing',
    title: 'Email Marketing',
    tagline: 'Automated campaigns that convert',
    href: '/services/email-marketing',
    image: '/images/services/email-marketing.jpg',
    subServices: [
      { title: 'Email Automation', href: '/services/email-automation' },
      { title: 'Email Campaign Management', href: '/services/email-campaign-management' },
      { title: 'Email Marketing Strategy', href: '/services/email-marketing-strategy' },
      { title: 'Email Design', href: '/services/email-design' },
    ],
  },
]

export interface NavLinkItem {
  title: string
  href: string
}

export const BUSINESS_OBJECTIVES: NavLinkItem[] = [
  { title: 'Increase Brand Awareness', href: '/business-objectives/increase-brand-awareness' },
  { title: 'Improve Search Engine Rankings', href: '/business-objectives/improve-search-engine-rankings' },
  { title: 'Lead Generation', href: '/business-objectives/lead-generation' },
  { title: 'Increase Website Traffic', href: '/business-objectives/increase-website-traffic' },
  { title: 'Increase Conversions', href: '/business-objectives/increase-conversions' },
  { title: 'Social Media Engagement', href: '/business-objectives/social-media-engagement' },
  { title: 'Customer Retention', href: '/business-objectives/customer-retention' },
]

export const INDUSTRIES_COLUMNS: NavLinkItem[][] = [
  [
    { title: 'Dental', href: '/industries/dental' },
    { title: 'Healthcare', href: '/industries/healthcare' },
    { title: 'Law Firms', href: '/industries/law-firms' },
    { title: 'Real Estate', href: '/industries/real-estate' },
    { title: 'SaaS', href: '/industries/saas' },
    { title: 'B2B', href: '/industries/b2b' },
    { title: 'eCommerce', href: '/industries/ecommerce' },
    { title: 'Construction', href: '/industries/construction' },
  ],
  [
    { title: 'Hotels & Hospitality', href: '/industries/hotels-hospitality' },
    { title: 'Restaurants', href: '/industries/restaurants' },
    { title: 'Beauty', href: '/industries/beauty' },
    { title: 'Hair Salons', href: '/industries/hair-salons' },
    { title: 'Accountants', href: '/industries/accountants' },
    { title: 'Insurance', href: '/industries/insurance' },
    { title: 'Higher Education', href: '/industries/higher-education' },
    { title: 'Startups & Scale-ups', href: '/industries/startups-scale-ups' },
  ],
  [
    { title: 'CBD', href: '/industries/cbd' },
    { title: 'Chiropractors', href: '/industries/chiropractors' },
    { title: 'Pest Control', href: '/industries/pest-control' },
    { title: 'Airbnb', href: '/industries/airbnb' },
    { title: 'Solar', href: '/industries/solar' },
    { title: 'Retail', href: '/industries/retail' },
    { title: 'AI Marketing', href: '/industries/ai-marketing' },
    { title: 'White Label', href: '/industries/white-label' },
  ],
]

export interface AmazonColumnGroup {
  header: string
  items: NavLinkItem[]
}

export const AMAZON_COLUMNS: AmazonColumnGroup[] = [
  {
    header: 'Full Service',
    items: [
      { title: 'Full service management', href: '/services/full-service-management' },
      { title: 'Advertising (PPC) management', href: '/services/advertising-ppc-management' },
      { title: 'Amazon SEO', href: '/services/amazon-seo' },
      { title: 'Amazon account audit', href: '/services/amazon-account-audit' },
      { title: 'SOPs', href: '/services/sops' },
      { title: 'All services', href: '/services/amazon-ebay' },
      { title: 'Consulting', href: '/services/amazon-consulting' },
      { title: 'Book a coaching call', href: '/services/book-a-coaching-call' },
    ],
  },
  {
    header: 'Design',
    items: [
      { title: 'Brand guidelines', href: '/services/brand-guidelines' },
      { title: 'Brand story', href: '/services/brand-story' },
      { title: 'Brand store', href: '/services/brand-store' },
      { title: 'Listing images', href: '/services/listing-images' },
      { title: 'Enhanced brand content A+', href: '/services/enhanced-brand-content-a-plus' },
      { title: 'Main image CTR hack', href: '/services/main-image-ctr-hack' },
      { title: 'Listing optimization', href: '/services/listing-optimization' },
      { title: 'Full listing optimization', href: '/services/full-listing-optimization' },
    ],
  },
  {
    header: 'Troubleshooting',
    items: [
      { title: 'Listing reinstatement', href: '/services/listing-reinstatement' },
      { title: 'Account suspension', href: '/services/account-suspension' },
      { title: 'PPC Advertising audit', href: '/services/ppc-advertising-audit' },
      { title: 'Brand name change', href: '/services/brand-name-change' },
      { title: 'Troubleshooting hours', href: '/services/troubleshooting-hours' },
      { title: 'UPC to GS1 change', href: '/services/upc-to-gs1-change' },
      { title: 'Remote fulfillment with FBA setup', href: '/services/remote-fulfillment-fba-setup' },
    ],
  },
]

export const AMAZON_MENU_ITEMS: MainServiceItem[] = [
  {
    id: 'full-service',
    title: 'Full Service',
    tagline: 'End-to-end marketplace management & scaling',
    href: '/services/amazon-ebay',
    subServices: [
      { title: 'Full service management', href: '/services/full-service-management' },
      { title: 'Advertising (PPC) management', href: '/services/advertising-ppc-management' },
      { title: 'Amazon SEO', href: '/services/amazon-seo' },
      { title: 'Amazon account audit', href: '/services/amazon-account-audit' },
      { title: 'SOPs', href: '/services/sops' },
      { title: 'All services', href: '/services/amazon-ebay' },
      { title: 'Consulting', href: '/services/amazon-consulting' },
      { title: 'Book a coaching call', href: '/services/book-a-coaching-call' },
    ],
  },
  {
    id: 'amazon-design',
    title: 'Design',
    tagline: 'High-converting creative & brand storefronts',
    href: '/services/amazon-ebay',
    subServices: [
      { title: 'Brand guidelines', href: '/services/brand-guidelines' },
      { title: 'Brand story', href: '/services/brand-story' },
      { title: 'Brand store', href: '/services/brand-store' },
      { title: 'Listing images', href: '/services/listing-images' },
      { title: 'Enhanced brand content A+', href: '/services/enhanced-brand-content-a-plus' },
      { title: 'Main image CTR hack', href: '/services/main-image-ctr-hack' },
      { title: 'Listing optimization', href: '/services/listing-optimization' },
      { title: 'Full listing optimization', href: '/services/full-listing-optimization' },
    ],
  },
  {
    id: 'amazon-troubleshooting',
    title: 'Troubleshooting',
    tagline: 'Reinstatements, audit & technical account fixes',
    href: '/services/amazon-ebay',
    subServices: [
      { title: 'Listing reinstatement', href: '/services/listing-reinstatement' },
      { title: 'Account suspension', href: '/services/account-suspension' },
      { title: 'PPC Advertising audit', href: '/services/ppc-advertising-audit' },
      { title: 'Brand name change', href: '/services/brand-name-change' },
      { title: 'Troubleshooting hours', href: '/services/troubleshooting-hours' },
      { title: 'UPC to GS1 change', href: '/services/upc-to-gs1-change' },
      { title: 'Remote fulfillment with FBA setup', href: '/services/remote-fulfillment-fba-setup' },
    ],
  },
]

export const OBJECTIVES_MENU_ITEMS: MainServiceItem[] = [
  {
    id: 'traffic-visibility',
    title: 'Traffic & Visibility',
    tagline: 'Scale brand reach & organic search dominance',
    href: '/services',
    subServices: [
      { title: 'Increase Brand Awareness', href: '/business-objectives/increase-brand-awareness' },
      { title: 'Improve Search Engine Rankings', href: '/business-objectives/improve-search-engine-rankings' },
      { title: 'Increase Website Traffic', href: '/business-objectives/increase-website-traffic' },
    ],
  },
  {
    id: 'leads-conversions',
    title: 'Leads & Conversions',
    tagline: 'High-intent pipelines & ROI acceleration',
    href: '/services',
    subServices: [
      { title: 'Lead Generation', href: '/business-objectives/lead-generation' },
      { title: 'Increase Conversions', href: '/business-objectives/increase-conversions' },
    ],
  },
  {
    id: 'engagement-retention',
    title: 'Engagement & Retention',
    tagline: 'Long-term community & customer loyalty',
    href: '/services',
    subServices: [
      { title: 'Social Media Engagement', href: '/business-objectives/social-media-engagement' },
      { title: 'Customer Retention', href: '/business-objectives/customer-retention' },
    ],
  },
]

export const INDUSTRIES_MENU_ITEMS: MainServiceItem[] = [
  {
    id: 'corporate-professional',
    title: 'Professional & B2B',
    tagline: 'Enterprise positioning & client acquisition',
    href: '/work',
    subServices: [
      { title: 'Law Firms', href: '/industries/law-firms' },
      { title: 'Accountants', href: '/industries/accountants' },
      { title: 'Insurance', href: '/industries/insurance' },
      { title: 'Real Estate', href: '/industries/real-estate' },
      { title: 'Construction', href: '/industries/construction' },
      { title: 'B2B', href: '/industries/b2b' },
    ],
  },
  {
    id: 'health-medical',
    title: 'Health & Wellness',
    tagline: 'Patient bookings & trusted local authority',
    href: '/work',
    subServices: [
      { title: 'Dental', href: '/industries/dental' },
      { title: 'Healthcare', href: '/industries/healthcare' },
      { title: 'Chiropractors', href: '/industries/chiropractors' },
      { title: 'Beauty', href: '/industries/beauty' },
      { title: 'Hair Salons', href: '/industries/hair-salons' },
      { title: 'CBD', href: '/industries/cbd' },
    ],
  },
  {
    id: 'tech-ecommerce',
    title: 'Tech & E-Commerce',
    tagline: 'Scale web apps & retail checkout conversion',
    href: '/work',
    subServices: [
      { title: 'SaaS', href: '/industries/saas' },
      { title: 'eCommerce', href: '/industries/ecommerce' },
      { title: 'AI Marketing', href: '/industries/ai-marketing' },
      { title: 'Startups & Scale-ups', href: '/industries/startups-scale-ups' },
      { title: 'White Label', href: '/industries/white-label' },
    ],
  },
  {
    id: 'hospitality-local',
    title: 'Hospitality & Local',
    tagline: 'Direct reservations & neighborhood reach',
    href: '/work',
    subServices: [
      { title: 'Hotels & Hospitality', href: '/industries/hotels-hospitality' },
      { title: 'Restaurants', href: '/industries/restaurants' },
      { title: 'Airbnb', href: '/industries/airbnb' },
      { title: 'Pest Control', href: '/industries/pest-control' },
      { title: 'Solar', href: '/industries/solar' },
      { title: 'Retail', href: '/industries/retail' },
      { title: 'Higher Education', href: '/industries/higher-education' },
    ],
  },
]

export const RESULTS_MENU_ITEMS: MainServiceItem[] = [
  {
    id: 'case-studies',
    title: 'Case Studies',
    tagline: 'Real growth stories, verified metrics & client ROI',
    href: '/work',
    subServices: [
      { title: 'All Case Studies', href: '/work' },
      { title: 'E-Commerce & Amazon Growth', href: '/work' },
      { title: 'Websites & Apps Development', href: '/work' },
      { title: 'SEO & Organic Scale', href: '/work' },
      { title: 'Paid Advertising & PPC', href: '/work' },
    ],
  },
  {
    id: 'testimonials',
    title: 'Testimonials',
    tagline: '5-star client reviews & verified transformations',
    href: '/#testimonials',
    subServices: [
      { title: 'Client Reviews & Feedback', href: '/#testimonials' },
      { title: 'Google 5.0 Star Ratings', href: '/#testimonials' },
      { title: 'Video & Written Testimonials', href: '/#testimonials' },
      { title: 'Brand Founder Stories', href: '/#testimonials' },
    ],
  },
]

function TwoColumnDropdown({
  items,
  activeId,
  setActiveId,
  onClose,
  defaultViewAllHref,
}: {
  items: MainServiceItem[]
  activeId: string
  setActiveId: (id: string) => void
  onClose: () => void
  defaultViewAllHref: string
}) {
  const activeItem =
    items.find(
      (s) =>
        (s.id && s.id === activeId) ||
        (s.title || '').toLowerCase() === (activeId || '').toLowerCase()
    ) || items[0]

  return (
    <div className={styles.servicesDropdownCard}>
      {/* Left Column: Categories List */}
      <div className={styles.mainServicesList}>
        {items.map((item) => {
          const isCurrent =
            (item.id && item.id === activeId) ||
            item.title.toLowerCase() === (activeId || '').toLowerCase()

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`${styles.mainServiceItem} ${
                isCurrent ? styles.activeServiceItem : ''
              }`}
              onMouseEnter={() =>
                setActiveId(item.id || item.title.toLowerCase())
              }
              onClick={onClose}
            >
              <span className={styles.mainServiceTitle}>{item.title}</span>
              <div className={styles.circleBadge}>
                <svg
                  className={styles.circleChevron}
                  viewBox="0 0 24 24"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Right Column: Sub-Services Display Box */}
      <div className={styles.subServicesCard}>
        <div className={styles.subServicesHeader}>
          <div className={styles.subServicesHeaderTop}>
            <span className={styles.subServicesTitle}>
              {activeItem.subServices?.[0]?.title || activeItem.title}
            </span>
            {activeItem.badge && (
              <span className={styles.subServicesBadge}>{activeItem.badge}</span>
            )}
          </div>
          <span className={styles.subServicesSubtitle}>
            {activeItem.tagline || 'Specialized Solutions & Pages:'}
          </span>
        </div>

        {/* Sub-Services Interactive Links List */}
        <div className={styles.subServicesList}>
          {activeItem.subServices && activeItem.subServices.length > 0 ? (
            activeItem.subServices.slice(1).map((sub) => (
              <Link
                key={sub.title}
                href={sub.href}
                className={styles.subServiceItem}
                onClick={onClose}
              >
                <span className={styles.subServiceDot} />
                <span className={styles.subServiceText}>{sub.title}</span>
              </Link>
            ))
          ) : (
            <Link
              href={activeItem.href}
              className={styles.subServiceItem}
              onClick={onClose}
            >
              <span className={styles.subServiceDot} />
              <span className={styles.subServiceText}>
                Explore {activeItem.title}
              </span>
            </Link>
          )}
        </div>

        <div className={styles.subServicesFooter}>
          {activeItem.image && (
            <div className={styles.dropdownPreviewImage}>
              <Image
                src={activeItem.image}
                alt=""
                fill
                sizes="110px"
                className={styles.dropdownPreviewImg}
              />
            </div>
          )}
          <div className={styles.dropdownPreviewCopy}>
            <p>{activeItem.tagline}</p>
            <Link
              href={activeItem.href || defaultViewAllHref}
              className={styles.viewAllServicesLink}
              onClick={onClose}
            >
              View all services
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MainIndustryItem {
  title: string
  tagline: string
  href: string
}

const MAIN_INDUSTRIES: MainIndustryItem[] = [
  {
    title: 'B2B & Enterprise',
    tagline: 'High-intent lead pipelines & corporate positioning',
    href: '/work',
  },
  {
    title: 'B2C & Consumer',
    tagline: 'Direct-to-consumer reach & brand loyalty',
    href: '/work',
  },
  {
    title: 'E-Commerce & Retail',
    tagline: 'Scalable Shopify Plus stores & checkout growth',
    href: '/services/shopify-development',
  },
  {
    title: 'SaaS & Technology',
    tagline: 'Custom web apps, internal tools & client portals',
    href: '/services/websites-apps',
  },
]

interface ServiceCategory {
  title: string
  items: { label: string; href: string; badge?: string }[]
}

const DEFAULT_CORE_SERVICES: ServiceCategory[] = [
  {
    title: 'Digital Marketing',
    items: [
      { label: 'Digital 360', href: '/services/digital-360' },
      { label: 'SEO & Organic Growth', href: '/services/seo' },
      { label: 'PPC & Paid Search', href: '/services/ppc' },
      { label: 'Social Media Marketing', href: '/services/social-media' },
      { label: 'Email Marketing', href: '/services/email-marketing' },
      { label: 'Marketing Strategy', href: '/services/marketing' },
    ],
  },
  {
    title: 'Websites & Apps',
    items: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Shopify Development', href: '/services/shopify-development' },
      { label: 'Websites & Apps', href: '/services/websites-apps' },
      { label: 'Branding & Identity', href: '/services/branding' },
      { label: 'Graphic Design', href: '/services/graphic-design' },
      { label: 'Amazon & eBay', href: '/services/amazon-ebay' },
    ],
  },
  {
    title: 'AI & Automation',
    items: [
      { label: 'AI Solutions', href: '/services/ai-solutions', badge: 'POPULAR' },
      { label: 'AI Automation', href: '/services/ai-automation' },
      { label: 'Business Consultancy', href: '/services/business-consultancy' },
    ],
  },
]

type DropdownKey = 'services' | 'objectives' | 'industries' | 'amazon' | 'results' | null

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(false)
  const [pillStyle, setPillStyle] = useState<{
    backgroundColor?: string
    borderColor?: string
  }>({})
  const [coreServices, setCoreServices] = useState<ServiceCategory[]>(DEFAULT_CORE_SERVICES)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [servicesMenu, setServicesMenu] = useState<MainServiceItem[]>(MAIN_SERVICES)
  const [industriesMenu, setIndustriesMenu] = useState<MainIndustryItem[]>(MAIN_INDUSTRIES)
  const [hoveredServiceId, setHoveredServiceId] = useState<string>('digital-marketing')
  const [hoveredAmazonId, setHoveredAmazonId] = useState<string>('full-service')
  const [hoveredObjectivesId, setHoveredObjectivesId] = useState<string>('traffic-visibility')
  const [hoveredIndustriesId, setHoveredIndustriesId] = useState<string>('corporate-professional')
  const [hoveredResultsId, setHoveredResultsId] = useState<string>('case-studies')
  const [servicesCard, setServicesCard] = useState({
    title: 'View all Services',
    subtitle: "We don't stop there, check out all the services we offer here at KR Tasker",
    href: '/services',
    image: '/images/services/web-app-design.png',
  })
  const [industriesCard, setIndustriesCard] = useState({
    title: 'Explore Case Studies',
    subtitle: 'See how we deliver measurable organic scale and revenue across every sector',
    href: '/work',
    image: '/images/services/digital-marketing.png',
  })

  // Dynamically load Navigation and Services from CMS / Sanity
  useEffect(() => {
    fetch('/api/cms/navigation')
      .then((res) => (res.ok ? res.json() : []))
      .then((navItems: any[]) => {
        if (Array.isArray(navItems) && navItems.length > 0) {
          const srvNav = navItems.find(
            (n) => (n.label || '').toLowerCase() === 'services' || n.href === '/services'
          )
          if (srvNav && Array.isArray(srvNav.dropdownItems) && srvNav.dropdownItems.length > 0) {
            const merged = srvNav.dropdownItems.map((cmsItem: any) => {
              const matched = MAIN_SERVICES.find(
                (m) =>
                  (m.title || '').toLowerCase() === (cmsItem.title || '').toLowerCase() ||
                  m.id === cmsItem.id
              )
              return {
                ...cmsItem,
                id: cmsItem.id || matched?.id || (cmsItem.title || '').toLowerCase().replace(/\s+/g, '-'),
                subServices:
                  cmsItem.subServices && cmsItem.subServices.length > 0
                    ? cmsItem.subServices
                    : matched?.subServices || [],
                image: cmsItem.image || matched?.image || '/images/services/web-app-design.png',
              }
            })
            setServicesMenu(merged)
          }
          if (srvNav && srvNav.featuredCard?.title) {
            setServicesCard({
              title: srvNav.featuredCard.title,
              subtitle: srvNav.featuredCard.subtitle || '',
              href: srvNav.featuredCard.href || '/services',
              image: srvNav.featuredCard.image || '/images/services/web-app-design.png',
            })
          }

          const indNav = navItems.find(
            (n) => (n.label || '').toLowerCase() === 'industries' || n.href === '/work'
          )
          if (indNav && Array.isArray(indNav.dropdownItems) && indNav.dropdownItems.length > 0) {
            setIndustriesMenu(indNav.dropdownItems)
          }
          if (indNav && indNav.featuredCard?.title) {
            setIndustriesCard({
              title: indNav.featuredCard.title,
              subtitle: indNav.featuredCard.subtitle || '',
              href: indNav.featuredCard.href || '/work',
              image: indNav.featuredCard.image || '/images/services/digital-marketing.png',
            })
          }
        }
      })
      .catch((err) => console.error('Error loading navigation items:', err))

    fetch('/api/cms/services')
      .then((res) => (res.ok ? res.json() : []))
      .then((services: ServiceRecord[]) => {
        if (Array.isArray(services) && services.length > 0) {
          const published = services.filter((s) => s.status === 'published')
          if (published.length === 0) return

          // Base curated lists
          const digitalMarketingItems = [
            { label: 'Digital 360', href: '/services/digital-360' },
            { label: 'SEO & Organic Growth', href: '/services/seo' },
            { label: 'PPC & Paid Search', href: '/services/ppc' },
            { label: 'Social Media Marketing', href: '/services/social-media' },
            { label: 'Email Marketing', href: '/services/email-marketing' },
            { label: 'Marketing Strategy', href: '/services/marketing' },
          ]

          const websitesAppsItems = [
            { label: 'Web Development', href: '/services/web-development' },
            { label: 'Shopify Development', href: '/services/shopify-development' },
            { label: 'Websites & Apps', href: '/services/websites-apps' },
            { label: 'Branding & Identity', href: '/services/branding' },
            { label: 'Graphic Design', href: '/services/graphic-design' },
            { label: 'Amazon & eBay', href: '/services/amazon-ebay' },
          ]

          const aiAutomationItems = [
            { label: 'AI Solutions', href: '/services/ai-solutions', badge: 'POPULAR' },
            { label: 'AI Automation', href: '/services/ai-automation' },
            { label: 'Business Consultancy', href: '/services/business-consultancy' },
          ]

          const existingHrefs = new Set([
            ...digitalMarketingItems.map((i) => i.href),
            ...websitesAppsItems.map((i) => i.href),
            ...aiAutomationItems.map((i) => i.href),
          ])

          published.forEach((s) => {
            const rawSlug = s.slug.startsWith('/') ? s.slug : `/services/${s.slug}`
            if (existingHrefs.has(rawSlug)) return

            const rawCat = (s.eyebrow || '').toLowerCase()
            const rawName = (s.name || '').toLowerCase()
            const badge =
              /ai-solutions/i.test(s.slug) || /popular/i.test(s.eyebrow || '') ? 'POPULAR' : undefined
            const newItem = { label: s.name, href: rawSlug, badge }

            if (
              /marketing|seo|ppc|social|email|growth|paid/i.test(rawCat) ||
              /marketing|seo|ppc|social|email|growth/i.test(rawName)
            ) {
              digitalMarketingItems.push(newItem)
            } else if (
              /ai|auto|intel|agent|consult|bot/i.test(rawCat) ||
              /ai|auto|intel|agent|consult/i.test(rawName)
            ) {
              aiAutomationItems.push(newItem)
            } else {
              websitesAppsItems.push(newItem)
            }
            existingHrefs.add(rawSlug)
          })

          setCoreServices([
            { title: 'Digital Marketing', items: digitalMarketingItems },
            { title: 'Websites & Apps', items: websitesAppsItems },
            { title: 'AI & Automation', items: aiAutomationItems },
          ])
        }
      })
      .catch((err) => console.error('Error loading navigation services:', err))
  }, [])

  useEffect(() => {
    const handleScrollAndTheme = () => {
      if (typeof window === 'undefined') return

      const scrollY = window.scrollY

      const isPastTop = scrollY > 20
      setScrolled(isPastTop)

      if (scrollY > 300) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }

      const navMid = navRef.current ? navRef.current.getBoundingClientRect().top + 35 : 35
      const checkX = window.innerWidth / 2

      let isDark = false
      let detectedBg = ''
      let rVal = 248
      let gVal = 247
      let bVal = 242

      // 1. Query elements at checkpoint under the navbar
      if (document.elementsFromPoint) {
        const elements = document.elementsFromPoint(checkX, navMid)
        for (const el of elements) {
          if (
            el.closest('header') ||
            el.tagName.toLowerCase() === 'header' ||
            el.classList.contains(styles.header) ||
            el.classList.contains(styles.pillNav)
          ) {
            continue
          }

          let curr: HTMLElement | null = el as HTMLElement
          while (curr && curr !== document.body && curr !== document.documentElement) {
            if (
              curr.getAttribute('data-theme') === 'dark' ||
              curr.classList.contains('darkSection') ||
              curr.classList.contains('dark') ||
              curr.tagName.toLowerCase() === 'footer'
            ) {
              isDark = true
              rVal = 12
              gVal = 70
              bVal = 81
              break
            }

            const bg = window.getComputedStyle(curr).backgroundColor
            if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
              const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
              if (match) {
                const r = parseInt(match[1], 10)
                const g = parseInt(match[2], 10)
                const b = parseInt(match[3], 10)
                const a = match[4] !== undefined ? parseFloat(match[4]) : 1
                if (a > 0.35) {
                  rVal = r
                  gVal = g
                  bVal = b
                  const luminance = 0.299 * r + 0.587 * g + 0.114 * b
                  if (luminance < 140) {
                    isDark = true
                  }
                  detectedBg = bg
                  break
                }
              }
            }
            curr = curr.parentElement
          }
          if (detectedBg || isDark) break
        }
      }

      // 2. Fallback check intersecting dark elements by bounding box
      if (!isDark && !detectedBg) {
        const darkCandidates = document.querySelectorAll(
          '[data-theme="dark"], .darkSection, footer, section[class*="dark"], section[class*="footer"], div[class*="contactCard"], section[class*="contact"]'
        )
        for (let i = 0; i < darkCandidates.length; i++) {
          const rect = darkCandidates[i].getBoundingClientRect()
          if (rect.top <= navMid && rect.bottom >= navMid) {
            isDark = true
            rVal = 12
            gVal = 70
            bVal = 81
            break
          }
        }
      }

      setIsDarkSection(isDark)

      if (isDark) {
        setPillStyle({
          backgroundColor: `rgba(${rVal}, ${gVal}, ${bVal}, 0.45)`,
          borderColor: 'rgba(255, 255, 255, 0.28)',
        })
      } else {
        setPillStyle({
          backgroundColor: `rgba(${rVal}, ${gVal}, ${bVal}, 0.65)`,
          borderColor: 'rgba(12, 70, 81, 0.14)',
        })
      }
    }

    handleScrollAndTheme()
    window.addEventListener('scroll', handleScrollAndTheme, { passive: true })
    window.addEventListener('resize', handleScrollAndTheme, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScrollAndTheme)
      window.removeEventListener('resize', handleScrollAndTheme)
    }
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null)
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMouseEnter = (key: DropdownKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(key)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 280)
  }

  const toggleDropdown = (key: DropdownKey) => {
    setActiveDropdown(prev => (prev === key ? null : key))
  }

  const toggleAccordion = (key: string) => {
    setMobileAccordion(prev => (prev === key ? null : key))
  }

  // Active hovered service for the right-hand panel
  const activeService =
    servicesMenu.find(
      (s) =>
        (s.id && s.id === hoveredServiceId) ||
        (s.title || '').toLowerCase() === (hoveredServiceId || '').toLowerCase()
    ) || servicesMenu[0]

  return (
    <header
      ref={navRef}
      className={`${styles.header} ${pathname === '/' ? styles.homeHeader : ''} ${scrolled ? styles.scrolled : ''} ${
        isHidden ? styles.hidden : ''
      } ${isDarkSection ? styles.darkTheme : ''}`}
      onMouseLeave={handleMouseLeave}
    >
      {pathname === '/' && (
        <Link
          href="/contact"
          className={styles.availabilityNotch}
          onClick={(e) => {
            if (pathname === '/') {
              const contactEl = document.getElementById('contact')
              if (contactEl) {
                e.preventDefault()
                contactEl.scrollIntoView({ behavior: 'smooth' })
              }
            }
          }}
          aria-label="Available For New Projects - Contact Us"
        >
          <svg
            className={styles.notchSvg}
            viewBox="0 0 270 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 0 C8 1 16 4 22 10 C24 19 30 26 38 31 C42 33 45 34 49 34 H221 C225 34 228 33 232 31 C240 26 246 19 248 10 C254 4 262 1 270 0 Z"
              className={styles.notchPath}
            />
          </svg>
          <span className={styles.pulseDot} aria-hidden="true">
            <span className={styles.pulseRing} />
            <span className={styles.pulseCore} />
          </span>
          <span className={styles.notchText}>Available For New Projects</span>
        </Link>
      )}
      <div className={styles.container}>
        {/* Left: Brand Logo */}
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        {/* Center/Right: Navigation Menu matching inspiration */}
        <nav
          className={styles.mainNav}
          aria-label="Main Navigation"
        >
          <ul className={styles.navList}>
            {/* 1. Services (clickable link to /services + hover dropdown) */}
            <li
              className={styles.navItem}
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                onClick={() => setActiveDropdown(null)}
                className={`${styles.navLink} ${styles.navLinkBtn} ${
                  activeDropdown === 'services' || pathname.startsWith('/services')
                    ? styles.activeNav
                    : ''
                }`}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
              >
                <span>Services</span>
                <svg
                  className={`${styles.navChevron} ${
                    activeDropdown === 'services' ? styles.chevronRotated : ''
                  }`}
                  viewBox="0 0 10 6"
                  width="10"
                  height="6"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.servicesDropdownContainer}
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    onMouseEnter={() => handleMouseEnter('services')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <TwoColumnDropdown
                      items={servicesMenu}
                      activeId={hoveredServiceId}
                      setActiveId={setHoveredServiceId}
                      onClose={() => setActiveDropdown(null)}
                      defaultViewAllHref="/services"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* 2. Amazon (hover dropdown matching 2-panel style) */}
            <li
              className={styles.navItem}
              onMouseEnter={() => handleMouseEnter('amazon')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services/amazon-ebay"
                onClick={() => setActiveDropdown(null)}
                className={`${styles.navLink} ${styles.navLinkBtn} ${
                  activeDropdown === 'amazon' ? styles.activeNav : ''
                }`}
                aria-expanded={activeDropdown === 'amazon'}
                aria-haspopup="true"
              >
                <span>Amazon</span>
                <svg
                  className={`${styles.navChevron} ${
                    activeDropdown === 'amazon' ? styles.chevronRotated : ''
                  }`}
                  viewBox="0 0 10 6"
                  width="10"
                  height="6"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <AnimatePresence>
                {activeDropdown === 'amazon' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`${styles.servicesDropdownContainer} ${styles.amazonDropdownContainer}`}
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    onMouseEnter={() => handleMouseEnter('amazon')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <TwoColumnDropdown
                      items={AMAZON_MENU_ITEMS}
                      activeId={hoveredAmazonId}
                      setActiveId={setHoveredAmazonId}
                      onClose={() => setActiveDropdown(null)}
                      defaultViewAllHref="/services/amazon-ebay"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* 3. Business Objectives (hover dropdown matching 2-panel style) */}
            <li
              className={styles.navItem}
              onMouseEnter={() => handleMouseEnter('objectives')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                onClick={() => setActiveDropdown(null)}
                className={`${styles.navLink} ${styles.navLinkBtn} ${
                  activeDropdown === 'objectives' ? styles.activeNav : ''
                }`}
                aria-expanded={activeDropdown === 'objectives'}
                aria-haspopup="true"
              >
                <span>Business Objectives</span>
                <svg
                  className={`${styles.navChevron} ${
                    activeDropdown === 'objectives' ? styles.chevronRotated : ''
                  }`}
                  viewBox="0 0 10 6"
                  width="10"
                  height="6"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <AnimatePresence>
                {activeDropdown === 'objectives' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`${styles.servicesDropdownContainer} ${styles.objectivesDropdownContainer}`}
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    onMouseEnter={() => handleMouseEnter('objectives')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <TwoColumnDropdown
                      items={OBJECTIVES_MENU_ITEMS}
                      activeId={hoveredObjectivesId}
                      setActiveId={setHoveredObjectivesId}
                      onClose={() => setActiveDropdown(null)}
                      defaultViewAllHref="/services"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* 4. Industries (hover dropdown matching 2-panel style) */}
            <li
              className={styles.navItem}
              onMouseEnter={() => handleMouseEnter('industries')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/work"
                onClick={() => setActiveDropdown(null)}
                className={`${styles.navLink} ${styles.navLinkBtn} ${
                  activeDropdown === 'industries' ? styles.activeNav : ''
                }`}
                aria-expanded={activeDropdown === 'industries'}
                aria-haspopup="true"
              >
                <span>Industries</span>
                <svg
                  className={`${styles.navChevron} ${
                    activeDropdown === 'industries' ? styles.chevronRotated : ''
                  }`}
                  viewBox="0 0 10 6"
                  width="10"
                  height="6"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <AnimatePresence>
                {activeDropdown === 'industries' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`${styles.servicesDropdownContainer} ${styles.industriesDropdownContainer}`}
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    onMouseEnter={() => handleMouseEnter('industries')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <TwoColumnDropdown
                      items={INDUSTRIES_MENU_ITEMS}
                      activeId={hoveredIndustriesId}
                      setActiveId={setHoveredIndustriesId}
                      onClose={() => setActiveDropdown(null)}
                      defaultViewAllHref="/work"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* 5. Results (hover dropdown matching 2-panel style) */}
            <li
              className={styles.navItem}
              onMouseEnter={() => handleMouseEnter('results')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/work"
                onClick={() => setActiveDropdown(null)}
                className={`${styles.navLink} ${styles.navLinkBtn} ${
                  activeDropdown === 'results' || pathname.startsWith('/work')
                    ? styles.activeNav
                    : ''
                }`}
                aria-expanded={activeDropdown === 'results'}
                aria-haspopup="true"
              >
                <span>Results</span>
                <svg
                  className={`${styles.navChevron} ${
                    activeDropdown === 'results' ? styles.chevronRotated : ''
                  }`}
                  viewBox="0 0 10 6"
                  width="10"
                  height="6"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <AnimatePresence>
                {activeDropdown === 'results' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`${styles.servicesDropdownContainer} ${styles.resultsDropdownContainer}`}
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    onMouseEnter={() => handleMouseEnter('results')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <TwoColumnDropdown
                      items={RESULTS_MENU_ITEMS}
                      activeId={hoveredResultsId}
                      setActiveId={setHoveredResultsId}
                      onClose={() => setActiveDropdown(null)}
                      defaultViewAllHref="/work"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* 4. Direct Link: About */}
            <li className={styles.navItem}>
              <Link
                href="/about"
                className={`${styles.navLink} ${pathname === '/about' ? styles.activeNav : ''}`}
              >
                About
              </Link>
            </li>


            {/* 7. Free Audit (Red Highlight) */}
            <li className={styles.navItem}>
              <Link
                href="/contact"
                className={`${styles.navLink} ${styles.freeAuditLink}`}
                onClick={(e) => {
                  if (pathname === '/') {
                    const contactEl = document.getElementById('contact')
                    if (contactEl) {
                      e.preventDefault()
                      contactEl.scrollIntoView({ behavior: 'smooth' })
                    }
                  }
                }}
              >
                Free Audit
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right: Contact Us CTA Button */}
        <div className={styles.actionWrapper}>
          <Link href="/contact" className={styles.contactBtn}>
            Contact Us
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerHidden : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`${styles.hamburgerBar} ${mobileMenuOpen ? styles.barOpenTop : ''}`} />
            <span className={`${styles.hamburgerBar} ${mobileMenuOpen ? styles.barOpenMid : ''}`} />
            <span className={`${styles.hamburgerBar} ${mobileMenuOpen ? styles.barOpenBot : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.mobileBackdrop}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className={styles.mobileDrawer}
              data-lenis-prevent="true"
            >
              <div className={styles.drawerHeader}>
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerCloseBtn}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className={styles.drawerBody}>
                {/* 1. Services Accordion */}
                <div className={styles.drawerAccordion}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('services')}
                    className={styles.accordionHeader}
                  >
                    <span className={styles.drawerHeaderLabel}>
                      Services
                    </span>
                    <span
                      className={`${styles.accordionIcon} ${
                        mobileAccordion === 'services' ? styles.accordionIconOpen : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'services' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.accordionContent}
                      >
                        {servicesMenu.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={styles.mobileSubLink}
                          >
                            <span className={styles.mobileMainTitle}>{item.title}</span>
                            <span className={styles.mobileMainTagline}>{item.tagline}</span>
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          onClick={() => setMobileMenuOpen(false)}
                          className={styles.mobileViewAllLink}
                        >
                          View all Services →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Amazon Accordion */}
                <div className={styles.drawerAccordion}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('amazon')}
                    className={styles.accordionHeader}
                  >
                    <span className={styles.drawerHeaderLabel}>
                      Amazon
                    </span>
                    <span
                      className={`${styles.accordionIcon} ${
                        mobileAccordion === 'amazon' ? styles.accordionIconOpen : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'amazon' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.accordionContent}
                      >
                        {AMAZON_COLUMNS.flatMap(col => col.items).map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={styles.mobileSubLink}
                          >
                            <span className={styles.mobileMainTitle}>{item.title}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Business Objectives Accordion */}
                <div className={styles.drawerAccordion}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('objectives')}
                    className={styles.accordionHeader}
                  >
                    <span className={styles.drawerHeaderLabel}>
                      Business Objectives
                    </span>
                    <span
                      className={`${styles.accordionIcon} ${
                        mobileAccordion === 'objectives' ? styles.accordionIconOpen : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'objectives' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.accordionContent}
                      >
                        {BUSINESS_OBJECTIVES.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={styles.mobileSubLink}
                          >
                            <span className={styles.mobileMainTitle}>{item.title}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Industries Accordion */}
                <div className={styles.drawerAccordion}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('industries')}
                    className={styles.accordionHeader}
                  >
                    <span className={styles.drawerHeaderLabel}>
                      Industries
                    </span>
                    <span
                      className={`${styles.accordionIcon} ${
                        mobileAccordion === 'industries' ? styles.accordionIconOpen : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'industries' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.accordionContent}
                      >
                        {INDUSTRIES_COLUMNS.flat().map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={styles.mobileSubLink}
                          >
                            <span className={styles.mobileMainTitle}>{item.title}</span>
                          </Link>
                        ))}
                        <Link
                          href="/work"
                          onClick={() => setMobileMenuOpen(false)}
                          className={styles.mobileViewAllLink}
                        >
                          Explore all Case Studies →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. Results Accordion */}
                <div className={styles.drawerAccordion}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion('results')}
                    className={styles.accordionHeader}
                  >
                    <span className={styles.drawerHeaderLabel}>
                      Results
                    </span>
                    <span
                      className={`${styles.accordionIcon} ${
                        mobileAccordion === 'results' ? styles.accordionIconOpen : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'results' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.accordionContent}
                      >
                        <Link
                          href="/work"
                          onClick={() => setMobileMenuOpen(false)}
                          className={styles.mobileSubLink}
                        >
                          <span className={styles.mobileMainTitle}>Case Studies</span>
                          <span className={styles.mobileMainTagline}>Real growth stories & metrics</span>
                        </Link>
                        <Link
                          href="/#testimonials"
                          onClick={() => {
                            setMobileMenuOpen(false)
                            if (pathname === '/') {
                              const el = document.getElementById('testimonials')
                              if (el) el.scrollIntoView({ behavior: 'smooth' })
                            }
                          }}
                          className={styles.mobileSubLink}
                        >
                          <span className={styles.mobileMainTitle}>Testimonials</span>
                          <span className={styles.mobileMainTagline}>Client reviews & Google 5.0 ratings</span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Direct Links matching inspiration */}
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerDirectLink}
                >
                  About
                </Link>


                <Link
                  href="/contact"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (pathname === '/') {
                      const contactEl = document.getElementById('contact')
                      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className={`${styles.drawerDirectLink} ${styles.drawerFreeAudit}`}
                >
                  Free Audit
                </Link>
              </div>

              <div className={styles.drawerFooter}>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerCtaBtn}
                >
                  Contact Us
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
