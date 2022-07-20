import { useDirectus } from "./useDirectus";
import { DirectusQueryParams, DirectusNotificationObject } from "../types";

export const useDirectusNotifications = () => {
  const directus = useDirectus();

  const getNotifications = async <T>(data: {
    params: DirectusQueryParams;
  }): Promise<T[]> => {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter);
    }
    if (data.params?.deep) {
      (data.params.deep as unknown) = JSON.stringify(data.params.deep);
    }
    const notifications = await directus<{ data: T[] }>(`/notifications`, {
      method: "GET",
      params: data.params,
    });
    return notifications.data;
  };

  const getNotificationByKey = async <T>(data: {
    id: number;
    params: DirectusQueryParams;
  }): Promise<T[]> => {
    const notifications = await directus<{ data: T[] }>(
      `/notifications/${data.id}`,
      {
        method: "GET",
        params: data.params,
      }
    );
    return notifications.data;
  };

  // A partial notification object.
  const createNotification = async <T>(data: {
    notification: DirectusNotificationObject;
  }): Promise<T[]> => {
    const notification = await directus<{ data: T[] }>(`/notifications`, {
      method: "POST",
      body: data.notification,
    });
    return notification.data;
  };

  const deleteNotification = async (data: {
    notifications: Array<string> | string;
  }): Promise<void> => {
    await directus<void>(`/notifications`, {
      method: "DELETE",
      body: data.notifications,
    });
  };

  return {
    getNotifications,
    getNotificationByKey,
    createNotification,
    deleteNotification,
  };
};
