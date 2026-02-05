<template>
  <div class="app">
    <header class="app__header">
      <div class="app__brand">Fasnachtsverein Lostorf</div>
      <nav class="app__nav">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="app__nav-link"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </header>

    <main class="app__main">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
const links = [
  { to: '/', label: 'Home' },
  { to: '/news', label: 'News' },
  { to: '/events', label: 'Anlässe' },
  { to: '/gallery', label: 'Galerie' },
  { to: '/contact', label: 'Kontakt' },
]
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
