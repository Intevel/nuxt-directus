import {
  DirectusClientConfig
} from './index'

export interface DirectusPasswordRequest extends DirectusClientConfig {
  email: string;
  reset_url?: string;
}

export interface DirectusPasswordReset extends DirectusClientConfig {
  token: string;
  password: string;
}

export interface DirectusInviteUser extends DirectusClientConfig {
  email: string;
  role: string;
  invite_url?: string;
}

export interface DirectusAcceptUserInvite extends DirectusClientConfig {
  token: string;
  password: string;
}