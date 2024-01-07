import type { AsyncDataOptions } from '#app'

export interface DirectusNotificationsOptions<TQuery> {
  query?: TQuery | undefined;
}

export interface DirectusNotificationsOptionsAsyncData<TQuery> extends DirectusNotificationsOptions<TQuery> {
  key?: string;
  params?: AsyncDataOptions<any>;
}
