import VueGtag from "vue-gtag-next";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: "G-E7PSWP6P7T",
    },
    isEnabled: config.public.appEnv === "production",
  });

  return {
    provide: {
      // @ts-ignore
      gtag: window.gtag,
    },
  };
});
