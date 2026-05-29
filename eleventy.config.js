import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);

  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.png": "favicon.png" });
  eleventyConfig.addPassthroughCopy({ "_redirects": "_redirects" });

  // Watch targets
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  // ─── Collections ───────────────────────────────────────────────────────────

  // Toutes les ressources (non-draft)
  eleventyConfig.addCollection("ressources", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/ressources/*.md")
      .filter((item) => !item.data.draft)
      .sort((a, b) => (a.data.title || "").localeCompare(b.data.title || "", "fr"));
  });

  // Ressources par catégorie
  const categories = ["streaming", "download", "outils", "privacy", "gaming", "ia"];
  for (const cat of categories) {
    eleventyConfig.addCollection(`ressources_${cat}`, (collectionApi) => {
      return collectionApi
        .getFilteredByGlob("src/content/ressources/*.md")
        .filter((item) => !item.data.draft && item.data.categorie === cat)
        .sort((a, b) => (a.data.title || "").localeCompare(b.data.title || "", "fr"));
    });
  }

  // Ressources starred (indispensables)
  eleventyConfig.addCollection("ressourcesStarred", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/ressources/*.md")
      .filter((item) => !item.data.draft && item.data.starred === true)
      .sort((a, b) => (a.data.title || "").localeCompare(b.data.title || "", "fr"));
  });

  // Ressources featured
  eleventyConfig.addCollection("ressourcesFeatured", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/ressources/*.md")
      .filter((item) => !item.data.draft && item.data.featured === true);
  });

  // Tous les guides
  eleventyConfig.addCollection("guides", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/guides/*.md")
      .filter((item) => !item.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  // 3 derniers guides pour la home
  eleventyConfig.addCollection("guidesFeatured", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/guides/*.md")
      .filter((item) => !item.data.draft)
      .sort((a, b) => b.date - a.date)
      .slice(0, 3);
  });

  // ─── Filters ───────────────────────────────────────────────────────────────

  eleventyConfig.addFilter("dateFormat", (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
  });

  eleventyConfig.addFilter("niveauLabel", (niveau) => {
    const map = { debutant: "👶 débutant", avance: "🧠 avancé", expert: "⚡ expert" };
    return map[niveau] || niveau;
  });

  eleventyConfig.addFilter("niveauClass", (niveau) => {
    const map = { debutant: "niveau-debutant", avance: "niveau-avance", expert: "niveau-expert" };
    return map[niveau] || "";
  });

  eleventyConfig.addFilter("categorieLabel", (cat) => {
    const map = {
      streaming: "📺 Streaming",
      download: "⬇️ Download",
      outils: "🔧 Outils",
      privacy: "🔒 Privacy",
      gaming: "🎮 Gaming",
    };
    return map[cat] || cat;
  });

  eleventyConfig.addFilter("slugify", (str) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  });

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  eleventyConfig.addFilter("where", (arr, key, val) => arr.filter((item) => item.data[key] === val));

  eleventyConfig.addFilter("jsonStringify", (obj) => JSON.stringify(obj));

  // ─── Shortcodes ────────────────────────────────────────────────────────────

  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  eleventyConfig.addShortcode("updateDate", () => {
    const d = new Date();
    return d.toLocaleDateString("fr-FR", { month: "2-digit", year: "numeric" }).replace("/", "/");
  });

  // ─── Markdown config ────────────────────────────────────────────────────────

  // TOC : on laisse Eleventy gérer via le markdown natif
  // Les ancres sont générées automatiquement par les headings

  // ─── Config ────────────────────────────────────────────────────────────────

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    njkOptions: {},
  };
}
