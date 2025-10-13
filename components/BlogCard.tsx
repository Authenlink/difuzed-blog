"use client";

import Image from "next/image";
import Link from "next/link";
import { getStrapiImageUrl } from "@/lib/strapi";
import { getCategoryClasses } from "@/lib/categoryColors";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  article: BlogPost;
}

export default function BlogCard({ article }: BlogCardProps) {
  const coverUrl = getStrapiImageUrl(article.cover);
  const authorName = article.author?.name || "Auteur inconnu";
  const categoryName = article.category?.name || "Non classé";
  const categorySlug = article.category?.slug || "non-classe";
  const categoryClasses = getCategoryClasses(categorySlug);

  return (
    <article className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-border flex flex-col h-full">
      {coverUrl && (
        <Link href={`/blog/${article.slug}`}>
          <div className="relative h-48 w-full cursor-pointer">
            <Image
              src={coverUrl}
              alt={article.title}
              fill
              className="object-cover hover:opacity-90 transition-opacity"
            />
          </div>
        </Link>
      )}

      <div className="p-6 border border-border flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded border ${categoryClasses}`}
          >
            {categoryName}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
          </span>
        </div>

        <Link href={`/blog/${article.slug}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors cursor-pointer">
            {article.title}
          </h3>
        </Link>

        <p className="text-foreground mb-4 line-clamp-3 flex-grow">
          {article.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t mt-auto">
          <span className="text-sm text-gray-500">Par {authorName}</span>
          <Link
            href={`/blog/${article.slug}`}
            className="text-primary hover:text-primary font-semibold text-sm"
          >
            Lire l&apos;article →
          </Link>
        </div>
      </div>
    </article>
  );
}
