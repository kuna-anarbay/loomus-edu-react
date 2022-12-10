type Language = "EN" | "RU" | "KK";

export const languageName = (lang: string | Language | undefined): string => {
    switch (lang) {
        case "EN":
        case "en":
            return "🇺🇸 English";
        case "RU":
        case "ru":
            return "🇷🇺 Русский";
        case "KK":
        case "kk":
            return "🇰🇿 Қазақша";
        default:
            return "🇷🇺 Русский"
    }
}

export const languageFlag = (lang: string | Language | undefined): string => {
    switch (lang) {
        case "EN":
        case "en":
            return "🇺🇸";
        case "RU":
        case "ru":
            return "🇷🇺";
        case "KK":
        case "kk":
            return "🇰🇿";
        default:
            return "🇰🇿"
    }
}

export default Language;
