import type { 
  AuthenticationData,
  AuthenticationStorage
} from './index'

export interface RefreshToken {
  refreshToken: (maxAge?: number | undefined) => CookieRef<string | null | undefined>
}

export interface DirectusTokens extends AuthenticationStorage, RefreshToken {
  tokens: Ref<AuthenticationData | null>
}
