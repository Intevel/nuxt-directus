import type {
  AuthenticationConfig,
  ClientOptions,
  RestConfig,
  GraphqlConfig,
  WebSocketConfig
} from './index'
import type { WebSocket } from 'ws'
import type { FetchOptions } from 'ofetch'

export interface DirectusClientOptions {
  /**
   * The URL of the Directus instance. The default value is defined in the Nuxt runtime config.
   */
  url: string;
  clientOptions: ClientOptions;
  fetchOptions?: Omit<FetchOptions, 'baseURL'>;
}

export interface DirectusClientConfig {
  /**
   * Whether to use the static token or not. If true, the static token will be forced, if false, no static token will be used. If string, the string will be used as the token. If left undefined, the static token will be used if available but user authentication will be prioritized.
   * @default undefined
   * @type boolean | string | undefined
  */
  useStaticToken: boolean | string | undefined;
  options: Partial<DirectusClientOptions>;
  authConfig: Partial<AuthenticationConfig>;
}

export interface DirectusRestConfig extends Partial<DirectusClientConfig> {
  restConfig: RestConfig;
}

export interface DirectusGraphqlConfig extends Partial<DirectusClientConfig> {
  graphqlConfig: GraphqlConfig;
}

export interface DirectusRealtimeConfig extends Partial<DirectusClientConfig> {
  websocketConfig: WebSocketConfig;
}
