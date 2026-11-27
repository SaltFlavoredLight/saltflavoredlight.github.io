// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import path from 'path';

function getSiteUrl() {
    const domain = process.env.SITE_DOMAIN || process.env.PUBLIC_SITE_URL;
    if (!domain) {
        return 'http://localhost:2237/';
    }
    const url = domain.startsWith('http') ? domain : `https://${domain}`;
    return url.endsWith('/') ? url : `${url}/`;
}

export default defineConfig({
    server: {
        port: 2237,
    },
    site: getSiteUrl(),
    scopedStyleStrategy: 'class', 
    integrations: [
        mdx(),
        sitemap({
            filter: (page) => {
                const pathname = new URL(page).pathname;
                
                // Add paths you want to exclude from the sitemap
                const excludedPaths = ['/hidden', '/old-website', '/drafts'];
                if (excludedPaths.some(p => pathname.startsWith(p))) {
                    return false;
                }

                return true;
            }
        })
    ],
    vite: {
        resolve: {
            alias: {
                '#src': path.resolve('./src'),
                '#components': path.resolve('./src/components'),
                '#assets': path.resolve('./src/assets'),
                '#layouts': path.resolve('./src/layouts'),
                '#public': path.resolve('./public'),
                "#config": path.resolve('./src/config/'),
                "#lib": path.resolve('./src/lib/')
            }
        }
    }
});