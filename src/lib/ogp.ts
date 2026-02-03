export interface OgpData {
  title: string;
  description: string;
  image: string | null;
  siteName: string | null;
  url: string;
}

export async function fetchOgpData(url: string): Promise<OgpData | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "bot",
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch OGP data for ${url}: ${response.status}`);
      return null;
    }

    const html = await response.text();
    return parseOgpFromHtml(html, url);
  } catch (error) {
    console.warn(`Error fetching OGP data for ${url}:`, error);
    return null;
  }
}

function parseOgpFromHtml(html: string, url: string): OgpData {
  const getMetaContent = (property: string): string | null => {
    // og:XXX や twitter:XXX を検索
    const ogRegex = new RegExp(
      `<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']`,
      "i"
    );
    const ogMatch = html.match(ogRegex);
    if (ogMatch) return ogMatch[1];

    // content が先に来るパターン
    const reverseRegex = new RegExp(
      `<meta[^>]*content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["']`,
      "i"
    );
    const reverseMatch = html.match(reverseRegex);
    if (reverseMatch) return reverseMatch[1];

    return null;
  };

  const getTitle = (): string => {
    // og:title を優先
    const ogTitle = getMetaContent("og:title");
    if (ogTitle) return ogTitle;

    // title タグにフォールバック
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (titleMatch) return titleMatch[1].trim();

    return new URL(url).hostname;
  };

  const getDescription = (): string => {
    return (
      getMetaContent("og:description") ||
      getMetaContent("description") ||
      ""
    );
  };

  const getImage = (): string | null => {
    const image = getMetaContent("og:image") || getMetaContent("twitter:image");
    if (!image) return null;

    // 相対URLを絶対URLに変換
    if (image.startsWith("//")) {
      return `https:${image}`;
    }
    if (image.startsWith("/")) {
      const urlObj = new URL(url);
      return `${urlObj.origin}${image}`;
    }
    return image;
  };

  return {
    title: decodeHtmlEntities(getTitle()),
    description: decodeHtmlEntities(getDescription()),
    image: getImage(),
    siteName: getMetaContent("og:site_name"),
    url,
  };
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/");
}
