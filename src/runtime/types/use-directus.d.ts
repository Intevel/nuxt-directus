import {
  AuthenticationConfig,
  ClientOptions,
  RestConfig,
  GraphqlConfig,
  WebSocketConfig
} from './index'
import { WebSocket } from 'ws'
import { FetchOptions } from 'ofetch'

export interface DirectusClientOptions {
  /**
   * The URL of the Directus instance. The default value is defined in the Nuxt runtime config.
   */
  url?: string;
  clientOptions?: ClientOptions;
  fetchOptions?: Omit<FetchOptions, 'baseURL'>;
}

export interface DirectusClientConfig {
  /**
   * Whether to use the static token or not. If true, the static token will be used, if false, no token will be used. If string, the string will be used as the token.
   * @default true
   * @type boolean | string | undefined
  */
  useStaticToken?: boolean | string | undefined;
  options?: DirectusClientOptions;
  authConfig: Partial<AuthenticationConfig>;
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
