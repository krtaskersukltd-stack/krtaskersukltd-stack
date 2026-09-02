import { groq } from 'next-sanity'

// 1. SERVICES
export const SERVICES_QUERY = groq`
  *[_type == "service" && (!defined(status) || status == "published")] | order(sortOrder asc) {
    _id,
    id,
    name,
    "slug": slug.current,
    status,
    sortOrder,
    eyebrow,
    heroHeading,
    heroDescription,
    heroCtaText,
    introHeading,
    introContent,
    "featuredImage": featuredImage.asset->url,
    features[] {
      id,
      title,
      description,
      sortOrder
    },
    metrics[] {
      value,
      label
    },
    seo {
      metaTitle,
      metaDescription,
      h1,
      focusKeyword,
      indexStatus,
      followStatus
    },
    _updatedAt
  }
`

export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    id,
    name,
    "slug": slug.current,
    status,
    sortOrder,
    eyebrow,
    heroHeading,
    heroDescription,
    heroCtaText,
    introHeading,
    introContent,
    "featuredImage": featuredImage.asset->url,
    features[] {
      id,
      title,
      description,
      sortOrder
    },
    metrics[] {
      value,
      label
    },
    seo {
      metaTitle,
      metaDescription,
      h1,
      focusKeyword,
      indexStatus,
      followStatus
    },
    _updatedAt
  }
`

// 2. BLOG POSTS
export const POSTS_QUERY = groq`
  *[_type == "post" && (!defined(status) || status == "published")] | order(publishDate desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    authorName,
    authorRole,
    authorImage,
    status,
    publishDate,
    excerpt,
    readingTime,
    featuredImage,
    tags,
    _updatedAt
  }
`

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    authorName,
    authorRole,
    authorImage,
    status,
    publishDate,
    excerpt,
    readingTime,
    featuredImage,
    featuredImageAlt,
    content,
    tags,
    seo {
      metaTitle,
      metaDescription,
      h1,
      focusKeyword,
      indexStatus,
      followStatus
    },
    _updatedAt
  }
`

// 3. CASE STUDIES / WORK
export const WORK_QUERY = groq`
  *[_type == "caseStudy" && (!defined(status) || status == "published")] | order(sortOrder asc) {
    _id,
    client,
    title,
    "slug": slug.current,
    year,
    category,
    "featuredImage": coalesce(featuredImage.asset->url, featuredImage),
    featuredImageAlt,
    shortDescription,
    status,
    sortOrder,
    overview,
    challenge,
    solution,
    results,
    metrics[] {
      value,
      label
    },
    seo {
      metaTitle,
      metaDescription,
      h1,
      focusKeyword,
      indexStatus,
      followStatus
    },
    _updatedAt
  }
`

export const CASE_STUDY_BY_SLUG_QUERY = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    client,
    title,
    "slug": slug.current,
    year,
    category,
    "featuredImage": coalesce(featuredImage.asset->url, featuredImage),
    featuredImageAlt,
    shortDescription,
    status,
    sortOrder,
    overview,
    challenge,
    solution,
    results,
    metrics[] {
      value,
      label
    },
    seo {
      metaTitle,
      metaDescription,
      h1,
      focusKeyword,
      indexStatus,
      followStatus
    },
    _updatedAt
  }
`

// 4. TEAM MEMBERS
export const TEAM_QUERY = groq`
  *[_type == "teamMember" && (!defined(status) || status == "published")] | order(sortOrder asc) {
    _id,
    name,
    role,
    photo,
    shortBio,
    linkedinUrl,
    twitterUrl,
    sortOrder,
    status
  }
`

// 5. GLOBAL SETTINGS
export const SETTINGS_QUERY = groq`
  *[_type == "settings"][0] {
    siteName,
    defaultTitleTemplate,
    defaultMetaDescription,
    ctaHeading,
    ctaDescription,
    ctaButtonText,
    ctaButtonLink,
    footerPhone,
    footerEmail,
    footerAddress,
    footerCopyright,
    socialLinkedin,
    socialTwitter,
    socialInstagram
  }
`

// 6. CUSTOM PAGES
export const PAGES_QUERY = groq`
  *[_type == "page" && (!defined(status) || status == "published")] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    template,
    "featuredImage": featuredImage.asset->url,
    featuredImageAlt: featuredImage.alt,
    content,
    status,
    seo {
      metaTitle,
      metaDescription,
      focusKeyword
    },
    _updatedAt
  }
`

export const PAGE_BY_SLUG_QUERY = groq`
  *[_type == "page" && (slug.current == $slug || slug.current == "/" + $slug || "/" + slug.current == $slug)][0] {
    _id,
    title,
    "slug": slug.current,
    template,
    "featuredImage": featuredImage.asset->url,
    featuredImageAlt: featuredImage.alt,
    content,
    status,
    seo {
      metaTitle,
      metaDescription,
      focusKeyword
    },
    _updatedAt
  }
`

// 7. NAVIGATION MENU
export const NAVIGATION_QUERY = groq`
  *[_type == "navigation" && (isVisible == true || !defined(isVisible))] | order(sortOrder asc) {
    _id,
    label,
    href,
    sortOrder,
    isVisible
  }
`

