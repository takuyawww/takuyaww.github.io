import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import ArchiveTree from "./components/ArchiveTree";
import PostList from "./components/PostList";

// 投稿を年月でグループ化
function groupPostsByYearMonth(posts: ReturnType<typeof getAllPosts>) {
  const grouped: Record<
    string,
    Record<string, { title: string; date: string }[]>
  > = {};

  posts.forEach((post) => {
    const [year, month] = post.date.split("-");
    if (!grouped[year]) {
      grouped[year] = {};
    }
    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }
    grouped[year][month].push({ title: post.title, date: post.date });
  });

  return grouped;
}

export default function Home() {
  const posts = getAllPosts();
  const groupedPosts = groupPostsByYearMonth(posts);

  return (
    <div className="py-8 sm:py-10">
      <div className="flex gap-10">
        {/* メインコンテンツ */}
        <div className="flex-1">
          <Suspense
            fallback={<div className="text-white/50">読み込み中...</div>}
          >
            <PostList posts={posts} postsPerPage={10} />
          </Suspense>
        </div>

        {/* 右サイドバー - 年月ツリー */}
        <ArchiveTree groupedPosts={groupedPosts} />
      </div>
    </div>
  );
}
