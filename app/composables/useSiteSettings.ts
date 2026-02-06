import type { Ref } from 'vue'

export interface SiteSettings {
  id: string
  collectionId?: string
  collectionName?: string
  homeTitle: string
  homeIntro?: string
  homeHeroImage?: string
  contactHeroImage?: string
  newsHeroImage?: string
  eventsHeroImage?: string
  galleryHeroImage?: string
  contactEmail?: string
  contactPhone?: string
  contactAddress?: string
  contactNotes?: string
}

export const useSiteSettings = () => {
  const pb = usePocketBase()

  const { data, pending, error } = useAsyncData<SiteSettings | null>('site_settings', async () => {
    return pb.first<SiteSettings>('site_settings')
  })

  const homeHeroImageUrl = computed(() => {
    if (!data.value || !data.value.homeHeroImage) return null
    return pb.fileUrl(data.value, data.value.homeHeroImage)
  })

  const contactHeroImageUrl = computed(() => {
    if (!data.value || !data.value.contactHeroImage) return null
    return pb.fileUrl(data.value, data.value.contactHeroImage)
  })

  const newsHeroImageUrl = computed(() => {
    if (!data.value || !data.value.newsHeroImage) return null
    return pb.fileUrl(data.value, data.value.newsHeroImage)
  })

  const eventsHeroImageUrl = computed(() => {
    if (!data.value || !data.value.eventsHeroImage) return null
    return pb.fileUrl(data.value, data.value.eventsHeroImage)
  })

  const galleryHeroImageUrl = computed(() => {
    if (!data.value || !data.value.galleryHeroImage) return null
    return pb.fileUrl(data.value, data.value.galleryHeroImage)
  })

  return {
    settings: data,
    pending,
    error,
    homeHeroImageUrl,
    contactHeroImageUrl,
    newsHeroImageUrl,
    eventsHeroImageUrl,
    galleryHeroImageUrl,
  }
}
