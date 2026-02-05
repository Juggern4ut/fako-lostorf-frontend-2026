import type { Ref } from 'vue'
import type { ListResult } from './usePocketBase'

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

export const useEvents = () => {
  const pb = usePocketBase()

  const { data, pending, error } = useAsyncData<ListResult<EventItem>>('events', async () => {
    return pb.list<EventItem>('events', {
      sort: 'startDate',
      page: 1,
      perPage: 50,
    })
  })

  const items = computed(() => data.value?.items ?? [])

  const upcoming = computed(() => {
    const now = new Date().toISOString()
    return items.value.filter((e) => e.startDate >= now)
  })

  return { items, upcoming, pending, error, list: data }
}
