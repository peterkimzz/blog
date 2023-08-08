import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "no-footer"
declare module "/Users/peterkimzz/Projects/@peterkimzz/blog/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}