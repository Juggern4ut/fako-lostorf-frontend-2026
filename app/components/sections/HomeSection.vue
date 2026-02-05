<template>
  <section class="home">
    <div class="home__inner">
      <div class="home__text-block">
        <h1 class="home__title">{{ settings?.homeTitle ?? fallbackTitle }}</h1>
        <p v-if="introHtml" class="home__intro" v-html="introHtml" />
      </div>
      <div v-if="heroImageUrl" class="home__image" :style="{ backgroundImage: `url(${heroImageUrl})` }" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteSettings } from '~/composables/useSiteSettings'

const { settings, heroImageUrl } = useSiteSettings()

const fallbackTitle = 'Willkommen beim Fasnachtsverein Lostorf'

const introHtml = computed(() => {
  if (!settings.value?.homeIntro) return null
  // PB editor liefert HTML; falls es Plaintext wäre, könnte man hier noch ersetzen
  return settings.value.homeIntro
})
</script>

<style scoped lang="scss">
.home {
  padding: 2.5rem 1.25rem;

  &__inner {
    max-width: 980px;
    margin: 0 auto;
    display: grid;
    gap: 2rem;
    align-items: center;

    @media (min-width: 800px) {
      grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    }
  }

  &__title {
    font-size: 2.1rem;
    margin-bottom: 1rem;
  }

  &__intro {
    line-height: 1.7;
    max-width: 40rem;
  }

  &__image {
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: 16px;
    background-size: cover;
    background-position: center;
    box-shadow: 0 18px 46px rgba(0, 0, 0, 0.45);
  }
}
</style>
