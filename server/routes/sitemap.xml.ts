import { serverQueryContent } from "#content/server";
import { SitemapStream, streamToPromise } from "sitemap";

export default defineEventHandler(async (event) => {
  const docs = await serverQueryContent(event).find();

  const runtimeConfig = useRuntimeConfig();

  const sitemap = new SitemapStream({
    hostname: runtimeConfig.public.HOSTNAME,
  });

  sitemap.write({ url: "/" });

  for (const doc of docs) {
    sitemap.write({
      url: doc._path,
      changefreq: "daily",
    });
  }
  sitemap.end();

  return streamToPromise(sitemap);
});
