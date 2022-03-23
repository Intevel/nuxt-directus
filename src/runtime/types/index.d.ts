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
  email: string;
  password: string;
}
