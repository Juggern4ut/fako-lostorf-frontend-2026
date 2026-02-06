<template>
  <section class="gallery">
    <div class="gallery__inner">
      <div v-if="heroImageUrl" class="gallery__hero" :style="{ backgroundImage: `url(${heroImageUrl})` }" />
      <h2 class="gallery__title">Galerie</h2>
      <div v-if="pending" class="gallery__state">Lade Galerien…</div>
      <div v-else-if="error" class="gallery__state gallery__state--error">Galerien konnten nicht geladen werden.</div>
      <div v-else-if="items.length === 0" class="gallery__state">Aktuell sind keine Galerien erfasst.</div>

      <div v-else class="gallery__list">
        <article v-for="g in items" :key="g.id" class="gallery__item" @click="open(g.externalUrl)">
          <div v-if="g.coverImage" class="gallery__image" :style="{ backgroundImage: `url(${coverUrl(g)})` }" />
          <div class="gallery__content">
            <div class="gallery__meta">
              <span v-if="g.date" class="gallery__date">{{ formatDate(g.date) }}</span>
            </div>
            <h3 class="gallery__item-title">{{ g.title }}</h3>
            <button class="gallery__button" type="button">Galerie öffnen</button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGalleryLinks } from '~/composables/useGalleryLinks'
import type { GalleryLink } from '~/types/content'

const pb = usePocketBase()
const { items, pending, error } = useGalleryLinks()

const formatDate = (value?: string) => {
  if (!value) return ''
  const d = new Date(value)
  return d.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const coverUrl = (g: GalleryLink) => {
  if (!g.coverImage) return null
  return pb.fileUrl(g, g.coverImage)
}

const open = (url: string) => {
  if (!url) return
  window.open(url, '_blank', 'noopener')
}
</script>

<style scoped lang="scss">
.gallery {
  padding: 2.5rem 1.25rem 3.5rem;
  background: rgba(255, 255, 255, 0.65);

  @media (max-width: 640px) {
    padding-bottom: 2.25rem;
  }

  &__inner {
    max-width: 980px;
    margin: 0 auto;
  }

  &__hero {
    width: 100%;
    margin-bottom: 1.5rem;
    aspect-ratio: 16 / 5;
    border-radius: 18px;
    background-size: cover;
    background-position: center;
  }

  &__title {
    font-size: 1.6rem;
    margin-bottom: 1.25rem;
  }

  &__state {
    padding: 0.75rem 0;
    color: rgba(249, 250, 251, 0.8);

    &--error {
      color: #ffb4b4;
    }
  }

  &__list {
    display: grid;
    gap: 1.25rem;
  }

  &__item {
    display: grid;
    grid-template-columns: minmax(0, 2.2fr) minmax(0, 3fr);
    gap: 1.1rem;
    padding: 1.1rem 1.25rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(148, 163, 184, 0.25);
    cursor: pointer;

    @media (max-width: 720px) {
      grid-template-columns: 1fr;
    }
  }

  &__image {
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: 12px;
    background-size: cover;
    background-position: center;
  }

  &__content {
    display: grid;
    align-content: center;
    gap: 0.4rem;
  }

  &__meta {
    font-size: 0.9rem;
    color: rgba(249, 250, 251, 0.8);
  }

  &__item-title {
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
  }

  &__button {
    margin-top: 0.3rem;
    align-self: flex-start;
    border-radius: 999px;
    padding: 0.35rem 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.05);
    color: inherit;
    font-size: 0.85rem;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.12);
    }
  }
}
</style>
