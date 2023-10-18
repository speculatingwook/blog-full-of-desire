var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// data/siteMetadata.js
var require_siteMetadata = __commonJS({
  "data/siteMetadata.js"(exports, module) {
    var siteMetadata2 = {
      title: "\uC695\uB9DD\uC774 \uAC00\uB4DD\uD55C \uBE14\uB85C\uADF8",
      author: "speculatingwook",
      headerTitle: "\uC695\uB9DD\uC774 \uAC00\uB4DD\uD55C \uBE14\uB85C\uADF8",
      description: "\uC2DC\uC57C\uAC00 \uB113\uC5B4\uC9C0\uACE0 \uAE4A\uC5B4\uC9C8\uC218\uB85D \uD589\uBCF5\uD55C \uAC1C\uBC1C\uC790",
      language: "\uD55C\uAD6D\uC5B4",
      theme: "system",
      siteUrl: "https://blog-full-of-desire.vercel.app/",
      siteRepo: "https://blog-full-of-desire.vercel.app/",
      siteLogo: "/static/images/rose.png",
      image: "/static/images/speculatingwook.png",
      socialBanner: "/static/images/rose.png",
      email: "bwook9908@gmail.com",
      github: "https://github.com/speculatingwook",
      twitter: "https://twitter.com/Twitter",
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
      linkedin: "https://www.linkedin.com",
      locale: "en-US",
      analytics: {
        // If you want to use an analytics provider you have to add it to the
        // content security policy in the `next.config.js` file.
        // supports plausible, simpleAnalytics, umami or googleAnalytics
        plausibleDataDomain: "",
        // e.g. tailwind-nextjs-starter-blog.vercel.app
        simpleAnalytics: false,
        // true or false
        umamiWebsiteId: "",
        // e.g. 123e4567-e89b-12d3-a456-426614174000
        googleAnalyticsId: "",
        // e.g. UA-000000-2 or G-XXXXXXX
        posthogAnalyticsId: ""
        // posthog.init e.g. phc_5yXvArzvRdqtZIsHkEm3Fkkhm3d0bEYUXCaFISzqPSQ
      },
      newsletter: {
        // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
        // Please add your .env file and modify it according to your selection
        provider: "buttondown"
      },
      comment: {
        // If you want to use a commenting system other than giscus you have to add it to the
        // content security policy in the `next.config.js` file.
        // Select a provider and use the environment variables associated to it
        // https://vercel.com/docs/environment-variables
        provider: "giscus",
        // supported providers: giscus, utterances, disqus
        giscusConfig: {
          // Visit the link below, and follow the steps in the 'configuration' section
          // https://giscus.app/
          repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
          repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
          category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
          categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
          mapping: "pathname",
          // supported options: pathname, url, title
          reactions: "1",
          // Emoji reactions: 1 = enable / 0 = disable
          // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
          metadata: "0",
          // theme example: light, dark, dark_dimmed, dark_high_contrast
          // transparent_dark, preferred_color_scheme, custom
          theme: "light",
          // Place the comment box above the comments. options: bottom, top
          inputPosition: "bottom",
          // Choose the language giscus will be displayed in. options: en, es, zh-CN, zh-TW, ko, ja etc
          lang: "en",
          // theme when dark mode
          darkTheme: "transparent_dark",
          // If the theme option above is set to 'custom`
          // please provide a link below to your custom theme css file.
          // example: https://giscus.app/themes/custom_example.css
          themeURL: ""
        },
        utterancesConfig: {
          // Visit the link below, and follow the steps in the 'configuration' section
          // https://utteranc.es/
          repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
          issueTerm: "",
          // supported options: pathname, url, title
          label: "",
          // label (optional): Comment 💬
          // theme example: github-light, github-dark, preferred-color-scheme
          // github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light
          theme: "",
          // theme when dark mode
          darkTheme: ""
        },
        disqusConfig: {
          // https://help.disqus.com/en/articles/1717111-what-s-a-shortname
          shortname: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME
        }
      }
    };
    module.exports = siteMetadata2;
    module.exports = siteMetadata2;
  }
});

// contentlayer.config.ts
var import_siteMetadata = __toESM(require_siteMetadata());
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { writeFileSync } from "fs";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import path from "path";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings
} from "pliny/mdx-plugins/index.js";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";
var root = process.cwd();
var isProduction = process.env.NODE_ENV === "production";
var computedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
  },
  path: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath
  },
  toc: { type: "string", resolve: (doc) => extractTocHeadings(doc.body.raw) }
};
function createTagCount(allBlogs) {
  const tagCount = {};
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });
  writeFileSync("./app/tag-data.json", JSON.stringify(tagCount));
}
function createSearchIndex(allBlogs) {
  if (import_siteMetadata.default?.search?.provider === "kbar" && import_siteMetadata.default.search.kbarConfig.searchDocumentsPath) {
    writeFileSync(
      `public/${import_siteMetadata.default.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    );
    console.log("Local search index generated...");
  }
}
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    lastmod: { type: "date" },
    draft: { type: "boolean" },
    summary: { type: "string" },
    images: { type: "json" },
    authors: { type: "list", of: { type: "string" } },
    layout: { type: "string" },
    bibliography: { type: "string" },
    canonicalUrl: { type: "string" }
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : import_siteMetadata.default.socialBanner,
        url: `${import_siteMetadata.default.siteUrl}/${doc._raw.flattenedPath}`
      })
    }
  }
}));
var Authors = defineDocumentType(() => ({
  name: "Authors",
  filePathPattern: "authors/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string" },
    occupation: { type: "string" },
    company: { type: "string" },
    email: { type: "string" },
    twitter: { type: "string" },
    linkedin: { type: "string" },
    github: { type: "string" },
    layout: { type: "string" }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "data",
  documentTypes: [Blog, Authors],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, "data") }],
      [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
      rehypePresetMinify
    ]
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData();
    createTagCount(allBlogs);
    createSearchIndex(allBlogs);
  }
});
export {
  Authors,
  Blog,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-GSDNU4J2.mjs.map
