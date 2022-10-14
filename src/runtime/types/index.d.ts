type ArrayOfOrSingle<T> = T | T[];

export type DirectusUser = {
  /** Unique identifier for the user. */
  id: string;
  /** First name of the user. */
  first_name: string;
  /** Last name of the user. */
  last_name: string;
  /** Unique email address for the user. */
  email: string;
  /** Password of the user. */
  password: string;
  /** The user's location. */
  location: string | null;
  /** The user's title. */
  title: string | null;
  /** The user's description. */
  description: string | null;
  /** The user's tags. */
  tags: string[] | null;
  /** The user's avatar. */
  avatar: string | null;
  /** The user's language used in Directus. */
  language: string;
  /** What theme the user is using. */
  theme: 'light' | 'dark' | 'auto';
  /** The 2FA secret string that's used to generate one time passwords. */
  tfa_secret: string | null;
  /** Status of the user. */
  status: 'active' | 'invited' | 'draft' | 'suspended' | 'deleted';
  /** Unique identifier of the role of this user. */
  role: string;
  /** Static token for the user. */
  token: string | null;
  last_access: string | null;
  /** Last page that the user was on. */
  last_page: string | null;
  provider?: string;
  external_identifier?: string | null;
  auth_data?: { [key: string]: any } | null;
  email_notifications?: boolean | null;
  // preferences_divider?: string;
  // admin_divider?: string;
};

export type DirectusCollections = Record<string, Record<string, any>>;

export interface DirectusQueryParamsMeta {
  total_count?: number;
  filter_count?: number;
}

export type DirectusQueryParamsMetaAll = '*';

export interface DirectusQueryParams {
  fields?: string[];
  sort?: ArrayOfOrSingle<string>;
  filter?: Record<string, unknown>;
  limit?: number;
  offset?: number;
  page?: number;
  alias?: ArrayOfOrSingle<string>;
  deep?: Record<string, unknown>;
  search?: string;
  meta?: keyof DirectusQueryParamsMeta | DirectusQueryParamsMetaAll;
}

export interface DirectusAuthCredentials {
  email: string;
  password: string;
  otp?: string;
}

export interface DirectusAuthResponse<User = DirectusUser> {
  user: User;
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

export type DirectusItemRequest<T extends DirectusCollections> = {
  [C in keyof T]-?: {
    id?: T[C]['id'];
    params?: DirectusQueryParams;
  };
};

export type DirectusItemWithoutId<
  T extends Record<string, any> = Record<string, any>
> = {
  [C in keyof Omit<T, 'id'>]: T[C];
} & { id?: never; };

export type DirectusItemCreation<T extends DirectusCollections> = {
  [C in keyof T]-?: {
    items: ArrayOfOrSingle<DirectusItemWithoutId<T[C]>>;
  };
};

export type DirectusItemUpdate<T extends DirectusCollections> = {
  [C in keyof T]-?: {
    id: T[C]['id'];
    item: T[C];
  };
};

export type DirectusItemDeletion<T extends DirectusCollections> = {
  [C in keyof T]-?: {
    items: ArrayOfOrSingle<T[C]['id']>;
  };
};

export type DirectusThumbnailFormat = 'jpg' | 'png' | 'webp' | 'tiff';

export type DirectusThumbnailFit = 'cover' | 'contain' | 'inside' | 'outside';

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
  status?: 'inbox' | 'archived';
  recipient: string[] | string;
  sender?: string[] | string;
  subject: string;
  message?: string;
  collection?: string;
  item?: string;
}

export interface DirectusCollectionMeta<T extends DirectusCollections, C extends keyof T> {
  collection?: C;
  icon?: string;
  note?: string;
  display_template?: string;
  hidden?: boolean;
  singleton?: boolean;
  translations?: [
    {
      language?: string;
      translation?: string;
    }
  ];
  archive_field?: string;
  archive_value?: string;
  unarchive_value?: string;
  archive_app_filter?: boolean;
  sort_field?: string;
  item_duplication_fields?: string[];
  sort?: number;
  collapse?: 'open' | 'closed' | 'locked';
}

export type DirectusCollectionInfo <T extends DirectusCollections> = {
  [C in keyof T]-?: {
    collection: C;
    meta: DirectusCollectionMeta<T, C>;
    schema: {
      name: C;
      sql: string;
    };
  };
};

export interface DirectusCollectionCreation {
  collection: keyof DirectusCollections;
  meta?: DirectusCollectionMeta<DirectusCollections, keyof DirectusCollections>;
  schema?: {
    name?: string;
    comment?: string;
  };
}

export interface DirectusCollectionUpdate <T extends DirectusCollections, C extends keyof T> {
  meta: DirectusCollectionMeta<T, C>;
}

export interface DirectusRevision {
  id: number;
  activity?: any;
  collection: string; // FIXME:
  item?: string;
  data?: Object;
  delta?: Object;
  parent?: any;
}
