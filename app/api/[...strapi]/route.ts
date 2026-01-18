import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ strapi: string[] }> }
) {
  try {
    const { strapi } = await params;
    const path = strapi.join('/');
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Construire l'URL Strapi
    const strapiUrl = new URL(`/api/${path}`, STRAPI_URL);
    strapiUrl.search = searchParams.toString();

    console.log('🔄 Proxying to Strapi:', strapiUrl.toString());

    // Headers pour la requête vers Strapi
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    // Ajouter le token d'authentification si disponible
    if (STRAPI_TOKEN) {
      headers.set('Authorization', `Bearer ${STRAPI_TOKEN}`);
    }

    // Copier les headers importants de la requête originale
    const acceptHeader = request.headers.get('accept');
    const userAgent = request.headers.get('user-agent');

    if (acceptHeader) headers.set('Accept', acceptHeader);
    if (userAgent) headers.set('User-Agent', userAgent);

    // Faire la requête vers Strapi
    const response = await fetch(strapiUrl.toString(), {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      console.error('❌ Strapi response error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Strapi API error' },
        { status: response.status }
      );
    }

    // Récupérer les données
    const data = await response.json();

    console.log('✅ Proxy successful');

    // Retourner la réponse avec les headers CORS appropriés
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('❌ Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ strapi: string[] }> }
) {
  try {
    const { strapi } = await params;
    const path = strapi.join('/');
    const body = await request.json();

    const strapiUrl = new URL(`/api/${path}`, STRAPI_URL);

    console.log('🔄 Proxying POST to Strapi:', strapiUrl.toString());

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (STRAPI_TOKEN) {
      headers.set('Authorization', `Bearer ${STRAPI_TOKEN}`);
    }

    const response = await fetch(strapiUrl.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error('❌ Strapi POST response error:', response.status, response.statusText);
      const errorData = await response.text();
      return NextResponse.json(
        { error: errorData || 'Strapi API error' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('❌ Proxy POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Gérer les requêtes OPTIONS pour le CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}