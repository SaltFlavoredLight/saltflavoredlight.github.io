// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

function getSiteUrl() {
    const domain = process.env.SITE_DOMAIN || process.env.PUBLIC_SITE_URL;
    if (!domain) {
        return 'http://localhost:2237/';
    }
    return domain.startsWith('http') ? domain : `https://${domain}`;
}

export default defineConfig({
    server: {
        port: 2237,
    },
    site: getSiteUrl(),
    scopedStyleStrategy: 'class', 
    integrations: [
        mdx(),
        sitemap()
    ]
});