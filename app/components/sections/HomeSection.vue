<template>
  <section class="home">
    <div v-if="ready" class="home__hero" :style="heroBackgroundStyle">
      <div
        v-if="homeHeroImageUrl"
        class="home__bg-image"
        :class="{ 'home__bg-image--visible': imageVisible }"
        :style="{ backgroundImage: `url(${homeHeroImageUrl})` }"
      />
      <div class="home__overlay" />

      <div class="home__content">
        <h1 class="home__title">{{ settings?.homeTitle ?? fallbackTitle }}</h1>
        <p v-if="introHtml" class="home__intro" v-html="introHtml" />

        <div class="home__countdown" :class="{ 'home__countdown--ready': countdown }">
          <div v-if="countdown" class="home__countdown-label">{{ countdown.label }}</div>
          <div v-if="countdown && !countdown.finished" class="home__countdown-grid">
            <div class="home__countdown-part home__countdown-part--days">
              <div class="home__countdown-value">{{ countdown.days }}</div>
              <div class="home__countdown-unit">Tage</div>
            </div>
            <div class="home__countdown-part home__countdown-part--hours">
              <div class="home__countdown-value">{{ countdown.hours.toString().padStart(2, '0') }}</div>
              <div class="home__countdown-unit">Stunden</div>
            </div>
            <div class="home__countdown-part home__countdown-part--minutes">
              <div class="home__countdown-value">{{ countdown.minutes.toString().padStart(2, '0') }}</div>
              <div class="home__countdown-unit">Minuten</div>
            </div>
            <div class="home__countdown-part home__countdown-part--seconds">
              <div class="home__countdown-value">{{ countdown.seconds.toString().padStart(2, '0') }}</div>
              <div class="home__countdown-unit">Sekunden</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="home__loader">
      <div class="home__loader-inner">
        <div class="home__spinner" />
        <div class="home__loader-text">Lade Startseite…</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteSettings } from '~/composables/useSiteSettings'
import { useCountdown } from '~/composables/useCountdown'

const { settings, homeHeroImageUrl } = useSiteSettings()
const { state: countdown } = useCountdown()

const ready = ref(false)
const imageVisible = ref(false)

const fallbackTitle = 'Willkommen beim Fasnachtsverein Lostorf'

const introHtml = computed(() => {
  if (!settings.value?.homeIntro) return null
  // PB editor liefert HTML
  return settings.value.homeIntro
})

const heroBackgroundStyle = computed(() => {
  // Basis-Gradient im Hintergrund, Bild wird in separatem Layer gerendert
  return {
    backgroundImage: 'radial-gradient(circle at top, #2a2b4a, #090b12 60%)',
  }
})

const ensureReady = async () => {
  if (!settings.value) return

  if (homeHeroImageUrl.value) {
    await new Promise<void>((resolve) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => resolve()
      img.src = homeHeroImageUrl.value as string
    })
  }

  ready.value = true

  // Bild erst nach dem Text einblenden
  if (homeHeroImageUrl.value) {
    setTimeout(() => {
      imageVisible.value = true
    }, 350)
  }
}

watch(
  () => ({ settings: settings.value, hero: homeHeroImageUrl.value }),
  async (val, oldVal) => {
    if (!val.settings) return
    if (!oldVal?.settings && val.settings) {
      await ensureReady()
    }
  },
  { immediate: true, deep: true },
)
</script>

<style scoped lang="scss">
.home {
  min-height: calc(100vh - var(--header-height, 0px));
}

.home__hero {
  position: relative;
  box-sizing: border-box;
  min-height: calc(100vh - var(--header-height, 0px));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background-size: cover;
  background-position: center;
}

.home__bg-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 900ms ease-in-out;
}

.home__bg-image--visible {
  opacity: 1;
}

.home__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4)),
    radial-gradient(circle at top, rgba(254, 249, 195, 0.45), transparent 60%);
}

.home__content {
  position: relative;
  max-width: 880px;
  margin: 0 auto;
  text-align: center;
  z-index: 1;
}

.home__title {
  font-size: clamp(2.4rem, 4vw, 3.2rem);
  margin-bottom: 1.2rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  opacity: 0;
  transform: translateY(16px);
  animation: home-fade-in 900ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
  animation-delay: 0.15s;
}

.home__intro {
  line-height: 1.7;
  max-width: 46rem;
  margin: 0 auto 1.8rem;
  color: #4b5563;

  opacity: 0;
  transform: translateY(18px);
  animation: home-fade-in 900ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
  animation-delay: 0.55s;

  :deep(img) {
    max-width: 100%;
    height: auto;
  }
}

.home__countdown {
  margin-top: 0.4rem;
  min-height: 4.6rem;
  opacity: 0;
  transform: translateY(20px);
}

.home__countdown--ready {
  animation: home-fade-in 900ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
  animation-delay: 0.95s;
}

.home__countdown-label {
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
}

.home__countdown-grid {
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  gap: 1.5rem;
  font-size: 0.95rem;

  @media (max-width: 520px) {
    grid-auto-flow: row;
    justify-items: center;
  }
}

.home__countdown-part {
  text-align: center;
}

.home__countdown-value {
  font-size: 1.4rem;
  font-weight: 700;
}

.home__countdown-part--days .home__countdown-value {
  color: #f97373;
}

.home__countdown-part--hours .home__countdown-value {
  color: #facc15;
}

.home__countdown-part--minutes .home__countdown-value {
  color: #4ade80;
}

.home__countdown-part--seconds .home__countdown-value {
  color: #38bdf8;
}

.home__countdown-unit {
  margin-top: 0.15rem;
  font-size: 0.85rem;
}

.home__loader {
  min-height: calc(100vh - var(--header-height, 0px));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background: radial-gradient(circle at top, #fff7ed, #ffedd5 55%);
}

.home__loader-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #4b5563;
}

.home__spinner {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 3px solid rgba(249, 115, 22, 0.25);
  border-top-color: rgba(249, 115, 22, 0.9);
  animation: home-spin 900ms linear infinite;
}

.home__loader-text {
  font-size: 0.95rem;
}

@keyframes home-fade-in {
  0% {
    opacity: 0;
    transform: translateY(16px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes home-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
