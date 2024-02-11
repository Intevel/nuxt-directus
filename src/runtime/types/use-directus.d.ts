import type {
  AuthenticationConfig,
  ClientOptions,
  RestConfig,
  GraphqlConfig,
  WebSocketConfig
} from '@directus/sdk'
import type { FetchOptions } from 'ofetch'

export interface DirectusClientOptions {
  /**
   * The URL of the Directus instance. The default value is defined in the Nuxt runtime config.
   */
  baseURL?: string;
  clientOptions?: ClientOptions;
  fetchOptions?: Omit<FetchOptions, 'baseURL'>;
}

export interface DirectusClientConfig {
  /**
   * Whether to use the static token or not. If true, the static token will be forced, if false, no static token will be used. If string, the string will be used as the token. If left undefined, the static token will be used if available but user authentication will be prioritized.
   * @default undefined
   * @type boolean | string | undefined
  */
  staticToken?: boolean | string | undefined;
  options?: DirectusClientOptions;
  authConfig?: Partial<AuthenticationConfig>;
}

export interface DirectusRestConfig extends DirectusClientConfig {
  restConfig?: RestConfig;
}

export interface DirectusGraphqlConfig extends DirectusClientConfig {
  graphqlConfig?: GraphqlConfig;
}

export interface DirectusRealtimeConfig extends DirectusClientConfig {
  websocketConfig?: WebSocketConfig;
}
