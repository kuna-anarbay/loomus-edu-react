module.exports = {
    i18n: {
        defaultLocale: "ru",
        locales: ["ru", "kk", "en"]
    },
    reloadOnPrerender: process.env.NEXT_PUBLIC_NODE_ENV === "dev"
};