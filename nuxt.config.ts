import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: false,

  build: {
    postcss: {
      postcssOptions: require('./postcss.config.js'),
    },
  },

  css: [
    '@/assets/css/main.css',
  ],
})
