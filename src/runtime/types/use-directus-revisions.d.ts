import type { AsyncDataOptions } from '#app'

export interface DirectusRevisionsOptions<TQuery> {
  query?: TQuery | undefined;
}

export interface DirectusRevisionsOptionsAsyncData<TQuery>
  extends DirectusRevisionsOptions<TQuery> {
  key?: string;
  params?: AsyncDataOptions<any>;
}
