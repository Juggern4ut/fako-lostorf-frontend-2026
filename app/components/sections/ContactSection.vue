<template>
  <section class="contact">
    <div class="contact__inner">
      <h2 class="contact__title">Kontakt</h2>
      <div class="contact__grid">
        <div class="contact__block contact__block--main">
          <h3 class="contact__subtitle">Fasnachtsverein Lostorf</h3>
          <p v-if="settings?.contactAddress" class="contact__text">
            <span v-for="(line, idx) in addressLines" :key="idx">{{ line }}<br /></span>
          </p>
          <p v-if="settings?.contactNotes" class="contact__notes" v-html="settings.contactNotes" />
        </div>

        <div class="contact__block contact__block--links">
          <div v-if="settings?.contactEmail" class="contact__row">
            <span class="contact__label">E-Mail</span>
            <a class="contact__value" :href="`mailto:${settings.contactEmail}`">{{ settings.contactEmail }}</a>
          </div>
          <div v-if="settings?.contactPhone" class="contact__row">
            <span class="contact__label">Telefon</span>
            <a class="contact__value" :href="`tel:${settings.contactPhone}`">{{ settings.contactPhone }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteSettings } from '~/composables/useSiteSettings'

const { settings } = useSiteSettings()

const addressLines = computed(() => {
  if (!settings.value?.contactAddress) return []
  return settings.value.contactAddress.split(/\r?\n/).filter(Boolean)
})
</script>

<style scoped lang="scss">
.contact {
  padding: 2.5rem 1.25rem 3rem;
  background: rgba(255, 255, 255, 0.65);

  &__inner {
    max-width: 980px;
    margin: 0 auto;
  }

  &__title {
    font-size: 1.6rem;
    margin-bottom: 1.25rem;
  }

  &__grid {
    display: grid;
    gap: 1.5rem;

    @media (min-width: 720px) {
      grid-template-columns: minmax(0, 2fr) minmax(0, 2fr);
      align-items: flex-start;
    }
  }

  &__block {
    padding: 1.1rem 1.25rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(148, 163, 184, 0.25);

    &--links {
      display: grid;
      gap: 0.9rem;
    }
  }

  &__subtitle {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  &__text {
    line-height: 1.7;
  }

  &__notes {
    margin-top: 0.8rem;
    line-height: 1.7;
  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  &__label {
    font-size: 0.9rem;
    opacity: 0.8;
  }

  &__value {
    font-size: 1rem;
    font-weight: 600;
    color: #fefefe;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
