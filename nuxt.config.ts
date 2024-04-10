import { bundledLanguages } from "shiki";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/ui", "dayjs-nuxt", "@nuxtjs/sitemap"],
  colorMode: { preference: "light" },
  content: {
    contentHead: false,
    highlight: {
      theme: "github-dark",
      // @ts-ignore
      langs: Object.keys(bundledLanguages),
    },
  },
  ui: {
    icons: ["lucide"],
  },
  dayjs: {
    locales: ["ko"],
    defaultLocale: "ko",
  },
  site: {
    url: "https://www.peterkimzz.com",
  },
  sitemap: {
    strictNuxtContentPaths: true,
  },
  nitro: {
    prerender: {
      failOnError: false,
    },
  },
  runtimeConfig: {},
});
