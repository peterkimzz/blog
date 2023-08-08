import { withBase } from "ufo";
import { useRuntimeConfig, useRequestEvent } from "#app";
import { unwrap, flatUnwrap } from "../markdown-parser/utils/node.mjs";
import { useContentPreview } from "./preview.mjs";
export const withContentBase = (url) => withBase(url, useRuntimeConfig().public.content.api.baseURL);
export const useUnwrap = () => ({
  unwrap,
  flatUnwrap
});
export const useContentDisabled = () => {
  console.warn("useContent is only accessible when you are using `documentDriven` mode.");
  console.warn("Learn more by visiting: https://content.nuxtjs.org/guide/writing/document-driven");
  throw new Error("useContent is only accessible when you are using `documentDriven` mode.");
};
export const navigationDisabled = () => {
  console.warn("Navigation is only accessible when you enable it in module options.");
  console.warn("Learn more by visiting: https://content.nuxtjs.org/api/configuration#navigation");
  throw new Error("Navigation is only accessible when you enable it in module options.");
};
export const addPrerenderPath = (path) => {
  const event = useRequestEvent();
  event.node.res.setHeader(
    "x-nitro-prerender",
    [
      event.node.res.getHeader("x-nitro-prerender"),
      path
    ].filter(Boolean).join(",")
  );
};
export const shouldUseClientDB = () => {
  const { experimental } = useRuntimeConfig().public.content;
  if (process.server) {
    return false;
  }
  if (experimental.clientDB) {
    return true;
  }
  return useContentPreview().isEnabled();
};
