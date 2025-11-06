// src/utils/seoConfig.js

const seoConfig = {
    //  Default SEO (used if no specific match found)
    default: {
        title: "VeryCodedly",
        description: "Your friendly neighbourhood tech hub.",
        image: "/opengraph-image.png", 
        twitterCard: "summary_large_image",
    },

    //  Main Pages
    "/": {
        title: "VeryCodedly",
        description: "Your friendly neighbourhood tech hub.",
    },
    "/about": {
        title: "About VeryCodedly | Meet Your Smart Bestie in Tech",
        description:
            "VeryCodedly makes tech feel human — approachable insights on coding, AI, and software culture with a friendly, nerdy twist.",
    },
    "/blog": {
        title: "Blog | VeryCodedly",
        description: "Unfiltered takes on Tech, Code, Culture and everything in between.",
    },
    "/learn": {
        title: "Learn | VeryCodedly",
        description: "Beginner-friendly coding lessons that help complex ideas click, one concept at a time.",
    },
    "/shop": {
        title: "Shop | VeryCodedly Merch & Learning Tools",
        description:
            "Grab fun, nerdy merch and resources from VeryCodedly — where code meets culture and style.",
    },
    "/support": {
        title: "Support | Help Keep VeryCodedly Running",
        description:
            "Love what VeryCodedly does? Support us with donations, feedback, or spreading the word about smart tech made human.",
    },
    "/community": {
        title: "Community | Join the VeryCodedly Tech Fam",
        description:
            "Join a vibrant community of learners, devs, and creators who make coding and tech feel human, friendly, and fun.",
    },
    // "/help": {
    //     title: "Help Center | VeryCodedly Support Hub",
    //     description:
    //         "Need help? Find FAQs, guides, and support resources for everything VeryCodedly-related.",
    // },
    "/faqs": {
        title: "FAQs | VeryCodedly Questions Answered",
        description:
            "Got questions about VeryCodedly, our content, or collabs? We’ve got the answers right here.",
    },
    "/contact": {
        title: "Contact Us | Get in Touch with VeryCodedly",
        description:
            "Want to collaborate, chat, or say hi? Reach out to the VeryCodedly team — we’d love to hear from you.",
    },
    "/terms": {
        title: "Terms of Use | VeryCodedly",
        description:
            "Review the terms and conditions of VeryCodedly’s site and services.",
    },
    "/privacy": {
        title: "Privacy Policy | VeryCodedly",
        description:
            "Learn how VeryCodedly handles your data, protects your privacy, and keeps your browsing safe.",
    },

    // Blog Categories
    "/blog/trending-now": {
        title: "Trending Now | VeryCodedly",
        description:
            "What’s hot in tech right now — from viral developer debates to AI breakthroughs everyone’s talking about.",
    },
    "/blog/entertainment": {
        title: "Entertainment | VeryCodedly",
        description:
            "Tech meets culture — from movie tech moments to how coding sneaks into pop culture and storytelling.",
    },
    "/blog/reviews": {
        title: "Reviews | VeryCodedly",
        description:
            "Honest, thoughtful reviews of tools, gadgets, and software — from the perspective of your smart tech friend.",
    },
    "/blog/dev-digest": {
        title: "Dev Digest | VeryCodedly",
        description:
            "Your weekly download of what’s happening in the dev world — frameworks, tools, debates, and the occasional hot take.",
    },
    "/blog/data-defense": {
        title: "Data Defense | VeryCodedly",
        description:
            "Privacy, security, and digital safety — explained clearly and calmly for everyday users and pros alike.",
    },
    "/blog/key-players": {
        title: "Key Players | Fintech & Crypto | VeryCodedly",
        description:
            "Spotlight on the movers shaping fintech and crypto — Flutterwave, Paystack, and the financial tech chessboard in motion.",
    },
    "/blog/how-to-fixes": {
        title: "How-To Fixes | VeryCodedly",
        description:
            "Quick solutions and calm fixes for your coding headaches. Your laptop can stop smoking now.",
    },

    // Header Sections
    "/know": {
        title: "Know | VeryCodedly",
        description: "Stay in the know with the latest tech trends and insights, in video format",
    },
    "/connect": { 
        title: "Connect | Join the VeryCodedly Network",
        description: "Get the inside scoop in our community platforms.",
    },
};

export default seoConfig;
