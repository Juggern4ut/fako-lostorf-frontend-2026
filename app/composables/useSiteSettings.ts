import type { Ref } from 'vue'

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

export const useSiteSettings = () => {
  const pb = usePocketBase()

  const { data, pending, error } = useAsyncData<SiteSettings | null>('site_settings', async () => {
    return pb.first<SiteSettings>('site_settings')
  })

  const heroImageUrl = computed(() => {
    if (!data.value || !data.value.homeHeroImage) return null
    return pb.fileUrl(data.value, data.value.homeHeroImage)
  })

  return { settings: data, pending, error, heroImageUrl }
}
