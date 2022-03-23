import type { Ref } from "vue";
import type {
  DirectusAuthResponse,
  DirectusAuthCredentials,
  DirectusUser,
  DirectusPasswordForgotCredentials,
  DirectusPasswordResetCredentials,
} from "../types";
import { useDirectus } from "./useDirectus";
import { useDirectusUser } from "./useDirectusUser";
import { useDirectusUrl } from "./useDirectusUrl";
import { useDirectusToken } from "./useDirectusToken";

export const useDirectusAuth = () => {
  const url = useDirectusUrl();
  const directus = useDirectus();
  const user = useDirectusUser();
  const token = useDirectusToken();

  const setToken = (value: string | null) => {
    token.value = value;
  };

  const setUser = (value: DirectusUser) => {
    user.value = value;
  };

  const fetchUser = async (): Promise<Ref<DirectusUser>> => {
    if (token.value && !user.value) {
      try {
        var res = await directus("/users/me");
        setUser(res.data);
      } catch (e) {
        setToken(null);
      }
    }

    return user;
  };

  const login = async (
    data: DirectusAuthCredentials
  ): Promise<DirectusAuthResponse> => {
    setToken(null);

    const response: DirectusAuthResponse = await directus("/auth/login", {
      method: "POST",
      body: data,
    });

    setToken(response.data.access_token);

    const user = await fetchUser();

    return {
      user,
      access_token: response.data.access_token,
      expires: response.data.expires,
    };
  };

  const requestPasswordReset = async (
    data: DirectusPasswordForgotCredentials
  ): Promise<void> => {
    await directus("/auth/password/request", {
      method: "POST",
      body: data,
    });
  };

  const resetPassword = async (
    data: DirectusPasswordResetCredentials
  ): Promise<void> => {
    await directus("/auth/password/reset", {
      method: "POST",
      body: data,
    });
  };

  return {
    setToken,
    setUser,
    fetchUser,
    login,
    requestPasswordReset,
    resetPassword,
  };
};
