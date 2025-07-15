// next-sitemap.config.js
export default {
  siteUrl: 'https://teamenvision.pk',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: './public',
  sitemapSize: 7000, // default is fine
  autoLastmod: true,
  // Manually define routes (for now)
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.7,
    };
  },
};
