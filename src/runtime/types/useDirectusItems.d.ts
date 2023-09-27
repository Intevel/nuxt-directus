import type { AsyncDataOptions } from '#app'
import type { DirectusClientConfig } from './index'

export interface DirectusReqItemOptions<TQuery> extends DirectusClientConfig {
  query?: TQuery | undefined;
}

export interface AsyncDataDirectusReqItem<TSchema, TQuery> extends DirectusReqItemOptions<TQuery> {
  /* useAsyncData key and params */
  key?: string;
  params?: AsyncDataOptions<any>; // This will fire an error when using `transform`
}
