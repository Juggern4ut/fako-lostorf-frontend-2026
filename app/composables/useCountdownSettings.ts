import type { Ref } from 'vue'
import { usePocketBase } from '~/composables/usePocketBase'

export interface CountdownSettings {
  id: string
  collectionId?: string
  collectionName?: string
  label: string
  targetAt: string
}

export const useCountdownSettings = () => {
  const pb = usePocketBase()

  const { data, pending, error } = useAsyncData<CountdownSettings | null>('countdown_settings', async () => {
    return pb.first<CountdownSettings>('countdown_settings')
  })

  return { settings: data, pending, error }
}
