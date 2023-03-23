// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // Client-side-only rendering
  router: {
    options: {
      hashMode: true,
    },
  },
  app: {
    baseURL: "./",
  },
});
