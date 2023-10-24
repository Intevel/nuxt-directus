import { fileURLToPath } from 'url'
import { defu } from 'defu'
import {
  createResolver,
  defineNuxtModule,
  addImportsDir,
  addPlugin
} from '@nuxt/kit'
import { joinURL } from 'ufo'
import * as DirectusSDK from '@directus/sdk'
import type {
  ModuleOptions,
  ModuleOptionsPrivate,
  ModuleOptionsPublic
} from './runtime/types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-directus',
    configKey: 'directus',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    url: '',
    privateStaticToken: '',
    publicStaticToken: '',
    authConfig: {
      authStateName: 'directus.auth',
      userStateName: 'directus.user',
      useNuxtCookies: false,
      refreshTokenCookieName: 'directus_refresh_token',
      cookieHttpOnly: false,
      cookieSameSite: 'lax',
      cookieSecure: false
    },
    moduleConfig: {
      devtools: false,
      autoRefresh: true,
      autoImport: false,
      autoImportPrefix: '',
      autoImportSuffix: ''
    }
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Private runtimeConfig
    nuxt.options.runtimeConfig.directus = defu(
      nuxt.options.runtimeConfig.directus,
      {
        staticToken: options.privateStaticToken,
        moduleConfig: {
          devtools: options.moduleConfig.devtools,
          autoImport: options.moduleConfig.autoImport,
          autoImportPrefix: options.moduleConfig.autoImportPrefix,
          autoImportSuffix: options.moduleConfig.autoImportSuffix
        }
      }
    )

    // Public runtimeConfig
    nuxt.options.runtimeConfig.public.directus = defu(
      nuxt.options.runtimeConfig.public.directus,
      {
        url: options.url,
        staticToken: options.publicStaticToken,
        authConfig: {
          authStateName: options.authConfig.authStateName,
          userStateName: options.authConfig.userStateName,
          useNuxtCookies: options.authConfig.useNuxtCookies,
          refreshTokenCookieName: options.authConfig.refreshTokenCookieName,
          customCookie: options.authConfig.useNuxtCookies,
          cookieHttpOnly: options.authConfig.cookieHttpOnly,
          cookieSameSite: options.authConfig.cookieSameSite as boolean | string | undefined, // TODO: understand if it is possible to fix the type mismatch
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

      const directusImports = Object.keys(DirectusSDK).map((key) => {
        return prefix + (prefix ? (key.charAt(0).toUpperCase() + key.slice(1)) : key) + suffix
      })

      nuxt.options.imports = defu(nuxt.options.imports, {
        presets: [
          {
            from: '@directus/sdk',
            imports: directusImports
          }
        ]
      })
    }

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    if (nuxt.options.runtimeConfig.public.directus.moduleConfig.autoRefresh) {
      addPlugin(resolve(runtimeDir, './plugins/auto-refresh'), { append: true })
    }

    addImportsDir(resolve(runtimeDir, 'composables'))

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
  interface ConfigSchema {
    directus?: ModuleOptions;
    runtimeConfig?: {
      directus?: ModuleOptionsPrivate;
      public?: {
        directus?: ModuleOptionsPublic;
      }
    };
  }
}
