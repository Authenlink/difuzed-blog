// types/index.ts - Strapi 5 structure (flat, no data.attributes wrapper)

export interface StrapiImage {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    small?: {
      url: string;
      width: number;
      height: number;
    };
    medium?: {
      url: string;
      width: number;
      height: number;
    };
    large?: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface Author {
  id: number;
  documentId?: string;
  name: string;
  email?: string;
  avatar?: StrapiImage;
}

export interface Category {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  description?: string;
}

// Composants dynamiques du dynamic zone
export interface MediaBlock {
  __component: "shared.media";
  id: string;
  media: StrapiImage;
}

export interface QuoteBlock {
  __component: "shared.quote";
  id: string;
  title?: string;
  body: string;
  author?: string;
}

export interface RichTextBlock {
  __component: "shared.rich-text";
  id: string;
  body: string;
}

export interface SliderBlock {
  __component: "shared.slider";
  id: string;
  files: StrapiImage[];
}

export type DynamicBlock =
  | MediaBlock
  | QuoteBlock
  | RichTextBlock
  | SliderBlock;

export interface BlogPost {
  id: number;
  documentId?: string;
  title: string;
  description: string;
  slug: string;
  cover: StrapiImage;
  author: Author;
  category: Category;
  blocks?: DynamicBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      total: number;
      pageCount: number;
    };
  };
}
