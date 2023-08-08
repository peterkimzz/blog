export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "dayjs-nuxt"],
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
  experimental: {
    payloadExtraction: false,
  },
  nitro: {
    prerender: {
      failOnError: false,
      routes: ["/sitemap.xml"],
    },
  },
});
