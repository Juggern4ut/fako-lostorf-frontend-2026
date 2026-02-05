// fako-lostorf frontend

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL: '/',
    head: {
      title: 'Fasnachtsverein Lostorf',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Offizielle Website des Fasnachtsvereins Lostorf.' }
      ]
    }
  },
  css: [],
  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8090'
    }
  }
})
