<template>
  <div class="app">
    <header class="app__header">
      <div class="app__brand">Fasnachtsverein Lostorf</div>
      <nav class="app__nav">
        <button class="app__nav-link" @click="scrollTo('home')">Home</button>
        <button class="app__nav-link" @click="scrollTo('news')">News</button>
        <button class="app__nav-link" @click="scrollTo('events')">Anlässe</button>
        <button class="app__nav-link" @click="scrollTo('gallery')">Galerie</button>
        <button class="app__nav-link" @click="scrollTo('contact')">Kontakt</button>
      </nav>
    </header>

    <main class="app__main">
      <section id="home" class="app__section app__section--primary">
        <HomeSection />
      </section>

      <section id="news" class="app__section">
        <NewsSection />
      </section>

      <section id="events" class="app__section">
        <EventsSection />
      </section>

      <section id="gallery" class="app__section">
        <GallerySection />
      </section>

      <section id="contact" class="app__section">
        <ContactSection />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import HomeSection from '~/components/sections/HomeSection.vue'
import NewsSection from '~/components/sections/NewsSection.vue'
import EventsSection from '~/components/sections/EventsSection.vue'
import GallerySection from '~/components/sections/GallerySection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at top, #2a2b4a, #090b12 55%);
  color: #fdfdfd;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;

  &__header {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(3, 7, 18, 0.85);
    backdrop-filter: blur(18px);
  }

  &__brand {
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  &__nav {
    display: flex;
    gap: 0.4rem;
  }

  &__nav-link {
    border-radius: 999px;
    padding: 0.35rem 0.8rem;
    border: 1px solid transparent;
    background: rgba(255, 255, 255, 0.02);
    color: inherit;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      border-color: rgba(255, 255, 255, 0.25);
      background: rgba(255, 255, 255, 0.06);
    }
  }

  &__main {
    flex: 1;
  }

  &__section {
    &--primary {
      padding-top: 2rem;
    }
  }
}
</style>
