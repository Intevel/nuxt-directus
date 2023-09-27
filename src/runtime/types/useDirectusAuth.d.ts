import {
  DirectusClientConfig
} from './index'

export interface DirectusPasswordForgotCredentials extends DirectusClientConfig {
  email: string;
  reset_url?: string;
}

export interface DirectusPasswordReset extends DirectusClientConfig {
  token: string;
  password: string;
}
