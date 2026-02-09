<template>
  <div class="app" :class="{ 'app--menu-open': menuOpen }">
    <header class="app__header">
      <div class="app__brand">
        <img src="https://fako-lostorf.ch/templates/web/img/logo.png" alt="Lostorfer Fasnacht" class="app__logo" />
        <span class="app__brand-text">Fasnachtsverein Lostorf</span>
      </div>

      <button
        class="app__burger"
        type="button"
        aria-label="Navigation öffnen"
        @click="menuOpen = !menuOpen"
      >
        <span class="app__burger-line" />
        <span class="app__burger-line" />
        <span class="app__burger-line" />
      </button>

      <nav class="app__nav">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="app__nav-link"
          :class="{ 'app__nav-link--active': route.path === link.to }"
          @click="menuOpen = false"
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

const route = useRoute()
const menuOpen = ref(false)
</script>

<style scoped lang="scss">
:global(body) {
  margin: 0;
  overflow-x: hidden;
}

.app {
  --header-height: 72px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at top, #fff7ed, #ffedd5 55%);
  color: #334155;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;

  &__header {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.9rem 1.25rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.25);
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(18px);
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
  }

  &__logo {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    object-fit: cover;
  }

  &__brand-text {
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  &__nav {
    display: flex;
    gap: 0.4rem;

    @media (max-width: 720px) {
      position: fixed;
      inset: 0 0 0 auto;
      width: 240px;
      height: 100vh;
      box-sizing: border-box;
      flex-direction: column;
      padding: 4rem 1.25rem 1.5rem;
      background: rgba(255, 255, 255, 0.98);
      border-left: 1px solid rgba(148, 163, 184, 0.25);
      transform: translateX(100%);
      transition: transform 220ms ease-out;
      z-index: 20;
    }
  }

  &__nav-link {
    border-radius: 999px;
    padding: 0.35rem 0.8rem;
    border: 1px solid transparent;
    background: rgba(251, 146, 60, 0.06);
    color: inherit;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      border-color: rgba(251, 146, 60, 0.8);
      background: rgba(251, 146, 60, 0.16);
    }

    &--active {
      border-color: rgba(251, 146, 60, 1);
      background: rgba(251, 146, 60, 0.24);
    }

    @media (max-width: 720px) {
      display: block;
      text-align: right;
      padding-inline: 0.9rem;
    }
  }

  &__burger {
    display: none;

    @media (max-width: 720px) {
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.26rem;
      width: 2.8rem;
      height: 2.8rem;
      margin-left: 0.8rem;
      border-radius: 999px;
      border: none;
      background: rgba(255, 255, 255, 0.9);
      cursor: pointer;
      position: relative;
      z-index: 30;
    }
  }

  &__burger-line {
    width: 1.4rem;
    height: 2.5px;
    border-radius: 999px;
    background: #fb923c;
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

.app--menu-open {
  .app__nav {
    @media (max-width: 720px) {
      transform: translateX(0);
    }
  }
}
</style>
