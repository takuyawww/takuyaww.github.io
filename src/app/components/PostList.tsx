"use client";

import Link from "next/link";
import { useState } from "react";

interface Post {
  title: string;
  date: string;
  excerpt?: string;
}

interface PostListProps {
  posts: Post[];
  postsPerPage?: number;
}

function getPostUrl(date: string): string {
  const [year, month, day] = date.split("-");
  return `/${year}/${month}/${day}`;
}

export default function PostList({ posts, postsPerPage = 10 }: PostListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div>
      <div className="space-y-10">
        {currentPosts.map((post) => (
          <article key={post.date} className="group">
            <Link href={getPostUrl(post.date)}>
              <h2 className="text-xl font-semibold text-white mb-1 hover:text-accent transition-colors duration-200">
                {post.title}
              </h2>
            </Link>
            <time className="text-xs text-white/50 block mb-2 font-mono">
              {new Date(post.date).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <p className="text-sm text-white/60 leading-relaxed">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm text-white/60 hover:text-white disabled:text-white/20 disabled:cursor-not-allowed transition-colors"
          >
            ← Prev
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 text-sm rounded transition-colors ${
                  currentPage === page
                    ? "bg-accent text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm text-white/60 hover:text-white disabled:text-white/20 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </nav>
      )}

      {posts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-white/50">まだ記事がありません</p>
        </div>
      )}
    </div>
  );
}
