import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Helper function to determine the site URL using environment variables
 * @param {boolean} isDev 
 * @param {boolean} isPreview 
 * @returns {string}
 */
function determineSiteUrl(isDev, isPreview) {
    const devSite = 'http://localhost:2237/';
    const defaultSite = 'https://www.raystudio.net';

    // Use localhost during dev or preview
    if (isDev || isPreview) {
        return devSite;
    }

    // Read from environment variable (bulletproof across local & CI/CD)
    const customDomain = process.env.SITE_DOMAIN;

    if (customDomain) {
        return customDomain.startsWith('http') ? customDomain : `https://${customDomain}`;
    }

    return defaultSite;
}

export default defineConfig(({ command }) => {
    const isDev = command === 'dev';
    const isPreview = process.argv.includes('preview');

    return {
        server: {
            port: 2237,
        },
        site: determineSiteUrl(isDev, isPreview),
        integrations: [
            mdx(),
            sitemap()
        ]
    };
});