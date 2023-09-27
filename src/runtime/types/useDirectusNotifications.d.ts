import type  {
  DirectusClientConfig
} from './index'

export interface DirectusNotificationsOptions<TQuery> extends DirectusClientConfig {
  query?: TQuery | undefined;
}
