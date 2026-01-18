import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostWithHtml } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => {
    const [year, month, day] = post.date.split("-");
    return {
      year,
      month, // 先頭の0を含む（例: "01"）
      day,   // 先頭の0を含む（例: "15"）
    };
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ year: string; month: string; day: string }>;
}) {
  const { year, month, day } = await params;
  
  const post = await getPostWithHtml(year, month, day);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 sm:px-8 py-8 sm:py-10">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-black/50 hover:text-black mb-6 transition-colors duration-200"
      >
        ← Back to blog
      </Link>

      <header className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-black mb-2 leading-tight">
          {post.title}
        </h1>
        <time className="text-xs text-black/50 block font-mono">
          {new Date(post.date).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      <div className="prose prose-black max-w-none">
        <div
          className="text-black/70 leading-relaxed [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-black [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-black [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-2 [&_h3]:text-black [&_p]:mb-3 [&_p]:leading-relaxed [&_p]:text-black/70 [&_a]:text-blue-600 [&_a]:hover:text-blue-700 [&_a]:hover:underline [&_code:not(pre_code)]:bg-black/5 [&_code:not(pre_code)]:text-black [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:text-sm [&_pre]:my-3 [&_pre]:overflow-x-auto [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ul]:my-3 [&_li]:text-black/70"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || post.content }}
        />
      </div>
    </article>
  );
}
