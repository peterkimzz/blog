import { joinURL, withLeadingSlash, withoutTrailingSlash } from "ufo";
import { hash } from "ohash";
import { useRuntimeConfig } from "#app";
import { createQuery } from "../query/query.mjs";
import { encodeQueryParams } from "../utils/query.mjs";
import { jsonStringify } from "../utils/json.mjs";
import { addPrerenderPath, shouldUseClientDB, withContentBase } from "./utils.mjs";
import { useContentPreview } from "./preview.mjs";
export const createQueryFetch = () => async (query) => {
  const { content } = useRuntimeConfig().public;
  const params = query.params();
  const apiPath = content.experimental.stripQueryParameters ? withContentBase(`/query/${process.dev ? "_" : `${hash(params)}.${content.integrity}`}/${encodeQueryParams(params)}.json`) : withContentBase(process.dev ? "/query" : `/query/${hash(params)}.${content.integrity}.json`);
  if (!process.dev && process.server) {
    addPrerenderPath(apiPath);
  }
  if (shouldUseClientDB()) {
    const db = await import("./client-db").then((m) => m.useContentDatabase());
    return db.fetch(query);
  }
  const data = await $fetch(apiPath, {
    method: "GET",
    responseType: "json",
    params: content.experimental.stripQueryParameters ? void 0 : {
      _params: jsonStringify(params),
      previewToken: useContentPreview().getPreviewToken()
    }
  });
  if (typeof data === "string" && data.startsWith("<!DOCTYPE html>")) {
    throw new Error("Not found");
  }
  return data;
};
export function queryContent(query, ...pathParts) {
  const { content } = useRuntimeConfig().public;
  const queryBuilder = createQuery(createQueryFetch(), typeof query !== "string" ? query : {});
  let path;
  if (typeof query === "string") {
    path = withLeadingSlash(joinURL(query, ...pathParts));
  }
  const originalParamsFn = queryBuilder.params;
  queryBuilder.params = () => {
    const params = originalParamsFn();
    if (path) {
      params.where = params.where || [];
      if (params.first && (params.where || []).length === 0) {
        params.where.push({ _path: withoutTrailingSlash(path) });
      } else {
        params.where.push({ _path: new RegExp(`^${path.replace(/[-[\]{}()*+.,^$\s/]/g, "\\$&")}`) });
      }
    }
    if (!params.sort?.length) {
      params.sort = [{ _file: 1, $numeric: true }];
    }
    if (content.locales.length) {
      const queryLocale = params.where?.find((w) => w._locale)?._locale;
      if (!queryLocale) {
        params.where = params.where || [];
        params.where.push({ _locale: content.defaultLocale });
      }
    }
    return params;
  };
  return queryBuilder;
}
