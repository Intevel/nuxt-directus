import type  {
  DirectusClientConfig
} from './index'

export interface DirectusCollectionOptions<TQuery> extends DirectusClientConfig {
  query?: TQuery | undefined;
}
