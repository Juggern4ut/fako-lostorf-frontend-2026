<template>
  <section class="news">
    <div class="news__inner">
      <div v-if="heroImageUrl" class="news__hero" :style="{ backgroundImage: `url(${heroImageUrl})` }" />
      <h2 class="news__title">News</h2>
      <div v-if="pending" class="news__state">Lade News…</div>
      <div v-else-if="error" class="news__state news__state--error">News konnten nicht geladen werden.</div>
      <div v-else-if="items.length === 0" class="news__state">Aktuell sind keine News vorhanden.</div>

      <div v-else class="news__list">
        <article v-for="item in items" :key="item.id" class="news__item">
          <div v-if="item.heroImage" class="news__image" :style="{ backgroundImage: `url(${heroUrl(item)})` }" />
          <div class="news__meta">
            <span v-if="item.publishedAt" class="news__date">{{ formatDate(item.publishedAt) }}</span>
            <span v-if="item.isPinned" class="news__badge">Highlight</span>
          </div>
          <h3 class="news__item-title">{{ item.title }}</h3>
          <div v-if="item.body" class="news__body" v-html="item.body" />
        </article>

        <div v-if="totalPages > 1" class="news__pagination">
          <button class="news__page-btn" type="button" :disabled="page <= 1" @click="prev">
            Zurück
          </button>
          <span class="news__page-info">Seite {{ page }} / {{ totalPages }}</span>
          <button class="news__page-btn" type="button" :disabled="page >= totalPages" @click="next">
            Weiter
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useNews } from '~/composables/useNews'
import { usePocketBase } from '~/composables/usePocketBase'
import { useSiteSettings } from '~/composables/useSiteSettings'

const pb = usePocketBase()
const { heroImageUrl } = useSiteSettings()
const { items, pending, error, page, totalPages, next, prev } = useNews()

const heroUrl = (item: any) => {
  if (!item.heroImage) return null
  return pb.fileUrl(item, item.heroImage)
}

const formatDate = (value?: string) => {
  if (!value) return ''
  const d = new Date(value)
  return d.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>

<style scoped lang="scss">
.news {
  padding: 2.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.65);

  @media (max-width: 640px) {
    padding-bottom: 2rem;
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

    @media (min-width: 900px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__item {
    padding: 0.9rem 1rem 1.05rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(148, 163, 184, 0.25);
    display: grid;
    gap: 0.6rem;
    font-size: 0.95rem;
  }

  &__image {
    width: 100%;
    aspect-ratio: 3 / 1;
    border-radius: 12px;
    background-size: cover;
    background-position: center;
  }

  &__meta {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin: 0.35rem 0 0.3rem;
    font-size: 0.82rem;
    color: rgba(55, 65, 81, 0.9);
  }

  &__date {
    font-weight: 600;
  }

  &__badge {
    border-radius: 999px;
    padding: 0.1rem 0.55rem;
    border: 1px solid rgba(255, 255, 255, 0.45);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__item-title {
    font-size: 1.05rem;
    margin: 0.15rem 0 0.45rem;
  }

  &__body {
    line-height: 1.6;

    :deep(img) {
      max-width: 100%;
      height: auto;
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
