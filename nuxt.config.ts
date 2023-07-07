// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Quotation'
    },
    rootId: '_app'
  },
  
  css: [
    '/global.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  devtools: { enabled: true }
})
