const config = {
    baseUrl: process.env.BASE_URL!,
    mediaBaseUrl: process.env.MEDIA_BASE_URL!,
    nodeEnv: process.env.NODE_ENV!,
    googleAnalyticsKey: process.env.GOOGLE_ANALYTICS_KEY!,
    version: process.env.VERSION!,
    yandexAnalyticsId: parseInt(process.env.YANDEX_ANALYTICS_ID!)
}

export default config;