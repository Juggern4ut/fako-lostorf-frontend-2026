export interface SiteSettings {
  id: string
  collectionId?: string
  collectionName?: string
  homeTitle: string
  homeIntro?: string
  homeHeroImage?: string
  contactEmail?: string
  contactPhone?: string
  contactAddress?: string
  contactNotes?: string
}

export interface NewsItem {
  id: string
  collectionId?: string
  collectionName?: string
  title: string
  slug?: string
  body?: string
  publishedAt?: string
  heroImage?: string
  isPinned?: boolean
}

export interface EventItem {
  id: string
  collectionId?: string
  collectionName?: string
  title: string
  description?: string
  startDate: string
  endDate?: string
  location?: string
  category?: string
  image?: string
  isHighlight?: boolean
}

export interface GalleryLink {
  id: string
  collectionId?: string
  collectionName?: string
  title: string
  date?: string
  coverImage?: string
  externalUrl: string
}
