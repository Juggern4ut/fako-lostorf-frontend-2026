<template>
  <div class="app">
    <header class="app__header">
      <div class="app__brand">Fasnachtsverein Lostorf</div>
      <nav class="app__nav">
        <button class="app__nav-link">Home</button>
        <button class="app__nav-link">News</button>
        <button class="app__nav-link">Anlässe</button>
        <button class="app__nav-link">Galerie</button>
        <button class="app__nav-link">Kontakt</button>
      </nav>
    </header>

    <main class="app__main">
      <section class="home">
        <h1 class="home__title">Willkommen beim Fasnachtsverein Lostorf</h1>
        <p class="home__text">
          Die Fasnacht ist aus dem kulturellen Leben unserer Gemeinde nicht mehr wegzudenken. Gemeinsam wollen wir
          unvergessliche Momente schaffen und uns auf die schönste Zeit im Jahr freuen.
        </p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// Routing & dynamische Inhalte folgen später; aktuell nur statischer Rahmen.
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(3, 7, 18, 0.8);
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
    padding: 2rem 1.25rem 3rem;
  }
}

.home {
  &__title {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  &__text {
    max-width: 38rem;
    line-height: 1.6;
    color: rgba(249, 250, 251, 0.86);
  }
}
</style>
