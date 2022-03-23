import type { Ref } from "vue";
import type {
  DirectusAuthResponse,
  DirectusAuthCredentials,
  DirectusUser,
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
        user.value = await directus("/users/me");
      } catch (e) {
        setToken(null);
      }
    }

    return user;
  };

  /**
   * Login
   *
   * @param  {DirectusAuthCredentials} data - User authentication credentials
   * @param  {string} data.email - The email or username of the user
   * @param  {string} data.password - The password of the user
   * @returns Promise<DirectusAuthResponse>
   */
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

  return {
    setToken,
    setUser,
    fetchUser,
    login,
  };
};
