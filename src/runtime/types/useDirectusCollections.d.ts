import type  {
  DirectusClientConfig
} from './index'

export interface DirectusCollectionsOptions<TQuery> extends DirectusClientConfig {
  query?: TQuery | undefined;
}

export interface DirectusCollectionsOptionsAsyncData extends DirectusClientConfig {
  key?: string;
  params?: AsyncDataOptions<any>;
}
