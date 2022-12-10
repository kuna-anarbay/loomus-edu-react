import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import config from "../config";
import theme from "../config/theme";
import { AppDataProvider } from "../modules/common/providers/app-data-provider";
import { CourseDataProvider } from "../modules/course/provider/course.provider";
import { ConfigProvider } from "antd";
import { YMInitializer } from "react-yandex-metrika";
import ruRU from "antd/lib/locale/ru_RU";
import "../config/i18n";
import "../styles/globals.less";


export default function App({ Component, pageProps }: AppProps) {
    const { i18n } = useTranslation();
    const { locale, events } = useRouter();

    useEffect(() => {
        const changeLanguageIfNeeded = () => {
            if (i18n.language !== locale) {
                i18n.changeLanguage(locale).then(() => {
                });
            }
        }

        changeLanguageIfNeeded();
    }, []);

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (typeof window === "undefined") {
                return;
            }
            if (config.nodeEnv === "development") {
                return;
            }
            // @ts-ignore
            window!.gtag("config", config.googleAnalyticsKey, {
                page_path: url,
            })
        }
        events.on("routeChangeComplete", handleRouteChange)

        return () => {
            events.off("routeChangeComplete", handleRouteChange)
        }
    }, [events]);

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false
            }
        }
    });

    return (
        <>
            {config.nodeEnv === "production" && (
                <>
                    <YMInitializer
                        accounts={[config.yandexAnalyticsId]}
                        options={{
                            clickmap: true,
                            trackLinks: true,
                            accurateTrackBounce: true,
                            webvisor: true
                        }}
                        version="2"
                    />
                </>
            )}
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>
                    <ConfigProvider locale={ruRU}>
                        <AppDataProvider>
                            <CourseDataProvider>
                                <Component {...pageProps} />
                            </CourseDataProvider>
                        </AppDataProvider>
                    </ConfigProvider>
                </ChakraProvider>
            </QueryClientProvider>
        </>
    )
}

export function reportWebVitals(metric: any) {
    if (config.nodeEnv === "development") {
        console.log(metric)
    }
}