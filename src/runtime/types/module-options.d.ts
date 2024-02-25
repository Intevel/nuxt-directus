import type { DirectusUser, Query } from '@directus/sdk'

export interface ModuleOptionsPrivate {
  /**
   * Directus static token that is available only server side. Customizable at runtime via NUXT_DIRECTUS_STATIC_TOKEN environment variable.
   * @default ''
   * @type string
   */
  staticToken?: string;
  /**
  * A series of configs that let you define how the module should be used by Nuxt.
  * @type object
  */
  moduleConfig: {
    /**
     * Enable Directus Devtools
     * @default false
     * @type boolean
     * @see https://docs.directus.io/guides/developer-tools.html
     */
    devtools?: boolean;
    /**
     * Auto import native components from the Directus SDK.
     * @default false
     * @type boolean
     */
    autoImport?: boolean;
    /**
     * Prefix for auto imported components from the Directus SDK.
     * @default ''
     * @type string
     */
    autoImportPrefix?: string;
    /**
     * Suffix for auto imported components from the Directus SDK.
     * @default ''
     * @type string
     */
    autoImportSuffix?: string;
  }
}

export interface ModuleOptionsPublic {
  /**
   * Directus API URL, customizable at runtime via NUXT_PUBLIC_DIRECTUS_URL environment variable.
   * @default ''
   * @type string
   */
  url: string;
  /**
   * Directus static token that is available both server and client side. Customizable at runtime via NUXT_PUBLIC_DIRECTUS_STATIC_TOKEN environment variable.
   * @default ''
   * @type string
   */
  staticToken?: string;
  /**
  * A series of configs that let you define Nuxt as the auth cookie handler.
  * @default Directus handles auth cookies
  * @type object
  */
  authConfig: {
    /**
     * The name for the Nuxt useState that handles authentication data such as access_token.
     * @default 'directus.auth'
     * @type string
     */
    authStateName?: string;
    /**
     * The name for the Nuxt useState that handles user data once authenticated.
     * @default 'directus.user'
     * @type string
     */
    userStateName?: string;
    /**
    * Handle auth cookies using Nuxt instead of Directus.
    * @default true
    * @type boolean
    */
    useNuxtCookies?: boolean;
    /**
    * Refresh Token Cookie Name
    * @default 'directus_refresh_token'
    * @type string | undefined
    */
    refreshTokenCookieName?: string | undefined;
    /**
    * The HttpOnly attribute for auth cookies.
    * @default false
    * @type boolean | undefined
    */
    cookieHttpOnly?: boolean | undefined;
    /**
    * The SameSite attribute for auth cookies.
    * @default 'lax'
    * @type true | false | 'lax' | 'strict' | 'none' | undefined
    */
    cookieSameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
    /**
    * The Secure attribute for auth cookies.
    * @default false
    * @type boolean | undefined
    */
    cookieSecure?: boolean | undefined;
  }
  /**
  * A series of configs that let you define how the module should be used by Nuxt.
  * @type object
  */
  moduleConfig: {
    /**
     * The defaults for the readMe query.
     * @default {}
     * @type Query<any, DirectusUser<any>> & { updateState?: boolean }
     */
    readMeQuery?: Query<any, DirectusUser<any>> & { updateState?: boolean };
    /**
     * Configurations to automatically refresh the access token and user data.
     * @default object
     * @type object or false
     */
    autoRefresh?: {
      /**
       * Whether to enable a Global Nuxt Middleware.
       * @default false
       * @type boolean
       */
      enableMiddleware?: boolean;
      /**
       * Sets the middleware as global, validating all routes.
       * @default true
       * @type boolean
       */
      global?: boolean;
      /**
       * The name of the middleware.
       * @default 'directus-auth-middleware'
       * @type string
       */
      middlewareName?: string;
      /**
       * The redirect path for unauthenticated users.
       * @default '/login'
       * @type string
       */
      redirectTo?: string;
      /**
       * A blacklist of paths that needs authentication to be accessed.
       * @default ['']
       * @type string[]
       */
      to?: string[];
    } | false;
  }
}

export type ModuleOptions = Omit<ModuleOptionsPrivate, 'staticToken'> & { staticTokenServer?: string } & ModuleOptionsPublic;