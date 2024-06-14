import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defu } from 'defu'
import { defineNuxtModule, addPlugin, addImportsDir } from '@nuxt/kit'
import { joinURL } from 'ufo'
import { DirectusQueryParams } from './runtime/types'

export interface ModuleOptions {
  /**
   * Directus API URL
   * @default process.env.NUXT_PUBLIC_DIRECTUS_URL
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
   * Auto refesh tokens
   * @default true
   * @type boolean
   */
  autoRefresh?: boolean;
  /**
   * Auto refesh tokens
   * @default true
   * @type boolean
   */
  onAutoRefreshFailure?: () => Promise<void>;
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
   * @ default 'directus_token'
   */
  cookieNameToken?: string;
  /**
   * Refresh Token Cookie Name
   * @type string
   * @default 'directus_refresh_token'
   */
  cookieNameRefreshToken?: string;

  /**
   * The max age for auth cookies in milliseconds.
   * This should match your directus env key REFRESH_TOKEN_TTL
   * @type string
   * @default 604800000
   */
  cookieMaxAge?: number;

  /**
   * The max age for auth cookies in milliseconds.
   * This should match your directus env key REFRESH_TOKEN_TTL
   * @type string
   * @default 604800000
   */
  maxAgeRefreshToken?: number;

  /**
   * The SameSite attribute for auth cookies.
   * @type string
   * @default 'lax'
   */
  cookieSameSite?: 'strict' | 'lax' | 'none' | undefined;

  /**
   * The Secure attribute for auth cookies.
   * @type boolean
   * @default false
   */
  cookieSecure?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-directus',
    configKey: 'directus',
    compatibility: {
      nuxt: '>=3.0.0-rc.9 || ^2.16.0',
      bridge: true
    }
  },
  defaults: {
    url: process.env.NUXT_PUBLIC_DIRECTUS_URL,
    autoFetch: true,
    autoRefresh: false,
    devtools: false,
    cookieNameToken: 'directus_token',
    cookieNameRefreshToken: 'directus_refresh_token',

    // Nuxt Cookies Docs @ https://nuxt.com/docs/api/composables/use-cookie
    cookieMaxAge: 604800000,
    cookieSameSite: 'lax',
    cookieSecure: false
  },
  setup (options, nuxt) {
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.directus = defu(
      nuxt.options.runtimeConfig.public.directus,
      {
        url: options.url,
        autoFetch: options.autoFetch,
        autoRefresh: options.autoRefresh,
        onAutoRefreshFailure: options.onAutoRefreshFailure,
        fetchUserParams: options.fetchUserParams,
        token: options.token,
        devtools: options.devtools,
        cookieNameToken: options.cookieNameToken,
        cookieNameRefreshToken: options.cookieNameRefreshToken,
        cookieMaxAge: options.cookieMaxAge || options.maxAgeRefreshToken,
        cookieSameSite: options.cookieSameSite,
        cookieSecure: options.cookieSecure
      })

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, 'plugin'))
    addImportsDir(resolve(runtimeDir, 'composables'))
    if (options.maxAgeRefreshToken) {
      // eslint-disable-next-line no-console
      console.warn(
        'maxAgeRefreshToken is deprecated, please use cookieMaxAge instead'
      )
    }

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
    directus?: ModuleOptions;
    publicRuntimeConfig?: {
      directus?: ModuleOptions;
    };
  }
}
