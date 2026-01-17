import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

// 日付を YYYY/MM/DD 形式のURLに変換
function getPostUrl(date: string): string {
  const [year, month, day] = date.split("-");
  return `/${year}/${month}/${day}`;
}

export default function Home() {
  const posts = getAllPosts();
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-8 sm:py-10">
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.date}
            className="group"
          >
            <Link href={getPostUrl(post.date)}>
              <h2 className="text-xl font-semibold text-black mb-1 hover:text-blue-600 transition-colors duration-200">
                {post.title}
              </h2>
            </Link>
            <time className="text-xs text-black/50 block mb-2 font-mono">
              {new Date(post.date).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <p className="text-sm text-black/60 leading-relaxed">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-black/50">まだ記事がありません</p>
        </div>
      )}
    </div>
  );
}

