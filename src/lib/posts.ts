import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

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
        title: matterResult.data.title || "",
        tags: matterResult.data.tags || [],
        excerpt: matterResult.data.excerpt || extractExcerpt(matterResult.content),
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
    title: matterResult.data.title || "",
    tags: matterResult.data.tags || [],
    excerpt: matterResult.data.excerpt || extractExcerpt(matterResult.content),
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

  // MarkdownをHTMLに変換
  const processedContent = await remark()
    .use(html)
    .process(post.content);
  
  let contentHtml = processedContent.toString();
  
  // コードブロックにシンタックスハイライトを追加（言語指定がある場合）
  contentHtml = contentHtml.replace(
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    (match, lang, code) => {
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      return `<pre class="hljs"><code class="language-${lang}">${escapedCode}</code></pre>`;
    }
  );
  
  // 言語指定がないコードブロック
  contentHtml = contentHtml.replace(
    /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
    (match, code) => {
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      return `<pre class="hljs"><code>${escapedCode}</code></pre>`;
    }
  );

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
