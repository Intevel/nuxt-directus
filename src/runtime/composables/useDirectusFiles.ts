import { useDirectusUrl } from "./useDirectusUrl";
import { DirectusThumbnailOptions } from "../types";

export const useDirectusImage = () => {
  const directusUrl = useDirectusUrl();

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

  return { getThumbnail };
};
