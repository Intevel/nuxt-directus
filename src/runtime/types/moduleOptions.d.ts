export interface ModuleOptionsPrivate {
  /**
   * Directus static token that is available only server side. Customizable at runtime via NUXT_DIRECTUS_STATIC_TOKEN environment variable.
   * @default ''
   * @type string
   */
  privateStaticToken?: string;
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
  publicStaticToken?: string;
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
    * @default false
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
     * Whether to automatically refresh the access token when it expires.
     * @default true
     * @type boolean
     */
    autoRefresh?: boolean;
  }
}

export type ModuleOptions = ModuleOptionsPrivate & ModuleOptionsPublic;