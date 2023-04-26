import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defu } from 'defu'
import { defineNuxtModule, addPlugin, addImportsDir, isNuxt2 } from '@nuxt/kit'
import { joinURL } from 'ufo'
import { DirectusQueryParams } from './runtime/types'

export interface ModuleOptions {
  /**
   * Directus API URL
   * @default process.env.NUXT_DIRECTUS_URL
   * @type string
   */
  url?: string;
  /**
   * Auto fetch user
   * @default true
   * @type boolean
   */
  autoFetch?: boolean;
  /**
   * fetch user params
   * @type boolean
   */
  fetchUserParams?: DirectusQueryParams;
  /**
   * Auth Token
   * @type string
   */
  token?: string;
  /**
   * Add Directus Admin Dashboard in Nuxt Devtools
   *
   * @default false
   */
  devtools?: boolean
  /**
   * Token Cookie Name
   * @type string
   @ default 'directus_token'
   */
  cookieNameToken?: string;
  /**
   * Refresh Token Cookie Name
   * @type string
   * @default 'directus_refresh_token'
   */
  cookieNameRefreshToken?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-directus',
    configKey: 'directus',
    compatibility: {
      nuxt: '^3.0.0-rc.9 || ^2.16.0',
      bridge: true
    }
  },
  defaults: {
    url: process.env.NUXT_DIRECTUS_URL,
    autoFetch: true,
    devtools: false,
    cookieNameToken: 'directus_token',
    cookieNameRefreshToken: 'directus_refresh_token'
  },
  setup (options, nuxt) {
    // Nuxt 2 / Bridge
    if (isNuxt2() && !nuxt?.options?.runtimeConfig?.public?.directus) {
      // @ts-ignore
      nuxt.options.publicRuntimeConfig.directus = defu(nuxt.options.publicRuntimeConfig.directus,
        {
          url: options.url,
          autoFetch: options.autoFetch,
          fetchUserParams: options.fetchUserParams,
          token: options.token,
          devtools: options.devtools,
          cookieNameToken: options.cookieNameToken,
          cookieNameRefreshToken: options.cookieNameRefreshToken
        }
      )
    }

    // Nuxt 3
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.directus = defu(nuxt.options.runtimeConfig.public.directus, {
      url: options.url,
      autoFetch: options.autoFetch,
      fetchUserParams: options.fetchUserParams,
      token: options.token,
      devtools: options.devtools,
      cookieNameToken: options.cookieNameToken,
      cookieNameRefreshToken: options.cookieNameRefreshToken
    })

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, 'plugin'))
    addImportsDir(resolve(runtimeDir, 'composables'))

    if (options.devtools) {
      const adminUrl = joinURL(nuxt.options.runtimeConfig.public.directus.url, '/admin/')
      // @ts-expect-error - private API
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
    publicRuntimeConfig?: {
      directus?: ModuleOptions;
    };
  }
}
