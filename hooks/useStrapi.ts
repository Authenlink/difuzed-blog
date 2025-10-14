import { useEffect, useState } from "react";
import { fetchFromStrapi } from "@/lib/strapi";
import type { ApiResponse } from "@/types";

export function useStrapi<T>(
  endpoint: string,
  options?: {
    populate?: string;
    sort?: string;
    pagination?: { page: number; pageSize: number };
  }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Construire les query params
        const params = new URLSearchParams();

        if (options?.populate) {
          // Utiliser populate=* pour populer tous les champs de premier niveau
          params.append("populate", "*");
        }

        if (options?.sort) {
          params.append("sort", options.sort);
        }

        if (options?.pagination) {
          params.append("pagination[page]", options.pagination.page.toString());
          params.append(
            "pagination[pageSize]",
            options.pagination.pageSize.toString()
          );
        }

        const queryString = params.toString();
        const url = `/api/${endpoint}${queryString ? "?" + queryString : ""}`;

        const response = (await fetchFromStrapi(url)) as ApiResponse<T>;

        setData(response.data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, options?.populate, options?.sort, options?.pagination?.page, options?.pagination?.pageSize]);

  return { data, loading, error };
}
