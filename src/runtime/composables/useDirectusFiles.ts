import { useDirectusUrl } from "./useDirectusUrl";
import {
  DirectusThumbnailOptions,
  DirectusItemRequest,
  DirectusFileRequest,
} from "../types";

export const useDirectusFiles = () => {
  const directusUrl = useDirectusUrl();
  const directus = useDirectus();

  const getFiles = async <T>(data: DirectusFileRequest): Promise<T[]> => {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter);
    }
    if (data.params?.deep) {
      (data.params.deep as unknown) = JSON.stringify(data.params.deep);
    }

    const files = await directus<{ data: T[] }>(`/files/`, {
      method: "GET",
      params: data.params,
    });
    return files.data;
  };

  const getThumbnail = (
    fileId: string,
    options?: DirectusThumbnailOptions
  ): string => {
    const url = new URL(`${directusUrl}assets/${fileId}`);
    if (options) {
      if (options.width)
        url.searchParams.append("width", options.width.toFixed(0));
      if (options.height)
        url.searchParams.append("height", options.height.toFixed(0));
      if (options.quality)
        url.searchParams.append("quality", options.quality.toFixed(0));
      if (options.withoutEnlargement)
        url.searchParams.append("withoutEnlargement", "true");
      if (options.fit) url.searchParams.append("fit", options.fit);
      if (options.format) url.searchParams.append("format", options.format);
    }
    return url.href;
  };

  return { getFiles, getThumbnail };
};
