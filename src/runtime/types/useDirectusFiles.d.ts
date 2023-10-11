import type  {
  DirectusClientConfig
} from './index'

export interface DirectusFilesOptions<TQuery> extends DirectusClientConfig {
  query?: TQuery | undefined;
}

export interface DirectusFilesOptionsAsyncData<TQuery> extends DirectusFilesOptions<TQuery> {
  key?: string;
  params?: AsyncDataOptions<any>;
}
