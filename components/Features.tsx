"use client";

import { useState, useMemo } from "react";
import { useStrapi } from "@/hooks/useStrapi";
import { getCategoryButtonClasses } from "@/lib/categoryColors";
import type { BlogPost } from "@/types";
import BlogCard from "./BlogCard";

export default function Features() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: articles,
    loading,
    error,
  } = useStrapi<BlogPost>("articles", {
    populate: "cover,author,category",
    sort: "publishedAt:desc",
  });

  // Extraire toutes les catégories uniques
  const categories = useMemo(() => {
    if (!articles) return [];
    const uniqueCategories = new Map();
    articles.forEach((article) => {
      if (article.category) {
        uniqueCategories.set(article.category.slug, article.category);
      }
    });
    return Array.from(uniqueCategories.values());
  }, [articles]);

  // Filtrer les articles par catégorie ET par recherche textuelle
  const filteredArticles = useMemo(() => {
    if (!articles) return [];

    let result = articles;

    // Filtre par catégorie
    if (selectedCategory !== "all") {
      result = result.filter(
        (article) => article.category?.slug === selectedCategory
      );
    }

    // Filtre par recherche textuelle (insensible à la casse)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter((article) =>
        article.title.toLowerCase().includes(query)
      );
    }

    return result;
  }, [articles, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <section className="py-10 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-500">
            Chargement des articles...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 font-semibold mb-2">
              Erreur de connexion à Strapi
            </p>
            <p className="text-red-500 text-sm">{error}</p>
            <p className="text-gray-600 text-sm mt-2">
              Vérifiez que Strapi est démarré sur http://localhost:1337
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <section className=" md:my-20">
        <div className="max-w-6xl mx-auto px-4 md:my-20">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 font-semibold sm:mb-2 md:mt-20">
              Aucun article trouvé
            </p>
            <p className="text-yellow-700 text-sm">
              Créez votre premier article dans le CMS Strapi
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-6 lg:my-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center sm:mt-10 lg:mt-10 xl:mt-20">
          Articles récents
        </h2>
        <p className="text-center text-gray-foreground mb-8">
          Découvrez nos derniers articles de blog
        </p>

        {/* Barre de recherche */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un article par titre..."
              className="w-full px-6 py-3 pl-12 rounded-full border-2 border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Tous les articles
          </button>
          {categories.map((category) => {
            const buttonClasses = getCategoryButtonClasses(
              category.slug,
              selectedCategory === category.slug
            );
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-2 rounded-full transition-all duration-200 shadow-sm ${buttonClasses} ${
                  selectedCategory === category.slug ? "shadow-md" : ""
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Affichage du nombre d'articles filtrés */}
        <p className="text-center text-muted-foreground mb-6 text-sm">
          {filteredArticles.length} article
          {filteredArticles.length > 1 ? "s" : ""} trouvé
          {filteredArticles.length > 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>

        {/* Message si aucun article dans cette catégorie */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aucun article dans cette catégorie pour le moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
