import type { AsyncDataOptions } from '#app'

export interface DirectusFilesOptions<TQuery> {
  query?: TQuery | undefined;
}

export interface DirectusFilesOptionsAsyncData<TQuery> extends DirectusFilesOptions<TQuery> {
  key?: string;
  params?: AsyncDataOptions<any>;
}
