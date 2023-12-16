import {
  DirectusClientConfig
} from './index'

export interface DirectusInviteUser extends DirectusClientConfig {
  invite_url?: string;
}
