export type DirectusUser = object | null;

export interface DirectusAuthCredentials {
  email: string;
  password: string;
  otp?: string;
}

export interface DirectusAuthResponse {
  user: DirectusUser;
  access_token: string;
  expires: number;
  refresh_token?: string;
}

export interface DirectusPasswordForgotCredentials {
  email: string;
  reset_url?: string;
}

export interface DirectusPasswordResetCredentials {
  token: string;
  password: string;
}

export interface DirectusItemRequest {
  collection: string;
  id?: string;
  params?: DirectusQueryParams;
}

export interface DirectusItemCreation {
  collection: string;
  items: Array<Object> | Object;
}

export interface DirectusItemDeletion {
  collection: string;
  items: Array<string> | string;
}

export interface DirectusQueryParams {
  fields?: Array<string>;
  sort?: string | Array<string>;
  filter?: Record<string, unknown>;
  limit?: number;
  offset?: number;
  page?: number;
  alias?: string | Array<string>;
}
