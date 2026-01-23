import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

// 日付を YYYY/MM/DD 形式のURLに変換
function getPostUrl(date: string): string {
  const [year, month, day] = date.split("-");
  return `/${year}/${month}/${day}`;
}

// 投稿を年月でグループ化
function groupPostsByYearMonth(posts: ReturnType<typeof getAllPosts>) {
  const grouped: Record<string, Record<string, typeof posts>> = {};

  posts.forEach((post) => {
    const [year, month] = post.date.split("-");
    if (!grouped[year]) {
      grouped[year] = {};
    }
    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }
    grouped[year][month].push(post);
  });

  return grouped;
}

export default function ArchivesPage() {
  const posts = getAllPosts();
  const groupedPosts = groupPostsByYearMonth(posts);
  const years = Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a));

  return (
    <div className="py-8 sm:py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-8">アーカイブ</h1>

      <div className="space-y-8">
        {years.map((year) => (
          <section key={year}>
            <h2 className="text-lg font-semibold text-white/80 mb-4 font-mono">
              {year}
            </h2>
            <div className="space-y-6 ml-4 border-l border-white/20 pl-6">
              {Object.keys(groupedPosts[year])
                .sort((a, b) => b.localeCompare(a))
                .map((month) => (
                  <div key={month}>
                    <h3 className="text-sm font-medium text-white/60 mb-3 font-mono">
                      {month}月
                    </h3>
                    <ul className="space-y-2">
                      {groupedPosts[year][month].map((post) => (
                        <li key={post.date}>
                          <Link
                            href={getPostUrl(post.date)}
                            className="group flex items-baseline gap-3"
                          >
                            <span className="text-xs text-white/40 font-mono shrink-0">
                              {post.date.split("-")[2]}
                            </span>
                            <span className="text-white/70 group-hover:text-accent transition-colors">
                              {post.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-white/50">まだ記事がありません</p>
        </div>
      )}
    </div>
  );
}
