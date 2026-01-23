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
    <div className="py-6 sm:py-10 max-w-3xl mx-auto px-2 sm:px-0">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">アーカイブ</h1>

      <div className="space-y-5 sm:space-y-8">
        {years.map((year) => (
          <section key={year}>
            <h2 className="text-base sm:text-lg font-semibold text-white/80 mb-3 sm:mb-4 font-mono">
              {year}
            </h2>
            <div className="space-y-4 sm:space-y-6 ml-2 sm:ml-4 border-l border-white/20 pl-3 sm:pl-6">
              {Object.keys(groupedPosts[year])
                .sort((a, b) => b.localeCompare(a))
                .map((month) => (
                  <div key={month}>
                    <h3 className="text-sm font-medium text-white/60 mb-2 sm:mb-3 font-mono">
                      {month}月
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      {groupedPosts[year][month].map((post) => (
                        <Link
                          key={post.date}
                          href={getPostUrl(post.date)}
                          className="group flex items-baseline gap-2 sm:gap-3"
                        >
                          <span className="text-xs text-sky-400/50 font-mono shrink-0">
                            {post.date.split("-")[2]}
                          </span>
                          <span className="text-sky-300/70 group-hover:text-sky-300 transition-colors text-sm sm:text-base">
                            {post.title}
                          </span>
                        </Link>
                      ))}
                    </div>
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
