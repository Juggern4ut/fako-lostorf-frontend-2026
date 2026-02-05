import type { Ref } from 'vue'
import type { ListResult } from './usePocketBase'

export interface GalleryLink {
  id: string
  collectionId?: string
  collectionName?: string
  title: string
  date?: string
  coverImage?: string
  externalUrl: string
}

export const useGalleryLinks = () => {
  const pb = usePocketBase()

  const { data, pending, error } = useAsyncData<ListResult<GalleryLink>>('gallery_links', async () => {
    return pb.list<GalleryLink>('gallery_links', {
      sort: '-date',
      page: 1,
      perPage: 50,
    })
  })

  const items = computed(() => data.value?.items ?? [])

  return { items, pending, error, list: data }
}
