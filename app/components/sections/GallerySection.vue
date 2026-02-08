<template>
  <section class="gallery">
    <HeroImage :image-url="galleryHeroImageUrl" compact />
    <div class="gallery__inner">
      <h2 class="gallery__title">Galerie</h2>
      <div v-if="pending" class="gallery__state">Lade Galerien…</div>
      <div v-else-if="error" class="gallery__state gallery__state--error">Galerien konnten nicht geladen werden.</div>
      <div v-else-if="items.length === 0" class="gallery__state">Aktuell sind keine Galerien erfasst.</div>

      <div v-else class="gallery__list">
        <article v-for="g in items" :key="g.id" class="gallery__item" @click="open(g.externalUrl)">
          <div
            v-if="g.coverImage"
            class="gallery__image"
            :style="{ backgroundImage: `url(${coverUrl(g)})` }"
          >
            <div class="gallery__overlay">
              <div class="gallery__meta">
                <span v-if="g.date" class="gallery__date">{{ formatDate(g.date) }}</span>
              </div>
              <h3 class="gallery__item-title">{{ g.title }}</h3>
              <button class="gallery__button" type="button">Galerie öffnen</button>
            </div>
          </div>
        </article>

        <div v-if="totalPages > 1" class="gallery__pagination">
          <button class="gallery__page-btn" type="button" :disabled="page <= 1" @click.stop="prev">
            Zurück
          </button>
          <span class="gallery__page-info">Seite {{ page }} / {{ totalPages }}</span>
          <button class="gallery__page-btn" type="button" :disabled="page >= totalPages" @click.stop="next">
            Weiter
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGalleryLinks } from '~/composables/useGalleryLinks'
import type { GalleryLink } from '~/types/content'
import { useSiteSettings } from '~/composables/useSiteSettings'
import HeroImage from '~/components/HeroImage.vue'

const pb = usePocketBase()
const { galleryHeroImageUrl } = useSiteSettings()
const { items, pending, error, page, totalPages, next, prev } = useGalleryLinks()

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
  padding: 0 1.25rem 3.5rem;
  background: rgba(255, 255, 255, 0.65);

  @media (max-width: 640px) {
    padding-bottom: 2.25rem;
  }

  &__inner {
    max-width: 980px;
    margin: 0 auto;
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
    gap: 1.1rem;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__item {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    min-height: 180px;
  }

  &__image {
    width: 100%;
    height: 100%;
    aspect-ratio: 4 / 3;
    background-size: cover;
    background-position: center;
    position: relative;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0.9rem 1rem;
    background: linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.9));
    color: #f9fafb;
  }

  &__meta {
    font-size: 0.85rem;
    opacity: 0.85;
    margin-bottom: 0.25rem;
  }

  &__item-title {
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 0.35rem;
  }

  &__button {
    align-self: flex-start;
    border-radius: 999px;
    padding: 0.3rem 0.8rem;
    border: 1px solid rgba(248, 250, 252, 0.75);
    background: rgba(15, 23, 42, 0.6);
    color: #f9fafb;
    font-size: 0.8rem;
    cursor: pointer;

    &:hover {
      background: rgba(15, 23, 42, 0.8);
    }
  }

  &__pagination {
    margin-top: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }

  &__page-btn {
    border-radius: 999px;
    padding: 0.45rem 0.9rem;
    border: 1px solid rgba(148, 163, 184, 0.7);
    background: rgba(255, 255, 255, 0.9);
    font-size: 0.85rem;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }

  &__page-info {
    font-size: 0.85rem;
    color: rgba(55, 65, 81, 0.9);
  }
}
</style>
