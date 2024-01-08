import type  {
  DirectusUser
} from './index'

export interface DirectusUsersOptions<TQuery> {
  query?: TQuery | undefined;
}

export interface DirectusUsersOptionsAsyncData<TQuery> extends DirectusUsersOptions<TQuery> {
  key?: string;
  params?: AsyncDataOptions<any>;
}
