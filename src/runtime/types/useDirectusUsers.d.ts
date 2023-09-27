import type  {
  DirectusClientConfig,
  DirectusUser
} from './index'

export interface DirectusUserOptions<TQuery> extends DirectusClientConfig {
  query: TQuery | undefined;
}

export interface DirectusDeleteUser<TSchema> extends DirectusClientConfig {
  id: DirectusUser<TSchema>["id"]
}
