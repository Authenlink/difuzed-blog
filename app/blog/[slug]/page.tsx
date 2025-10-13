import { getBlogPostBySlug, getAllBlogPostSlugs } from "@/lib/queries";
import { getStrapiImageUrl } from "@/lib/strapi";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogNavbar } from "@/components/BlogNavbar";
import type {
  MediaBlock,
  RichTextBlock,
  QuoteBlock,
  SliderBlock,
} from "@/types";

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

// Générer les routes statiques (ISR)
export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

function renderBlock(
  block: MediaBlock | RichTextBlock | QuoteBlock | SliderBlock
) {
  switch (block.__component) {
    case "shared.media":
      const mediaBlock = block as MediaBlock;
      if (!mediaBlock.media) {
        return null;
      }
      const mediaUrl = getStrapiImageUrl(mediaBlock.media);
      return mediaUrl ? (
        <div key={block.id} className="my-8">
          <Image
            src={mediaUrl}
            alt="Media"
            width={800}
            height={400}
            className="rounded-lg w-full"
          />
        </div>
      ) : null;

    case "shared.rich-text":
      const richBlock = block as RichTextBlock;
      if (!richBlock.body) {
        return null;
      }
      return (
        <div
          key={block.id}
          className="prose prose-lg max-w-none my-6"
          dangerouslySetInnerHTML={{ __html: richBlock.body }}
        />
      );

    case "shared.quote":
      const quoteBlock = block as QuoteBlock;
      if (!quoteBlock.body) {
        return null;
      }
      return (
        <blockquote
          key={block.id}
          className="border-l-4 border-primary pl-6 italic my-8 text-muted-foreground bg-muted p-4 rounded-r-lg"
        >
          <p className="text-lg">&ldquo;{quoteBlock.body}&rdquo;</p>
          {quoteBlock.author && (
            <p className="text-sm mt-2 not-italic font-semibold">
              — {quoteBlock.author}
            </p>
          )}
        </blockquote>
      );

    case "shared.slider":
      const sliderBlock = block as SliderBlock;
      if (!sliderBlock.files || sliderBlock.files.length === 0) {
        return null;
      }
      return (
        <div
          key={block.id}
          className="my-8 grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {sliderBlock.files.map((file, idx) => {
            const fileUrl = getStrapiImageUrl(file);
            return fileUrl ? (
              <div key={idx} className="relative h-48">
                <Image
                  src={fileUrl}
                  alt={`Image ${idx}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ) : null;
          })}
        </div>
      );

    default:
      return null;
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const coverUrl = getStrapiImageUrl(post.cover);
  const authorName = post.author?.name || "Auteur inconnu";
  const categoryName = post.category?.name || "Non classé";

  return (
    <main className="relative bg-background flex justify-center items-center flex-col overflow-hidden mx-auto px-2">
      <div className="w-full mt-20">
        <BlogNavbar />

        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Cover Image */}
          {coverUrl && (
            <div className="relative h-[400px] md:h-[500px] w-full mb-8 rounded-lg overflow-hidden border border-border">
              <Image
                src={coverUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                {categoryName}
              </span>
              <span className="text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="text-muted-foreground">Par {authorName}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          </div>

          {/* Separator */}
          <hr className="border-border my-8" />

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {post.blocks && post.blocks.length > 0 ? (
              post.blocks.map((block) => renderBlock(block))
            ) : (
              <p className="text-muted-foreground">Aucun contenu disponible</p>
            )}
          </div>

          {/* Back to blog link */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Retour aux articles
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
