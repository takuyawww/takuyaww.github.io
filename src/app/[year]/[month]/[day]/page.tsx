import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostByDate, getPostWithHtml } from "@/lib/posts";

type Props = {
  params: Promise<{ year: string; month: string; day: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month, day } = await params;
  const post = getPostByDate(year, month, day);

  if (!post) {
    return {};
  }

  const title = `takuyawww - ${post.title}`;
  const description = post.excerpt || "";

  return {
    title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => {
    const [year, month, day] = post.date.split("-");
    return {
      year,
      month, // 先頭の0を含む（例: "01"）
      day, // 先頭の0を含む（例: "15"）
    };
  });
}

function getPostUrl(date: string): string {
  const [year, month, day] = date.split("-");
  return `/${year}/${month}/${day}`;
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

  // 前後の記事を取得
  const allPosts = getAllPosts(); // 新しい順にソート済み
  const currentIndex = allPosts.findIndex((p) => p.date === post.date);
  const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const olderPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <article className="py-8 sm:py-10">
      <header className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
          {post.title}
        </h1>
        <time className="text-xs text-white/50 block font-mono">
          {new Date(post.date).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-invert max-w-none">
        <div
          className="text-white/70 leading-relaxed [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-white [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-white [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-2 [&_h3]:text-white [&_p]:mb-3 [&_p]:leading-relaxed [&_p]:text-white/70 [&_a]:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-300 [&_a]:transition-colors [&_code:not(pre_code)]:bg-white/10 [&_code:not(pre_code)]:text-white [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:text-sm [&_pre]:my-3 [&_pre]:overflow-x-auto [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ul]:my-3 [&_li]:text-white/70"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: post.contentHtml || post.content }}
        />
      </div>

      {/* 前後の記事ナビゲーション */}
      <nav className="mt-12 pt-8 border-t border-white/10">
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            {olderPost && (
              <Link
                href={getPostUrl(olderPost.date)}
                className="block group"
              >
                <span className="text-xs text-white/40">前の記事</span>
                <span className="block text-sm text-white/70 group-hover:text-white transition-colors mt-1">
                  {olderPost.title}
                </span>
              </Link>
            )}
          </div>
          <div className="flex-1 text-right">
            {newerPost && (
              <Link
                href={getPostUrl(newerPost.date)}
                className="block group"
              >
                <span className="text-xs text-white/40">次の記事</span>
                <span className="block text-sm text-white/70 group-hover:text-white transition-colors mt-1">
                  {newerPost.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </article>
  );
}
