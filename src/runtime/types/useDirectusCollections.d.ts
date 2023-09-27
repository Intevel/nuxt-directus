import type  {
  DirectusClientConfig
} from './index'

export interface DirectusCollectionsOptions<TQuery> extends DirectusClientConfig {
  query?: TQuery | undefined;
}
