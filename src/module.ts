import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defu } from 'defu'
import { defineNuxtModule, addPlugin, addImportsDir } from '@nuxt/kit'
import { joinURL } from 'ufo'

export interface ModuleOptions {
  /**
   * Directus API URL, customizable at runtime via NUXT_PUBLIC_DIRECTUS_URL environment variable.
   * @default 'https://localhost:8055'
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
    url: 'http://localhost:8055' as string,
    staticToken: '' as string,
    devtools: false
  },
  setup (options, nuxt) {
    nuxt.options.runtimeConfig.public.directus = defu(nuxt.options.runtimeConfig.public.directus, {
      url: options.url,
      staticToken: options.staticToken,
      devtools: options.devtools
    })

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin(resolve(runtimeDir, 'plugin'))
    addImportsDir(resolve(runtimeDir, 'composables'))

    if (options.devtools) {
      const adminUrl = joinURL(nuxt.options.runtimeConfig.public.directus.url, '/admin/')
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
