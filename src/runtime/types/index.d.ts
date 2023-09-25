import type {
  DirectusUser,
  Query,
  RegularCollections,
  SingletonCollections,
  RestConfig
} from '@directus/sdk';
import type { AsyncDataOptions } from '#imports';

export type * from "@directus/sdk";

export interface ModuleOptions {
  /**
   * Directus API URL, customizable at runtime via NUXT_PUBLIC_DIRECTUS_URL environment variable.
   * @default ''
   * @type string
   */
  url: string;
  /**
   * Directus static token that is available only server side. Customizable at runtime via NUXT_DIRECTUS_STATIC_TOKEN environment variable.
   * @default ''
   * @type string
   */
  privateStaticToken?: string;
  /**
   * Directus static token that is available both server and client side. Customizable at runtime via NUXT_PUBLIC_DIRECTUS_STATIC_TOKEN environment variable.
   * @default ''
   * @type string
   */
  publicStaticToken?: string;
  /**
   * Enable Directus Devtools
   * @default false
   * @type boolean
   * @see https://docs.directus.io/guides/developer-tools.html
   */
  devtools?: boolean;
  /**
  * A series of configs that let you define Nuxt as the auth cookie handler.
  * @default Directus handles auth cookies
  * @type object
  */
  cookieConfigs: {
    /**
    * Handle auth cookies using Nuxt instead of Directus.
    * @default false
    * @type boolean
    */
    useNuxtCookies: boolean;
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
    cookieSameSite?: true | false | 'lax' | 'strict' | 'none' | undefined;
    /**
    * The Secure attribute for auth cookies.
    * @default false
    * @type boolean | undefined
    */
    cookieSecure?: boolean | undefined;
  }
  /**
   * Whether to automatically refresh the access token when it expires.
   * @default true
   * @type boolean
   */
  autoRefresh: boolean;
}

export interface DirectusRegularItemRequestOptions<TSchema, TQuery> {
  key?: string;
  query?: TQuery | undefined;
  /* useAsyncData options */
  params?: AsyncDataOptions<RegularCollections<TSchema>>;
}

export interface DirectusSingletonItemRequestOptions<TSchema, TQuery> {
  key?: string;
  query?: TQuery | undefined;
  /* useAsyncData options */
  params?: AsyncDataOptions<SingletonCollections<TSchema>>;
}

export interface DirectusGrafqlConfig {
  /**
   * Whether to use the static token or not. If true, the static token will be used, if false, no token will be used. If a string, the string will be used as the token.
   * @default true
   * @type boolean | string
   */
  staticToken?: boolean | string;
}

export interface DirectusRegisterCredentials<TSchema> {
  userInfo: Partial<DirectusUser<TSchema>>;
  useStaticToken?: boolean | string;
  query?: Query<TSchema, DirectusUser<TSchema>> | undefined;
}

export interface DirectusRestConfig extends RestConfig {
  /**
   * Whether to use the static token or not. If true, the static token will be used, if false, no token will be used. If a string, the string will be used as the token.
   * @default true
   * @type boolean | string
   */
  staticToken?: boolean | string;
}
