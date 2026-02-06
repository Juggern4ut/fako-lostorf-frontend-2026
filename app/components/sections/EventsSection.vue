<template>
  <section class="events">
    <div class="events__inner">
      <h2 class="events__title">Anlässe</h2>
      <div v-if="pending" class="events__state">Lade Anlässe…</div>
      <div v-else-if="error" class="events__state events__state--error">Anlässe konnten nicht geladen werden.</div>
      <div v-else-if="items.length === 0" class="events__state">Aktuell sind keine Anlässe erfasst.</div>

      <div v-else class="events__list">
        <article v-for="ev in items" :key="ev.id" class="events__item">
          <div v-if="ev.image" class="events__image" :style="{ backgroundImage: `url(${imageUrl(ev)})` }" />
          <div class="events__date-block">
            <span class="events__date">{{ formatDate(ev.startDate) }}</span>
            <span v-if="ev.location" class="events__location">{{ ev.location }}</span>
          </div>
          <div class="events__content">
            <h3 class="events__item-title">{{ ev.title }}</h3>
            <div v-if="ev.description" class="events__desc" v-html="ev.description" />
            <div v-if="ev.category" class="events__category">{{ ev.category }}</div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useEvents } from '~/composables/useEvents'
import { usePocketBase } from '~/composables/usePocketBase'

const pb = usePocketBase()
const { items, pending, error } = useEvents()

const imageUrl = (ev: any) => {
  if (!ev.image) return null
  return pb.fileUrl(ev, ev.image)
}

const formatDate = (value?: string) => {
  if (!value) return ''
  const d = new Date(value)
  return d.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>

<style scoped lang="scss">
.events {
  padding: 2.5rem 1.25rem;
  background: rgba(255, 255, 255, 0.65);

  @media (max-width: 640px) {
    padding-bottom: 2rem;
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
  }

  &__item {
    padding: 1.1rem 1.25rem 1.25rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(148, 163, 184, 0.25);
    display: grid;
    gap: 0.6rem;

    @media (min-width: 720px) {
      grid-template-columns: minmax(0, 1.6fr) minmax(0, 1.2fr) minmax(0, 3fr);
      align-items: flex-start;
    }
  }

  &__image {
    width: 100%;
    aspect-ratio: 3 / 2;
    border-radius: 12px;
    background-size: cover;
    background-position: center;
  }

  &__date-block {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-size: 0.9rem;
    color: rgba(55, 65, 81, 0.9);
  }

  &__location {
    font-size: 0.85rem;
  }

  &__item-title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  &__desc {
    line-height: 1.7;

    :deep(img) {
      max-width: 100%;
      height: auto;
    }
  }

  &__category {
    margin-top: 0.4rem;
    font-size: 0.85rem;
    opacity: 0.85;
  }
}
</style>
