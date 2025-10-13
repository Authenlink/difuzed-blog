const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const strapiToken = process.env.STRAPI_API_TOKEN;

export async function fetchFromStrapi(endpoint: string, options?: RequestInit) {
  const url = new URL(endpoint, strapiUrl);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Ajouter le token d'authentification si disponible
  if (strapiToken) {
    defaultHeaders["Authorization"] = `Bearer ${strapiToken}`;
  }

  const defaultOptions: RequestInit = {
    headers: defaultHeaders,
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options?.headers || {}),
    },
  };

  try {
    const response = await fetch(url.toString(), mergedOptions);

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching from Strapi:", error);
    throw error;
  }
}

// Fonction pour construire les URLs d'images Strapi (Strapi 5 structure)
export function getStrapiImageUrl(imageData: any): string | null {
  if (!imageData) {
    return null;
  }

  // Strapi 5: structure plate - l'image est directement accessible
  const imageUrl = imageData.url;

  if (!imageUrl) {
    return null;
  }

  // Si l'URL est déjà complète, retourne-la
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  // Sinon, ajoute l'URL Strapi
  return `${strapiUrl}${imageUrl}`;
}
