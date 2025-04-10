import { $fetch, FetchOptions } from "ofetch";

export async function apiClient(url: string, options: FetchOptions = {}) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers || {}),
  };

  try {
    return await $fetch(url, {
      headers,
      baseURL: import.meta.env.VITE_BASE_URL_API,
      ...options,
    });
  } catch (e: any) {
    throw e;
  }
}
