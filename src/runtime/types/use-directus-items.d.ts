import type { AsyncDataOptions } from '#app'

export interface DirectusItemsOptions<TQuery> {
  query?: TQuery | undefined;
}

export interface DirectusItemsOptionsAsyncData<TQuery> extends DirectusItemsOptions<TQuery> {
  key?: string;
  params?: AsyncDataOptions<any>;
}
