import type { Ref } from 'vue'
import { useCountdownSettings } from '~/composables/useCountdownSettings'

export interface CountdownState {
  label: string
  days: number
  hours: number
  minutes: number
  seconds: number
  finished: boolean
}

export const useCountdown = () => {
  const { settings } = useCountdownSettings()
  const state = ref<CountdownState | null>(null)
  let timer: ReturnType<typeof setInterval> | null = null

  const update = () => {
    if (!settings.value?.targetAt) {
      state.value = null
      return
    }

    const target = new Date(settings.value.targetAt).getTime()
    const now = Date.now()
    let diff = Math.max(0, target - now)

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    diff -= days * 1000 * 60 * 60 * 24
    const hours = Math.floor(diff / (1000 * 60 * 60))
    diff -= hours * 1000 * 60 * 60
    const minutes = Math.floor(diff / (1000 * 60))
    diff -= minutes * 1000 * 60
    const seconds = Math.floor(diff / 1000)

    state.value = {
      label: settings.value.label,
      days,
      hours,
      minutes,
      seconds,
      finished: target <= now,
    }
  }

  onMounted(() => {
    update()
    timer = setInterval(update, 1000)
  })

  onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
  })

  return { state }
}
