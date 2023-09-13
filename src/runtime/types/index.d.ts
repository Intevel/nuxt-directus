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
  /**
   * Whether to automatically refresh the access token when it expires.
   * @default true
   * @type boolean
   */
  autoRefresh?: boolean;
}

export interface DirectusItemRequestOptions {
  query?: DirectusQueryParams;
  key?: string;
  /* useAsyncData options */
  params?: AsyncDataOptions<RegularCollections<TSchema>>;
}
