import type {
  DirectusQueryParams,
  RegularCollections,
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
   * Whether to automatically refresh the access token when it expires.
   * @default true
   * @type boolean
   */
  autoRefresh: boolean;
}

export interface DirectusItemRequestOptions {
  query?: DirectusQueryParams;
  key?: string;
  /* useAsyncData options */
  params?: AsyncDataOptions<RegularCollections<TSchema>>;
}

export interface DirectusGrafqlConfig {
  /**
   * Whether to use the static token or not. If true, the static token will be used, if false, no token will be used. If a string, the string will be used as the token.
   * @default true
   * @type boolean | string
   */
  staticToken?: boolean | string;
}

export interface DirectusRestConfig extends RestConfig {
  /**
   * Whether to use the static token or not. If true, the static token will be used, if false, no token will be used. If a string, the string will be used as the token.
   * @default true
   * @type boolean | string
   */
  staticToken?: boolean | string;
  /**
   * Whether to use the authenticated User token or not. If true, the token will be picked from their cookie, if false, no token will be used.
   * @default true
   * @type boolean
   */
  userToken?: boolean;
}
