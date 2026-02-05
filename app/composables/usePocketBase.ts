import type { Ref } from 'vue'

export interface ListResult<T> {
  page: number
  perPage: number
  totalItems: number
  items: T[]
}

export const usePocketBase = () => {
  const backendUrl = useBackendUrl()

  const list = async <T>(collection: string, params: Record<string, any> = {}): Promise<ListResult<T>> => {
    const query = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === '') continue
      query.append(key, String(value))
    }

    const url = `${backendUrl}/api/collections/${collection}/records${query.toString() ? `?${query.toString()}` : ''}`
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Fehler beim Laden von ${collection} (${res.status})`)
    }

    return res.json() as Promise<ListResult<T>>
  }

  const first = async <T>(collection: string): Promise<T | null> => {
    const result = await list<T>(collection, { page: 1, perPage: 1 })
    return result.items[0] ?? null
  }

  const fileUrl = (record: { collectionId?: string; collectionName?: string; id: string }, fileName: string) => {
    const col = record.collectionId || record.collectionName
    if (!col || !fileName) return null
    return `${backendUrl}/api/files/${col}/${record.id}/${encodeURIComponent(fileName)}`
  }

  return { backendUrl, list, first, fileUrl }
}
