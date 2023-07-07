import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/keuller/workspace/personal/nuxt-xstate/node_modules/.pnpm/nuxt@3.6.2_@types+node@18.16.19_typescript@5.1.6/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}