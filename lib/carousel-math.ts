/**
 * Helper utilities and data structures for 3D Carousel animations
 */

export interface CarouselItem {
  id: number
  label: string
  imageUrl: string
}

export const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 1,
    label: 'Web Design',
    imageUrl:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 2,
    label: 'Branding',
    imageUrl:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 3,
    label: 'UI/UX',
    imageUrl:
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 4,
    label: 'Development',
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 5,
    label: 'SEO Strategy',
    imageUrl:
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 6,
    label: 'Marketing',
    imageUrl:
      'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 7,
    label: 'Analytics',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 8,
    label: 'E-Commerce',
    imageUrl:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 9,
    label: 'Content Strategy',
    imageUrl:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 10,
    label: 'Social Media',
    imageUrl:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 11,
    label: 'Creative Direction',
    imageUrl:
      'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 12,
    label: 'Mobile Experiences',
    imageUrl:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 13,
    label: 'Campaigns',
    imageUrl:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 14,
    label: 'Digital Growth',
    imageUrl:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 15,
    label: 'Brand Experiences',
    imageUrl:
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 16,
    label: 'Digital Innovation',
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&h=500&fit=crop',
  },
  {
    id: 17,
    label: 'Business Strategy',
    imageUrl:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=400&h=500&fit=crop',
  },
]

export const DEG2RAD = Math.PI / 180

export function round(value: number): number {
  return Math.round(value * 10000) / 10000
}

export function getShortestDirection(fromAngle: number, toAngle: number): number {
  const diff = (toAngle - fromAngle) % 360
  return diff > 180 ? diff - 360 : diff < -180 ? diff + 360 : diff
}
