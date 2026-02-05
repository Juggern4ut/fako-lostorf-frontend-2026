<template>
  <section class="home">
    <div
      class="home__hero"
      :style="heroBackgroundStyle"
    >
      <div class="home__overlay" />

      <div class="home__content">
        <h1 class="home__title">{{ settings?.homeTitle ?? fallbackTitle }}</h1>
        <p v-if="introHtml" class="home__intro" v-html="introHtml" />

        <div v-if="countdown" class="home__countdown">
          <div class="home__countdown-label">{{ countdown.label }}</div>
          <div class="home__countdown-grid" v-if="!countdown.finished">
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
  </section>
</template>

<script setup lang="ts">
import { useSiteSettings } from '~/composables/useSiteSettings'
import { useCountdown } from '~/composables/useCountdown'

const { settings, heroImageUrl } = useSiteSettings()
const { state: countdown } = useCountdown()

const fallbackTitle = 'Willkommen beim Fasnachtsverein Lostorf'

const introHtml = computed(() => {
  if (!settings.value?.homeIntro) return null
  // PB editor liefert HTML
  return settings.value.homeIntro
})

const heroBackgroundStyle = computed(() => {
  if (heroImageUrl.value) {
    return {
      backgroundImage: `url(${heroImageUrl.value})`,
    }
  }

  // Fallback, falls noch kein Bild hinterlegt ist
  return {
    backgroundImage:
      'radial-gradient(circle at top, #2a2b4a, #090b12 60%)',
  }
})
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

.home__overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(3, 7, 18, 0.9), rgba(3, 7, 18, 0.6)),
    radial-gradient(circle at top, rgba(0, 0, 0, 0.2), transparent 60%);
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
  color: rgba(249, 250, 251, 0.9);

  opacity: 0;
  transform: translateY(18px);
  animation: home-fade-in 900ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
  animation-delay: 0.55s;
}

.home__countdown {
  margin-top: 0.4rem;
  opacity: 0;
  transform: translateY(20px);
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
</style>
