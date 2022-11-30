import {
  DirectusUserRequest,
  DirectusUserCreation,
  DirectusUserUpdate,
  DirectusUserDeletion,
} from "../types";
import { useDirectus } from "./useDirectus";

export const useDirectusUsers = () => {
  const directus = useDirectus();

  const getUsers = async <T>(data: DirectusUserRequest): Promise<T> => {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter);
    }
    if (data.params?.deep) {
      (data.params.deep as unknown) = JSON.stringify(data.params.deep);
    }
    const users = await directus(`/users`, {
      method: "GET",
      params: data.params,
    });

    if (users.meta) {
      return { meta: users.meta, data: users.data };
    } else {
      return users.data;
    }
  };

  const getUserById = async <T>(data: DirectusUserRequest): Promise<T> => {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter);
    }
    if (data.params?.deep) {
      (data.params.deep as unknown) = JSON.stringify(data.params.deep);
    }
    const users = await directus<{ data: T }>(`/users/${data.id}`, {
      method: "GET",
      params: data.params,
    });
    return users.data;
  };

  const createUsers = async <T>(data: DirectusUserCreation): Promise<T[]> => {
    const users = await directus<{ data: T[] }>(`/users`, {
      method: "POST",
      body: data.users,
    });
    return users.data;
  };

  const deleteUsers = async (data: DirectusUserDeletion): Promise<void> => {
    await directus<void>(`/users`, {
      method: "DELETE",
      body: data.users,
    });
  };

  const updateUser = async <T>(data: DirectusUserUpdate): Promise<T> => {
    const user = await directus<{ data: T }>(`/users/${data.id}`, {
      method: "PATCH",
      body: data.user,
    });
    return user.data;
  };

  return {
    getUsers,
    getUserById,
    createUsers,
    deleteUsers,
    updateUser,
  };
};
