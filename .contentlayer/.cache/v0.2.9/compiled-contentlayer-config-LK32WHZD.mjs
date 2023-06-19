// contentlayer.config.ts
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";

// src/configs/i18nConfigs.ts
var LOCALES = ["en", "zh-TW"];
var DEFAULT_LOCALE = "zh-TW";

// src/lib/contentLayerAdapter.js
import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from "contentlayer/source-files";
import { compareDesc } from "date-fns";
var allPostsNewToOld = (void 0)?.sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date));
}) || [];

// src/plugins/imageMetadata.ts
import imageSize from "image-size";
import path from "path";
import { getPlaiceholder } from "plaiceholder";
import { visit } from "unist-util-visit";
import { promisify } from "util";
var sizeOf = promisify(imageSize);
function isImageNode(node) {
  const img = node;
  return img.type === "element" && img.tagName === "img" && img.properties && typeof img.properties.src === "string";
}
function filterImageNode(node) {
  return node.properties.src.startsWith("/");
}
async function addMetadata(node) {
  const res = await sizeOf(
    path.join(process.cwd(), "public", node.properties.src)
  );
  if (!res)
    throw Error(`Invalid image with src "${node.properties.src}"`);
  const { base64 } = await getPlaiceholder(node.properties.src, { size: 10 });
  node.properties.width = res.width;
  node.properties.height = res.height;
  node.properties.base64 = base64;
}
function imageMetadata() {
  return async function transformer(tree) {
    const imgNodes = [];
    visit(tree, "element", (node) => {
      if (isImageNode(node) && filterImageNode(node)) {
        imgNodes.push(node);
      }
    });
    for (const node of imgNodes) {
      await addMetadata(node);
    }
    return tree;
  };
}

// contentlayer.config.ts
var Post2 = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `content/posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    slug: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    pricing: {
      type: "string",
      required: true
    },
    start_price: {
      type: "string",
      required: true
    },
    socialImage: {
      type: "string"
    },
    language: {
      type: "enum",
      options: LOCALES,
      default: DEFAULT_LOCALE
    },
    redirectFrom: {
      type: "list",
      of: { type: "string" }
    }
  },
  computedFields: {
    path: {
      type: "string",
      resolve: (post) => `/posts/${post.slug}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post2],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      [rehypePrism, { ignoreMissing: true }],
      imageMetadata
    ]
  }
});
export {
  Post2 as Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-LK32WHZD.mjs.map
