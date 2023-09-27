import type { AsyncDataOptions } from '#app'
import type { DirectusClientConfig } from './index'

export interface DirectusItemsOptions<TQuery> extends DirectusClientConfig {
  query?: TQuery | undefined;
}

export interface DirectusItemsOptionsAsyncData<TSchema, TQuery> extends DirectusItemsOptions<TQuery> {
  /* useAsyncData key and params */
  key?: string;
  params?: AsyncDataOptions<any>; // This will fire an error when using `transform`
}
