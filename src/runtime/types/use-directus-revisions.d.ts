import type { DirectusClientConfig } from "./index";

export interface DirectusRevisionsOptions<TQuery> extends DirectusClientConfig {
  query?: TQuery | undefined;
}

export interface DirectusRevisionsOptionsAsyncData<TQuery>
  extends DirectusRevisionsOptions<TQuery> {
  key?: string;
  params?: AsyncDataOptions<any>;
}
