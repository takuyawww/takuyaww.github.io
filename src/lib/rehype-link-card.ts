import type { Root, Element, Text } from "hast";
import { fetchOgpData, OgpData } from "./ogp";

const URL_REGEX = /^https?:\/\/[^\s]+$/;

export function rehypeLinkCard() {
  return async function transformer(tree: Root): Promise<void> {
    const replacements: { index: number; url: string }[] = [];

    // パラグラフ内に単独のリンクがあるものを探す
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];

      if (node.type !== "element" || (node as Element).tagName !== "p")
        continue;

      const paragraph = node as Element;

      // パラグラフ内に1つの要素のみがある場合をチェック
      if (paragraph.children.length !== 1) continue;

      const child = paragraph.children[0];

      // リンク要素かチェック
      if (child.type !== "element" || (child as Element).tagName !== "a")
        continue;

      const link = child as Element;
      const href = link.properties?.href as string | undefined;

      if (!href || !URL_REGEX.test(href)) continue;

      // リンクテキストがURLと同じかチェック（自動リンクの特徴）
      if (link.children.length === 1 && link.children[0].type === "text") {
        const textContent = (link.children[0] as Text).value;
        if (textContent === href) {
          replacements.push({ index: i, url: href });
        }
      }
    }

    if (replacements.length === 0) return;

    // OGP情報を並列で取得
    const ogpResults = await Promise.all(
      replacements.map((r) => fetchOgpData(r.url)),
    );

    // 後ろから置換（インデックスがずれないように）
    for (let i = replacements.length - 1; i >= 0; i--) {
      const { index, url } = replacements[i];
      const ogpData = ogpResults[i];

      const cardElement = generateLinkCardElement(url, ogpData);
      tree.children[index] = cardElement;
    }
  };
}

function generateLinkCardElement(
  url: string,
  ogpData: OgpData | null,
): Element {
  const title = ogpData?.title || new URL(url).hostname;
  const description = ogpData?.description || "";
  const image = ogpData?.image;
  const hostname = new URL(url).hostname;

  const children: Element[] = [];

  // 画像部分
  if (image) {
    children.push({
      type: "element",
      tagName: "div",
      properties: { className: ["link-card-image"] },
      children: [
        {
          type: "element",
          tagName: "img",
          properties: { src: image, alt: "", loading: "lazy" },
          children: [],
        },
      ],
    });
  } else {
    // 画像がない場合のプレースホルダー
    children.push({
      type: "element",
      tagName: "div",
      properties: { className: ["link-card-image", "link-card-image-placeholder"] },
      children: [
        {
          type: "element",
          tagName: "svg",
          properties: {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "1.5",
          },
          children: [
            {
              type: "element",
              tagName: "path",
              properties: {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
              },
              children: [],
            },
          ],
        },
      ],
    });
  }

  // コンテンツ部分
  const contentChildren: Element[] = [
    {
      type: "element",
      tagName: "div",
      properties: { className: ["link-card-title"] },
      children: [{ type: "text", value: title }],
    },
  ];

  if (description) {
    contentChildren.push({
      type: "element",
      tagName: "div",
      properties: { className: ["link-card-description"] },
      children: [{ type: "text", value: description }],
    });
  }

  contentChildren.push({
    type: "element",
    tagName: "div",
    properties: { className: ["link-card-url"] },
    children: [{ type: "text", value: hostname }],
  });

  children.push({
    type: "element",
    tagName: "div",
    properties: { className: ["link-card-content"] },
    children: contentChildren,
  });

  return {
    type: "element",
    tagName: "a",
    properties: {
      href: url,
      className: ["link-card"],
      target: "_blank",
      rel: "noopener noreferrer",
    },
    children,
  };
}
