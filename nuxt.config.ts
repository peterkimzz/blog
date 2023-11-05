export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/ui", "dayjs-nuxt"],
  runtimeConfig: {
    public: {
      HOSTNAME: "https://www.peterkimzz.com",
    },
  },
  colorMode: { preference: "light" },
  content: {
    contentHead: false,
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
  tailwindcss: { viewer: false },
  ui: {
    icons: ["lucide"],
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
