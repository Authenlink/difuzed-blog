// app/blog/page.tsx

import { getAllBlogPosts } from "@/lib/queries";
import BlogCard from "@/components/BlogCard";

// Désactiver le prerendering statique pour cette page
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const response = await getAllBlogPosts(1, 10);
  const posts = Array.isArray(response.data) ? response.data : [response.data];

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">Notre Blog</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">Aucun article trouvé</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} article={post} />
          ))}
        </div>
      )}
    </main>
  );
}
