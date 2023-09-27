import type  {
  DirectusClientConfig
} from './index'

export interface DirectusFilesOptions<TQuery> extends DirectusClientConfig {
  query?: TQuery | undefined;
}
