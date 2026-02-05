import type { Ref } from 'vue'
import type { ListResult } from './usePocketBase'

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

export const useNews = () => {
  const pb = usePocketBase()

  const { data, pending, error } = useAsyncData<ListResult<NewsItem>>('news', async () => {
    return pb.list<NewsItem>('news', {
      sort: '-publishedAt',
      page: 1,
      perPage: 20,
    })
  })

  const items = computed(() => data.value?.items ?? [])

  return { items, pending, error, list: data }
}
