// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/fontaine",
    "@nuxtjs/tailwindcss",
    "@vite-pwa/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtseo/module",
    '@nuxthq/studio'
  ],
});
