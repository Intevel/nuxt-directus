import type  {
  DirectusClientConfig,
  DirectusUser
} from './index'

export interface DirectusUserFetch<TSchema, TQuery> extends DirectusClientConfig {
  query?: TQuery | undefined;
}

export interface DirectusUserInfo<TSchema, TQuery> extends DirectusUserFetch<TSchema, TQuery>{
  userInfo: Partial<DirectusUser<TSchema>>;
}

export interface DirectusDeleteUser<TSchema> {
  id: DirectusUser<TSchema>["id"]
  useStaticToken?: boolean | string;
}
