import { fileURLToPath } from 'url'
import { defu } from 'defu'
import {
  createResolver,
  defineNuxtModule,
  addImports,
  addImportsDir,
  addPlugin,
  addServerImportsDir
} from '@nuxt/kit'
import { joinURL } from 'ufo'
import * as DirectusSDK from '@directus/sdk'
import type {
  ModuleOptions,
  ModuleOptionsPrivate,
  ModuleOptionsPublic
} from './runtime/types/module-options'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-directus',
    configKey: 'directus',
    compatibility: {
      nuxt: '^3.8.0'
    }
  },
  defaults: {
    url: '',
    staticToken: '',
    staticTokenServer: '',
    authConfig: {
      authStateName: 'directus.auth',
      userStateName: 'directus.user',
      useNuxtCookies: true,
      refreshTokenCookieName: 'directus_refresh_token',
      cookieHttpOnly: false,
      cookieSameSite: 'lax',
      cookieSecure: false
    },
    moduleConfig: {
      devtools: false,
      autoRefresh: true,
      autoImport: false,
      autoImportPrefix: 'sdk',
      autoImportSuffix: ''
    }
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Private runtimeConfig
    nuxt.options.runtimeConfig.directus = defu<ModuleOptionsPrivate, Partial<ModuleOptionsPrivate>[]>(
      nuxt.options.runtimeConfig.directus,
      {
        staticToken: options.staticTokenServer,
        moduleConfig: {
          devtools: options.moduleConfig.devtools,
          autoImport: options.moduleConfig.autoImport,
          autoImportPrefix: options.moduleConfig.autoImportPrefix,
          autoImportSuffix: options.moduleConfig.autoImportSuffix
        }
      }
    )

    // Public runtimeConfig
    nuxt.options.runtimeConfig.public.directus = defu<ModuleOptionsPublic, Partial<ModuleOptionsPublic>[]>(
      nuxt.options.runtimeConfig.public.directus,
      {
        url: options.url,
        staticToken: options.staticToken,
        authConfig: {
          authStateName: options.authConfig.authStateName,
          userStateName: options.authConfig.userStateName,
          useNuxtCookies: options.authConfig.useNuxtCookies,
          refreshTokenCookieName: options.authConfig.refreshTokenCookieName,
          cookieHttpOnly: options.authConfig.cookieHttpOnly,
          cookieSameSite: options.authConfig.cookieSameSite, // TODO: understand if it is possible to fix the type mismatch
          cookieSecure: options.authConfig.cookieSecure
        },
        moduleConfig: {
          autoRefresh: options.moduleConfig.autoRefresh
        }
      }
    )

    // Auto import native components
    if (options.moduleConfig.autoImport) {
      const prefix = options.moduleConfig.autoImportPrefix
      const suffix = options.moduleConfig.autoImportSuffix

      Object.keys(DirectusSDK).forEach(name =>
        addImports({
          name,
          as: (prefix + (prefix ? (name.charAt(0).toUpperCase() + name.slice(1)) : name) + suffix),
          from: '@directus/sdk'
        })
      )
    }

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    if (nuxt.options.runtimeConfig.public.directus.moduleConfig.autoRefresh) {
      addPlugin(resolve(runtimeDir, './plugins/auto-refresh'), { append: true })
    }

    addImportsDir(resolve(runtimeDir, 'composables'))
    addServerImportsDir(resolve(runtimeDir, 'server', 'utils'))

    // Enable Directus inside Nuxt Devtools
    if (options.moduleConfig.devtools) {
      const adminUrl = joinURL(
        nuxt.options.runtimeConfig.public.directus.url,
        '/admin/'
      )
      nuxt.hook('devtools:customTabs', (iframeTabs) => {
        iframeTabs.push({
          name: 'directus',
          title: 'Directus',
          icon: 'simple-icons:directus',
          view: {
            type: 'iframe',
            src: adminUrl
          }
        })
      })
    }
  }
})

declare module '@nuxt/schema' {
  interface NuxtOptions {
    directus?: ModuleOptions;
    runtimeConfig: {
      directus: ModuleOptionsPrivate;
      public: {
        directus: ModuleOptionsPublic;
      }
    };
  }
}
