import { fileURLToPath } from 'url'
import { defu } from 'defu'
import {
  defineNuxtModule,
  addPlugin,
  addImportsDir,
  createResolver
} from '@nuxt/kit'
import { joinURL } from 'ufo'
import * as DirectusSDK from '@directus/sdk'

export interface ModuleOptions {
  /**
   * Directus API URL, customizable at runtime via NUXT_PUBLIC_DIRECTUS_URL environment variable.
   * @default ''
   * @type string
   */
  url: string;
  /**
   * Directus static token.
   * @default ''
   * @type string
   */
  staticToken?: string;
  /**
   * Enable Directus Devtools
   * @default false
   * @type boolean
   * @see https://docs.directus.io/guides/developer-tools.html
   */
  devtools?: boolean;
  /**
   * Token Cookie Name
   * @default 'directus_access_token'
   * @type string
   */
  tokenCookieName?: string;
  /**
   * Refresh Token Cookie Name
   * @default 'directus_refresh_token'
   * @type string
   */
  refreshTokenCookieName?: string;
}

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
    staticToken: '',
    devtools: false,
    tokenCookieName: 'directus_access_token',
    refreshTokenCookieName: 'directus_refresh_token'
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.directus = defu(
      nuxt.options.runtimeConfig.public.directus,
      {
        url: options.url,
        staticToken: options.staticToken,
        devtools: options.devtools,
        tokenCookieName: options.tokenCookieName,
        refreshTokenCookieName: options.refreshTokenCookieName
      }
    )

    nuxt.options.imports = defu(nuxt.options.imports, {
      presets: [
        {
          from: '@directus/sdk',
          imports: Object.keys(DirectusSDK)
        }
      ]
    })

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, './plugins/directus'), { append: true })
    addPlugin(resolve(runtimeDir, './plugins/autoRefresh'), { append: true })

    addImportsDir(resolve(runtimeDir, 'composables'))

    if (options.devtools) {
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
    publicRuntimeConfig?: {
      directus?: ModuleOptions;
    };
  }
}
