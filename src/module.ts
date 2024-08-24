import { fileURLToPath } from 'node:url'
import { defu } from 'defu'
import {
  // addImports,
  addImportsDir,
  addPlugin,
  addServerImportsDir,
  createResolver,
  defineNuxtModule,
  installModule,
  hasNuxtModule,
} from '@nuxt/kit'
// import { ensureDependencyInstalled } from 'nypm'
import { joinURL } from 'ufo'
import { addCustomTab } from '@nuxt/devtools-kit'
import type {
  ModuleOptions,
  ModulePrivateRuntimeConfig,
  ModulePublicRuntimeConfig,
} from './runtime/types/module-options'

export type * from './runtime/types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-directus',
    configKey: 'directus',
    compatibility: {
      nuxt: '^3.8.0',
    },
  },
  defaults: {
    url: '',
    staticToken: '',
    staticTokenServer: '',
    authConfig: {
      authStateName: 'directus.auth',
      userStateName: 'directus.user',
      mode: 'json',
      refreshTokenCookieName: 'directus_refresh_token',
      authTokenCookieName: 'directus_access_token',
      sessionTokenCookieName: 'directus_session_token',
      cookieHttpOnly: false,
      cookieSameSite: 'lax',
      cookieSecure: true,
    },
    moduleConfig: {
      devtools: false,
      sdk: {
        autoImport: false,
        prefix: '',
        suffix: '',
      },
      autoRefresh: {
        enableMiddleware: false,
        global: true,
        middlewareName: 'directus-auth-middleware',
        redirectTo: '/login',
        to: [''],
      },
      nuxtImage: {
        useAuthToken: false,
        useStaticToken: true,
      },
    },
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.options.alias['#nuxt-directus'] = runtimeDir

    // Private runtimeConfig
    const directus = nuxt.options.runtimeConfig.directus = defu(nuxt.options.runtimeConfig.directus as any, {
      staticToken: options.staticTokenServer,
      moduleConfig: {
        devtools: options.moduleConfig.devtools,
        sdk: options.moduleConfig.sdk,
      },
    })

    // Public runtimeConfig
    const directusPublic = nuxt.options.runtimeConfig.public.directus = defu(nuxt.options.runtimeConfig.public.directus as any, {
      url: options.url,
      staticToken: options.staticToken,
      authConfig: {
        authStateName: options.authConfig.authStateName,
        userStateName: options.authConfig.userStateName,
        mode: options.authConfig.mode,
        refreshTokenCookieName: options.authConfig.refreshTokenCookieName,
        authTokenCookieName: options.authConfig.authTokenCookieName,
        sessionTokenCookieName: options.authConfig.sessionTokenCookieName,
        cookieHttpOnly: options.authConfig.cookieHttpOnly,
        cookieSameSite: options.authConfig.cookieSameSite,
        cookieSecure: options.authConfig.cookieSecure,
      },
      moduleConfig: {
        autoRefresh: options.moduleConfig.autoRefresh && {
          enableMiddleware: options.moduleConfig.autoRefresh.enableMiddleware,
          global: options.moduleConfig.autoRefresh.global,
          middlewareName: options.moduleConfig.autoRefresh.middlewareName,
          redirectTo: options.moduleConfig.autoRefresh.redirectTo,
          to: options.moduleConfig.autoRefresh.to,
        },
        nuxtImage: options.moduleConfig.nuxtImage && {
          useAuthToken: options.moduleConfig.nuxtImage.useAuthToken,
          useStaticToken: options.moduleConfig.nuxtImage.useStaticToken,
        },
      },
    })

    // TODO: ensureDependencyInstalled forces it to install if not present
    // Check if a Directus SDK is installed and auto import it
    // const directusSDK = await ensureDependencyInstalled('@directus/sdk')
    // nuxt.options.alias['#nuxt-directus/sdk'] = directusSDK
    //   ? '@directus/sdk'
    //   : 'unenv/runtime/mock/empty'
    // // Auto import native components
    // if (directusSDK && directus.moduleConfig.sdk.autoImport) {
    //   const sdkComposables = await import('#nuxt-directus/sdk')
    //   const prefix = directus.moduleConfig.sdk.prefix
    //   const suffix = directus.moduleConfig.sdk.suffix
    //   Object.keys(sdkComposables).forEach(name =>
    //     addImports({
    //       name,
    //       as:
    //         prefix
    //         + (prefix ? name.charAt(0).toUpperCase() + name.slice(1) : name)
    //         + suffix,
    //       from: '@directus/sdk',
    //     }),
    //   )
    // }

    // Check if @nuxt/image is installed and add nuxt-directus provider
    if (hasNuxtModule('@nuxt/image', nuxt)) {
      // TODO: edit options instead of reinstalling the module
      await installModule(
        '@nuxt/image',
        {
          providers: {
            nuxtDirectus: {
              name: 'nuxt-directus',
              provider: resolve(runtimeDir, 'image-providers', 'nuxt-directus'),
            },
          },
          provider: 'nuxt-directus',
        },
        nuxt,
      )
    }

    addPlugin({
      src: resolve(runtimeDir, 'plugins', 'directus-fetch'),
    })

    // if (directusPublic.moduleConfig.autoRefresh !== false) {
    //   addPlugin({
    //     src: resolve(runtimeDir, 'plugins', 'auto-refresh'),
    //   }, { append: true })
    // }

    addImportsDir(resolve(runtimeDir, 'composables'))
    addServerImportsDir(resolve(runtimeDir, 'server', 'utils'))

    // Enable Directus inside Nuxt Devtools
    if (directus.moduleConfig.devtools) {
      const adminUrl = joinURL(
        directusPublic.url,
        '/admin/',
      )

      addCustomTab({
        name: 'directus',
        title: 'Directus',
        icon: 'simple-icons:directus',
        view: {
          type: 'iframe',
          src: adminUrl,
        },
      })
    }
  },
})

declare module '@nuxt/schema' {
  interface NuxtOptions {
    directus?: ModuleOptions
    runtimeConfig: {
      directus: ModulePrivateRuntimeConfig
      public: {
        directus: ModulePublicRuntimeConfig
      }
    }
  }
}
