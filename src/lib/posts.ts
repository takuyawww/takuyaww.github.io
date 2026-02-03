import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";
import { rehypeLinkCard } from "./rehype-link-card";

const postsDirectory = path.join(process.cwd(), "content/posts");

// シンプルなフロントマターパーサー
function parseFrontMatter(content: string): { data: Record<string, string | string[]>; content: string } {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const frontMatter = match[1];
  const body = match[2];
  const data: Record<string, string | string[]> = {};

  // YAML風のパース（シンプル版）
  frontMatter.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // クォートを削除
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // 配列のパース
      if (value.startsWith("[") && value.endsWith("]")) {
        const items = value.slice(1, -1).split(",").map((item) => {
          const trimmed = item.trim();
          return trimmed.replace(/^["']|["']$/g, "");
        });
        data[key] = items;
      } else {
        data[key] = value;
      }
    }
  });

  return { data, content: body };
}

export interface Post {
  title: string;
  date: string;
  tags: string[];
  excerpt?: string;
  content: string;
  contentHtml?: string;
}

export function getAllPosts(): Post[] {
  // content/posts ディレクトリ内のすべてのMarkdownファイルを取得
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // ファイル名から日付を取得（YYYY-MM-DD.md）
      const date = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // フロントマターをパース
      const matterResult = parseFrontMatter(fileContents);

      return {
        date,
        title: (matterResult.data.title as string) || "",
        tags: (matterResult.data.tags as string[]) || [],
        excerpt: (matterResult.data.excerpt as string) || extractExcerpt(matterResult.content),
        content: matterResult.content,
      };
    });

  // 日付でソート（新しい順）
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostByDate(year: string, month: string, day: string): Post | null {
  // パラメータを YYYY-MM-DD 形式に変換
  const date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  const fullPath = path.join(postsDirectory, `${date}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = parseFrontMatter(fileContents);

  return {
    date,
    title: (matterResult.data.title as string) || "",
    tags: (matterResult.data.tags as string[]) || [],
    excerpt: (matterResult.data.excerpt as string) || extractExcerpt(matterResult.content),
    content: matterResult.content,
  };
}

export async function getPostWithHtml(
  year: string,
  month: string,
  day: string
): Promise<Post | null> {
  const post = getPostByDate(year, month, day);
  if (!post) {
    return null;
  }

  // MarkdownをHTMLに変換（シンタックスハイライト付き）
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeLinkCard)
    .use(rehypeHighlight)
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
      content: {
        type: "element",
        tagName: "svg",
        properties: {
          xmlns: "http://www.w3.org/2000/svg",
          width: "12",
          height: "12",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          style: "display: inline-block; margin-left: 4px; vertical-align: middle;",
        },
        children: [
          {
            type: "element",
            tagName: "path",
            properties: { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" },
            children: [],
          },
          {
            type: "element",
            tagName: "polyline",
            properties: { points: "15 3 21 3 21 9" },
            children: [],
          },
          {
            type: "element",
            tagName: "line",
            properties: { x1: "10", y1: "14", x2: "21", y2: "3" },
            children: [],
          },
        ],
      },
    })
    .use(rehypeStringify)
    .process(post.content);

  const contentHtml = processedContent.toString();

  return {
    ...post,
    contentHtml,
  };
}


// コンテンツから最初の段落を抜き出してexcerptとして使用
function extractExcerpt(content: string, maxLength: number = 150): string {
  // 最初の段落を取得
  const firstParagraph = content.split("\n\n")[0] || content;
  // 改行を削除
  const text = firstParagraph.replace(/\n/g, " ").trim();
  // 最大長で切り詰め
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}
