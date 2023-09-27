import {
  RestConfig,
  GraphqlConfig,
} from './index'

export interface DirectusClientConfig {
  /**
   * Whether to use the static token or not. If true, the static token will be used, if false, no token will be used. If string, the string will be used as the token.
   * @default true
   * @type boolean | string | undefined
  */
  useStaticToken?: boolean | string | undefined;
}

export interface DirectusRestConfig extends DirectusClientConfig, RestConfig {
}

export interface DirectusGraphqlConfig extends DirectusClientConfig, GraphqlConfig {
}
