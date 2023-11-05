export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "dayjs-nuxt",
    "nuxt-simple-sitemap",
    "@nuxtjs/tailwindcss",
  ],
  runtimeConfig: {
    public: {
      HOSTNAME: "https://www.peterkimzz.com",
    },
  },
  content: {
    highlight: {
      theme: "github-dark",
      preload: [
        "diff",
        "json",
        "js",
        "ts",
        "css",
        "shell",
        "html",
        "md",
        "yaml",
        "vue",
        "vue-html",
        "tsx",
      ],
    },
  },
  tailwindcss: {
    viewer: false,
  },
  dayjs: {
    locales: ["ko"],
    defaultLocale: "ko",
  },
  site: {
    url: "https://www.peterkimzz.com",
  },
  sitemap: {
    strictNuxtContentPaths: true, // this is for `@nuxt/content`
  },
});
