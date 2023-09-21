import VueGtag from "vue-gtag-next";

const TRACKING_ID = "G-E7PSWP6P7T";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.vueApp.use(VueGtag, {
    property: { id: TRACKING_ID },
    // isEnabled: config.public.appEnv === "production",
  });

  return {
    provide: {
      gtag: {
        setEvent: (key: string, options?: any) =>
          // @ts-ignore
          window.gtag("event", key, options),
      },
    },
  };
});
