import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./locales/ru.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            ru: {
                translation: ru
            },
            kk: {
                translation: ru
            }
        },
        lng: "ru",
        interpolation: {
            escapeValue: false
        }
    }).then(() => {
});

export default i18n;