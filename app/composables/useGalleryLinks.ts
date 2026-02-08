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

  const page = ref(1)
  const perPage = 30

  const { data, pending, error } = useAsyncData<ListResult<GalleryLink>>(
    () => `gallery_links-page-${page.value}`,
    async () => {
      return pb.list<GalleryLink>('gallery_links', {
        sort: '-date',
        page: page.value,
        perPage,
      })
    },
    { watch: [page] },
  )

  const items = computed(() => data.value?.items ?? [])
  const totalPages = computed(() => {
    if (!data.value) return 1
    return Math.max(1, Math.ceil(data.value.totalItems / perPage))
  })

  const next = () => {
    if (page.value < totalPages.value) page.value++
  }

  const prev = () => {
    if (page.value > 1) page.value--
  }

  return { items, pending, error, list: data, page, totalPages, next, prev }
}
