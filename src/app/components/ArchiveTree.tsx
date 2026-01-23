"use client";

import Link from "next/link";
import { useState } from "react";

interface Post {
  title: string;
  date: string;
}

interface GroupedPosts {
  [year: string]: {
    [month: string]: Post[];
  };
}

interface ArchiveTreeProps {
  groupedPosts: GroupedPosts;
}

function getPostUrl(date: string): string {
  const [year, month, day] = date.split("-");
  return `/${year}/${month}/${day}`;
}

export default function ArchiveTree({ groupedPosts }: ArchiveTreeProps) {
  const years = Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a));
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  const toggleMonth = (key: string) => {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-24">
        <nav className="text-sm font-mono">
          {years.map((year) => (
            <div key={year} className="mb-3">
              <div className="text-white/60 mb-1">{year}</div>
              <div className="ml-3 border-l border-white/20 pl-3 space-y-1">
                {Object.keys(groupedPosts[year])
                  .sort((a, b) => b.localeCompare(a))
                  .map((month) => {
                    const key = `${year}-${month}`;
                    const posts = groupedPosts[year][month];
                    const isExpanded = expandedMonths.has(key);

                    return (
                      <div key={month}>
                        <button
                          onClick={() => toggleMonth(key)}
                          className="flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors w-full text-left"
                        >
                          <span
                            className={`text-xs transition-transform duration-200 ${
                              isExpanded ? "rotate-90" : ""
                            }`}
                          >
                            ▶
                          </span>
                          <span>{month}月</span>
                          <span className="text-white/30">({posts.length})</span>
                        </button>

                        {isExpanded && (
                          <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-2">
                            {posts.map((post) => (
                              <Link
                                key={post.date}
                                href={getPostUrl(post.date)}
                                className="block text-xs text-white/40 hover:text-white truncate transition-colors"
                                title={post.title}
                              >
                                {post.date.split("-")[2]}日 - {post.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
