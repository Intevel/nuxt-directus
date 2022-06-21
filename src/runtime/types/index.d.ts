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

export interface DirectusQueryParams {
  fields?: Array<string>;
  sort?: string | Array<string>;
  filter?: Record<string, unknown>;
  limit?: number;
  offset?: number;
  page?: number;
  alias?: string | Array<string>;
  deep?: Record<string, unknown>;
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

export interface DirectusItemUpdate {
  collection: string;
  id: string;
  item: Object;
}
export interface DirectusItemDeletion {
  collection: string;
  items: Array<string> | string;
}

export type DirectusThumbnailFormat = "jpg" | "png" | "webp" | "tiff";

export type DirectusThumbnailFit = "cover" | "contain" | "inside" | "outside";

export interface DirectusThumbnailOptions {
  width?: number;
  height?: number;
  quality?: number;
  fit?: DirectusThumbnailFit;
  format?: DirectusThumbnailFormat;
  withoutEnlargement?: boolean;
}

export interface DirectusRegisterCredentials {
  email: string;
  password: string;
}

export type DirectusFile = object | null;

export interface DirectusFileRequest {
  id?: string;
  params?: DirectusQueryParams;
}

export interface DirectusNotificationObject {
  id?: number;
  timestamp?: string;
  status?: "inbox" | "archived";
  recipient: Array<string> | string;
  sender?: Array<string> | string;
  subject: string;
  message?: string;
  collection?: string;
  item?: string;
}
