import type { AsyncDataOptions } from '#app'
import type { DirectusClientConfig } from './index'

export interface DirectusItemsOptions<TQuery> extends DirectusClientConfig {
  query?: TQuery | undefined;
}

export interface DirectusItemsOptionsAsyncData<TQuery> extends DirectusItemsOptions<TQuery> {
  key?: string;
  params?: AsyncDataOptions<any>;
}
