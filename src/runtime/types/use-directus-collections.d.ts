import type { AsyncDataOptions } from '#app'

export interface DirectusCollectionsOptions<TQuery> {
  query?: TQuery | undefined;
}

export interface DirectusCollectionsOptionsAsyncData<TQuery> extends DirectusCollectionsOptions<TQuery> {
  key?: string;
  params?: AsyncDataOptions<any>;
}
