
import { ModuleOptions, ModuleHooks } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['content']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['content']?: ModuleOptions }
  interface NuxtHooks extends ModuleHooks {}
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['content']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['content']?: ModuleOptions }
  interface NuxtHooks extends ModuleHooks {}
}


export { ModuleHooks, ModuleOptions, MountOptions, default } from './module'
