// src/config/siteConfig.js
// to use it:
// import { siteConfig } from '../../config/siteConfig.js';

export const siteConfig = {
    // 1. Complete Title
    completeTitle: "Ray - Salt Flavored Light Official Website",

    footerTitle: "Ray - Official Website",

    // 2. Short Title
    shortTitle: "Ray",

    // 3. About Me Message

    // 4. About Me Message Short
    aboutMessageShort: "I love Math, Computer Science and Arts. Devaloper of web projects.",

    // 5. Social Links
    socialLinks: [
        {
            name: "YouTube",
            href: "https://www.youtube.com/@SaltFlavoredLight"
        },
        {
            name: "Github",
            href: "https://www.github.com/SaltFlavoredLight"
        }
    ],

    // 6. Motto
    motto: "Love the Lord your God with all your heart, and with all your soul, and with all your mind.",

    // 7. Footer Sitemap
    footerMap: [
        {
            name: "About me",
            lists: [
                {
                    href: "/about/",
                    name: "Who Am I?",
                }
            ]
        },
    ],

    // 8. Header Tree
    pageTree: [
        { title: "About Me", href: "/about/" },
    ]

    
};