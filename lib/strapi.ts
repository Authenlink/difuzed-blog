const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Debug: Log des variables d'environnement (à retirer en production)
console.log('🔍 Strapi Config:', {
  url: strapiUrl,
  hasToken: !!strapiToken,
  tokenLength: strapiToken?.length || 0
});

// En production, utiliser le proxy Next.js pour éviter les problèmes CORS
const useProxy = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_USE_STRAPI_PROXY === 'true';

async function fetchFromProxy(url: string, options?: RequestInit) {
  console.log('📡 Proxy fetch from:', url);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

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
    console.log('🚀 Starting proxy fetch request...');
    const response = await fetch(url, mergedOptions);
    console.log('✅ Proxy fetch successful, status:', response.status);

    if (!response.ok) {
      console.error('❌ Proxy response not OK:', response.status, response.statusText);
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📦 Data received from proxy:', data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching from proxy:", error);
    throw error;
  }
}

export async function fetchFromStrapi(endpoint: string, options?: RequestInit) {
  // Utiliser le proxy en production ou si explicitement demandé
  if (useProxy) {
    console.log('🔄 Using Next.js proxy for Strapi request');
    const proxyUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const fullUrl = `${proxyUrl}/api${endpoint}`;
    return fetchFromProxy(fullUrl, options);
  }

  const url = new URL(endpoint, strapiUrl);

  console.log('📡 Fetching from:', url.toString());

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
    console.log('🚀 Starting fetch request...');
    const response = await fetch(url.toString(), mergedOptions);
    console.log('✅ Fetch successful, status:', response.status);

    if (!response.ok) {
      console.error('❌ Response not OK:', response.status, response.statusText);
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📦 Data received:', data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching from Strapi:", error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('⚠️ Network error - Check if Strapi is running and CORS is configured');
    }
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

  // En production avec proxy, utiliser le proxy pour les images aussi
  if (useProxy) {
    const proxyUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    return `${proxyUrl}/api${imageUrl}`;
  }

  // Sinon, ajoute l'URL Strapi directe
  return `${strapiUrl}${imageUrl}`;
}
