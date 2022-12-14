type Language = "EN" | "RU" | "KK";

export const languageName = (lang: string | Language | undefined): string => {
    switch (lang) {
        case "EN":
        case "en":
            return "๐บ๐ธ English";
        case "RU":
        case "ru":
            return "๐ท๐บ ะ ัััะบะธะน";
        case "KK":
        case "kk":
            return "๐ฐ๐ฟ าะฐะทะฐาัะฐ";
        default:
            return "๐ท๐บ ะ ัััะบะธะน"
    }
}

export const languageFlag = (lang: string | Language | undefined): string => {
    switch (lang) {
        case "EN":
        case "en":
            return "๐บ๐ธ";
        case "RU":
        case "ru":
            return "๐ท๐บ";
        case "KK":
        case "kk":
            return "๐ฐ๐ฟ";
        default:
            return "๐ฐ๐ฟ"
    }
}

export default Language;
