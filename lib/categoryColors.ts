// Configuration des couleurs par catégorie
// Chaque catégorie a une couleur de texte, background et border

export interface CategoryColor {
  text: string;
  bg: string;
  bgHover: string;
  border: string;
}

// Palette de couleurs par défaut pour les catégories
const colorPalette: CategoryColor[] = [
  {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    bgHover: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    text: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    bgHover: "hover:bg-purple-100 dark:hover:bg-purple-900/30",
    border: "border-purple-200 dark:border-purple-800",
  },
  {
    text: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
    bgHover: "hover:bg-green-100 dark:hover:bg-green-900/30",
    border: "border-green-200 dark:border-green-800",
  },
  {
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    bgHover: "hover:bg-orange-100 dark:hover:bg-orange-900/30",
    border: "border-orange-200 dark:border-orange-800",
  },
  {
    text: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-900/20",
    bgHover: "hover:bg-pink-100 dark:hover:bg-pink-900/30",
    border: "border-pink-200 dark:border-pink-800",
  },
  {
    text: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-900/20",
    bgHover: "hover:bg-teal-100 dark:hover:bg-teal-900/30",
    border: "border-teal-200 dark:border-teal-800",
  },
  {
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
    bgHover: "hover:bg-red-100 dark:hover:bg-red-900/30",
    border: "border-red-200 dark:border-red-800",
  },
  {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    bgHover: "hover:bg-indigo-100 dark:hover:bg-indigo-900/30",
    border: "border-indigo-200 dark:border-indigo-800",
  },
];

// Map personnalisé pour assigner des couleurs spécifiques à certaines catégories
const customCategoryColors: Record<string, CategoryColor> = {
  "intelligence-artificielle": {
    text: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    bgHover: "hover:bg-purple-100 dark:hover:bg-purple-900/30",
    border: "border-purple-200 dark:border-purple-800",
  },
  ia: {
    text: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    bgHover: "hover:bg-purple-100 dark:hover:bg-purple-900/30",
    border: "border-purple-200 dark:border-purple-800",
  },
  tech: {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    bgHover: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
    border: "border-blue-200 dark:border-blue-800",
  },
  web: {
    text: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-900/20",
    bgHover: "hover:bg-teal-100 dark:hover:bg-teal-900/30",
    border: "border-teal-200 dark:border-teal-800",
  },
  tutorial: {
    text: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
    bgHover: "hover:bg-green-100 dark:hover:bg-green-900/30",
    border: "border-green-200 dark:border-green-800",
  },
  news: {
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    bgHover: "hover:bg-orange-100 dark:hover:bg-orange-900/30",
    border: "border-orange-200 dark:border-orange-800",
  },
};

// Cache pour stocker les couleurs assignées dynamiquement
const categoryColorCache: Record<string, CategoryColor> = {};
let colorIndex = 0;

/**
 * Récupère la couleur d'une catégorie
 * - Cherche d'abord dans les couleurs personnalisées
 * - Sinon, assigne une couleur de la palette de manière cohérente
 */
export function getCategoryColor(categorySlug: string): CategoryColor {
  // Normaliser le slug
  const normalizedSlug = categorySlug.toLowerCase().trim();

  // Vérifier si c'est une catégorie avec couleur personnalisée
  if (customCategoryColors[normalizedSlug]) {
    return customCategoryColors[normalizedSlug];
  }

  // Vérifier le cache
  if (categoryColorCache[normalizedSlug]) {
    return categoryColorCache[normalizedSlug];
  }

  // Assigner une nouvelle couleur depuis la palette
  const color = colorPalette[colorIndex % colorPalette.length];
  categoryColorCache[normalizedSlug] = color;
  colorIndex++;

  return color;
}

/**
 * Récupère toutes les classes CSS pour une catégorie
 * Utile pour les badges de catégorie
 */
export function getCategoryClasses(categorySlug: string): string {
  const colors = getCategoryColor(categorySlug);
  return `${colors.text} ${colors.bg} ${colors.border}`;
}

/**
 * Récupère les classes CSS pour les boutons de filtre
 */
export function getCategoryButtonClasses(
  categorySlug: string,
  isActive: boolean
): string {
  const colors = getCategoryColor(categorySlug);

  if (isActive) {
    // Actif : bordure + background + texte en couleur
    return `${colors.text} ${colors.bg} ${colors.border} border-2 font-semibold`;
  }

  // Inactif : juste la bordure en couleur, texte neutre
  return `text-muted-foreground ${colors.border} border-2 bg-background hover:bg-secondary/50 transition-all`;
}
