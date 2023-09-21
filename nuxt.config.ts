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
  app: {
    head: {
      script: [
        {
          children: `
          console.log("as");
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-E7PSWP6P7T');`,
        },
      ],
    },
  },
  nitro: {
    prerender: {
      failOnError: false,
      routes: ["/sitemap.xml"],
    },
  },
});
