import type  {
  DirectusClientConfig,
  DirectusUser
} from './index'

export interface DirectusUsersOptions<TQuery> extends DirectusClientConfig {
  query?: TQuery | undefined;
}

export interface DirectusUsersOptionsAsyncData<TQuery> extends DirectusUsersOptions<TQuery> {
  key?: string;
  params?: AsyncDataOptions<any>;
}
