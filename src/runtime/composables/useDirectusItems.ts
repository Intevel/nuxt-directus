import { useDirectus } from "./useDirectus";

export const useDirectusItems = () => {
  const directus = useDirectus();

  const getItems = async (data: { collection: string }) => {
    const items = await directus(`/items/${data}`, {
      method: "GET",
    });

    // @ts-ignore
    return items.data;
  };

  return { getItems };
};
