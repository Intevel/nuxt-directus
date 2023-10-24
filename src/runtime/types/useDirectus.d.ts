import {
  ClientOptions,
  RestConfig,
  GraphqlConfig,
  WebSocketConfig
} from './index'
import { WebSocket } from 'ws'
import { FetchOptions } from 'ofetch'

export interface DirectusClientOptions {
  url?: string;
  options?: ClientOptions;
  fetchOptions?: Omit<FetchOptions, 'baseURL'>;
}

export interface DirectusClientConfig {
  /**
   * Whether to use the static token or not. If true, the static token will be used, if false, no token will be used. If string, the string will be used as the token.
   * @default true
   * @type boolean | string | undefined
  */
  useStaticToken?: boolean | string | undefined;
  clientOptions?: DirectusClientOptions;
}

export interface DirectusRestConfig extends DirectusClientConfig, RestConfig {}

export interface DirectusGraphqlConfig extends DirectusClientConfig, GraphqlConfig {}

export interface DirectusRealtimeConfig extends DirectusClientConfig {
  websocketConfig?: WebSocketConfig;
}