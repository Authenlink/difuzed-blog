// lib/queries.ts

import { fetchFromStrapi } from "./strapi";
import type { BlogPost, ApiResponse } from "@/types";

// Récupérer tous les posts avec pagination
export async function getAllBlogPosts(page = 1, pageSize = 10) {
  const params = new URLSearchParams({
    sort: "publishedAt:desc",
    populate: "*",
    "pagination[page]": page.toString(),
    "pagination[pageSize]": pageSize.toString(),
  });

  return fetchFromStrapi(
    `/api/articles?${params.toString()}`
  ) as Promise<ApiResponse<BlogPost[]>>;
}

// Récupérer un post spécifique par slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    populate: "*",
  });

  const response = await fetchFromStrapi(
    `/api/articles?${params.toString()}`
  ) as ApiResponse<BlogPost[]>;

  // La réponse est toujours un tableau pour l'endpoint de collection
  const data = response.data;

  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  return null;
}

// Récupérer les posts par catégorie
export async function getBlogPostsByCategory(categorySlug: string) {
  const params = new URLSearchParams({
    "filters[category][slug][$eq]": categorySlug,
    sort: "publishedAt:desc",
    populate: "*",
  });

  return fetchFromStrapi(
    `/api/articles?${params.toString()}`
  ) as Promise<ApiResponse<BlogPost[]>>;
}

// Récupérer les slugs pour la génération statique (ISR)
export async function getAllBlogPostSlugs() {
  const params = new URLSearchParams({
    fields: "slug",
    "pagination[pageSize]": "100",
  });

  const response = await fetchFromStrapi(
    `/api/articles?${params.toString()}`
  ) as ApiResponse<BlogPost>;

  const data = Array.isArray(response.data) ? response.data : [response.data];
  return data.map((post) => post.slug);
}
