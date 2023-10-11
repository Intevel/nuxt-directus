import type  {
  DirectusClientConfig
} from './index'

export interface DirectusNotificationsOptions<TQuery> extends DirectusClientConfig {
  query?: TQuery | undefined;
}

export interface DirectusNotificationsOptionsAsyncData<TQuery> extends DirectusNotificationsOptions<TQuery> {
  key?: string;
  params?: AsyncDataOptions<any>;
}
