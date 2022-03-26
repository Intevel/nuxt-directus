import { useDirectus } from "./useDirectus";
import { DirectusItemRequest } from "../types";

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

  return { getItems, getItemById };
};
