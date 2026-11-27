
import { getCollection } from "astro:content";

// Automatically discover website pages.
const pageModules = import.meta.glob(
  "/src/pages/**/*.{astro,md,mdx}",
  {
    eager: true,
    query: "?raw",
    import: "default",
  }
);

// Routes to exclude.
const EXCLUDED_ROUTES = [
  "/404",
  "/500",
  "/hidden",
  "/sitemap",
];

function normalizePath(path) {
  path = path
    .replace(/^\/src\/pages/, "")
    .replace(/\.(astro|md|mdx)$/, "")
    .replace(/\/index$/, "");

  return path
    ? `/${path.replace(/^\/|\/$/g, "")}/`
    : "/";
}

function formatTitle(value) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

function extractTitle(source, path) {
  const frontmatter = source.match(
    /^---\s*\n([\s\S]*?)\n---/
  )?.[1] || "";

  const frontmatterTitle = frontmatter.match(
    /^title\s*:\s*(["'])(.*?)\1\s*$|^title\s*:\s*(.+?)\s*$/m
  );

  const title =
    frontmatterTitle?.[2]?.trim() ||
    frontmatterTitle?.[3]?.trim() ||
    source.match(
      /<(?:PageLayout|BaseLayout)\b[\s\S]*?\btitle\s*=\s*(["'])(.*?)\1/
    )?.[2]?.trim() ||
    source.match(
      /export\s+const\s+metadata\s*=\s*\{[\s\S]*?\btitle\s*:\s*(["'])(.*?)\1/
    )?.[2]?.trim() ||
    source.match(/<title[^>]*>(.*?)<\/title>/is)?.[1] ||
    source.match(/^#\s+(.+)$/m)?.[1];

  return title?.replace(/["']/g, "").trim() ||
    (path === "/" ? "Home Page" :
      formatTitle(path.split("/").filter(Boolean).pop() || ""));
}

function isExcluded(path, excludedRoutes) {
  return excludedRoutes.some(route => {
    const normalized = route.replace(/\/+$/, "");

    return path === `${normalized}/` ||
      path.startsWith(`${normalized}/`);
  });
}

async function collectCollections(collections = []) {
  const results = [];

  for (const collection of collections) {
    try {
      const entries = await getCollection(collection);

      for (const entry of entries) {
        if (entry.data.draft === true) continue;

        const slug = entry.data.slug || entry.id;

        results.push({
          title: entry.data.title || formatTitle(slug),
          path: `/${collection}/${slug}/`,
          type: "collection",
          collection,
          id: entry.id,
          children: {},
        });
      }
    } catch (error) {
      console.warn(`Sitemap: ${collection} could not be loaded.`, error);
    }
  }

  return results;
}

function buildTree(entries) {
  const root = {
    title: "Home Page",
    path: "/",
    type: "page",
    children: {},
  };

  for (const entry of entries) {
    if (entry.path === "/") {
      Object.assign(root, entry, {
        children: root.children,
      });
      continue;
    }

    const segments = entry.path.split("/").filter(Boolean);

    let current = root;
    let currentPath = "";

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      if (!current.children[segment]) {
        current.children[segment] = {
          title: formatTitle(segment),
          path: `${currentPath}/`,
          type: "directory",
          children: {},
        };
      }

      current = current.children[segment];

      if (index === segments.length - 1) {
        const children = current.children;

        Object.assign(current, entry, { children });
      }
    });
  }

  return root;
}

// Main reusable function.
export async function generateSitemap({
  includeCollections = false,
  collections = [],
  excludedRoutes = EXCLUDED_ROUTES,
} = {}) {

  // Collect normal pages.
  const pages = Object.entries(pageModules)
    .map(([file, source]) => {
      const path = normalizePath(file);

      return {
        title: extractTitle(source, path),
        path,
        type: "page",
      };
    })
    .filter(page => !isExcluded(page.path, excludedRoutes));

  // Optionally collect CMS entries.
  const cmsEntries = includeCollections
    ? await collectCollections(collections)
    : [];

  // Apply exclusions to CMS entries too.
  const filteredCMS = cmsEntries.filter(entry =>
    !isExcluded(entry.path, excludedRoutes)
  );

  // Merge and remove duplicate URLs.
  const entries = [
    ...new Map(
      [...pages, ...filteredCMS].map(entry => [
        entry.path,
        entry,
      ])
    ).values(),
  ];

  entries.sort((a, b) => a.path.localeCompare(b.path));

  return buildTree(entries);
}

// Add this new function to your existing lib/sitemap.js
export async function getFlatSiteEntries({
  excludedRoutes = EXCLUDED_ROUTES,
} = {}) {
  const pageModules = import.meta.glob(
    "/src/pages/**/*.{astro,md,mdx,html}",
    { eager: true, query: "?raw", import: "default" }
  );

  const pages = Object.entries(pageModules)
    .map(([file, source]) => {
      const path = normalizePath(file);
      const title = extractTitle(source, path);

      return {
        title,
        path,
        type: "page",
        description: `Explore content for ${title}`,
      };
    })
    .filter((page) => !isExcluded(page.path, excludedRoutes));

  pages.sort((a, b) => a.path.localeCompare(b.path));
  return pages;
}