// src/config/siteConfig.js
// to use it:
// import { siteConfig } from '#config/siteConfig.js';

export const siteConfig = {
    // 1. Complete Title
    completeTitle: "Ray - Salt Flavored Light Official Website",

    footerTitle: "Ray - Official Website",

    // 2. Short Title
    shortTitle: "Ray",

    // 3. About Me Message
    aboutMessage: "I love Math, Computer Science and Arts. Devaloper of web projects. I am a devaloper who have mutiple goal. chasing the dream of being a devaloper who can benefit the world with Open Source Projects. Recent Message: I am turning 15 years old, and I am a Christian. I love to share my thoughts and ideas with the world. I am a software developer, and I love to create things that can help people. I am also a student, and I love to learn new things. I am a Christian, and I love to share my faith with others. I am a student, and I love to learn new things. I am a software developer, and I love to create things that can help people. I am also a student, and I love to learn new things. I am a Christian, and I love to share my faith with others.",
    // 4. About Me Message Short
    aboutMessageShort: "I love Math, Computer Science and Arts. Developer of web projects.",

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
                },
                {
                    href: "/about/faq",
                    name: "FAQ",
                },
                {
                    href: "/youtube",
                    name: "YouTube",
                }
            ]
        },
    ],

    // 8. Header Tree
    pageTree: [
        { title: "About Me", href: "/about/" },
        { title: "Projects", href: "/projects/" },
        { title: "Youtube", href: "/youtube/" },
    ],

    globalAnnouncement: {
        message: "I just published New Website! thank you for your support!",
        link: "/moving-from-old-website",
        updatedAt: Math.round(Date.now() / 60_000) * 60_000,
    },
};