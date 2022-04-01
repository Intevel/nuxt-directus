import { useDirectus } from "./useDirectus";
import {
  DirectusItemRequest,
  DirectusItemCreation,
  DirectusItemDeletion,
  DirectusItemUpdate,
} from "../types";

export const useDirectusItems = () => {
  const directus = useDirectus();

  const getItems = async (data: DirectusItemRequest) => {
    if (data.params?.filter) {
      // @ts-ignore
      data.params.filter = JSON.stringify(data.params.filter);
    }
    const items = await directus(`/items/${data.collection}`, {
      method: "GET",
      params: data.params,
    });

    // @ts-ignore
    return items.data;
  };

  const getItemById = async (data: DirectusItemRequest) => {
    const items = await directus(`/items/${data.collection}/${data.id}`, {
      method: "GET",
    });

    // @ts-ignore
    return items.data;
  };

  const createItems = async (data: DirectusItemCreation) => {
    await directus(`/items/${data.collection}`, {
      method: "POST",
      body: data.items,
    });
  };

  const deleteItems = async (data: DirectusItemDeletion) => {
    await directus(`/items/${data.collection}`, {
      method: "DELETE",
      body: data.items,
    });
  };

  const updateItem = async (data: DirectusItemUpdate) => {
    await directus(`/items/${data.collection}/${data.id}`, {
      method: "PATCH",
      body: data.item,
    });
  };

  return { getItems, getItemById, createItems, deleteItems, updateItem };
};
