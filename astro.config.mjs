// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Helper function to resolve the site URL cleanly from environment variables
 * @returns {string}
 */
function getSiteUrl() {
    const domain = process.env.SITE_DOMAIN;
    if (!domain) {
        return 'http://localhost:2237/'; // Safe fallback
    }
    return domain.startsWith('http') ? domain : `https://${domain}`;
}

export default defineConfig({
    server: {
        port: 2237,
    },
    site: getSiteUrl(),
    integrations: [
        mdx(),
        sitemap()
    ]
});