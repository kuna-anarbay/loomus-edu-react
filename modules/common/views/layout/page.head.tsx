import config from "../../../../config";
import Head from "next/head";

interface PageHeadProps {
    title?: string;
    description?: string | null;
    image?: string | null;
}

export default function PageHead(props: PageHeadProps) {
    const title = props.title ?? "Loomus Academy | Учись у лучших";
    const description = props.description ?? "Учись онлайн у лучших учителей-экспертов по их эффективным авторским методикам на профессиональной платформе Loomus";
    const image = props.image ?? "https://loomus.io/loomus-short.png";

    return (
        <Head>
            <meta charSet="UTF-8"/>
            <meta name="keywords"
                  content="loomus,образование,курсы,скачать,репетитор,языки,спорт,школа"/>
            <meta name="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"/>
            <meta name="theme-color" content="#fff"/>

            {/* Website info */}
            <title>{title}</title>
            <meta name="title" content={title}/>
            <meta name="description" content={description}/>

            {/* Favicon set */}
            <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="manifest" href="/manifest.json"/>

            {/* Open graph */}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://loomus.io"/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={image}/>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsKey}`}/>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag("js", new Date());
                        gtag("config", "${config.googleAnalyticsKey}", {
                          page_path: window.location.pathname,
                        });
                    `,
                }}
            />
        </Head>
    )
}