import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

function determineSiteUrl(isDev, isPreview) {
    const devSite = 'http://localhost:2237/';
    const defaultSite = 'https://www.raystudio.net';

    // Use localhost during dev or preview
    if (isDev || isPreview) {
        return devSite;
    }

    // Check for a custom --domain flag passed via CLI
    const args = process.argv;
    const domainIndex = args.indexOf('--domain');
    const customDomain = domainIndex !== -1 && args[domainIndex + 1];

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