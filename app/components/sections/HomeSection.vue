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
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteSettings } from '~/composables/useSiteSettings'

const { settings, heroImageUrl } = useSiteSettings()

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
  min-height: 100vh;
}

.home__hero {
  position: relative;
  min-height: 100vh;
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
  margin: 0 auto;
  color: rgba(249, 250, 251, 0.9);

  opacity: 0;
  transform: translateY(18px);
  animation: home-fade-in 900ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
  animation-delay: 0.55s;
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
