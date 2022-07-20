import { useDirectusUrl } from "./useDirectusUrl";
import type { FetchError, FetchOptions } from "ohmyfetch";

export const useDirectusGraphQL = (query: any, variables?: object) => {
  let url = useDirectusUrl();

  // strip trailing slash
  url = url.replace(/\/$/, "");

  return $fetch(`${url}/graphql`, {
    method: "POST",
    body: JSON.stringify({ query, ...(variables && { variables }) }),
  });
};
