import i18n from "i18next"; 
import { initReactI18next } from "react-i18next";

// Import your language files
import en from "../src/data/languages/en.json";
import it from "../src/data/languages/it.json";

import aboutEn from "../src/data/innerpages/about_en.json";
import aboutIt from "../src/data/innerpages/about_it.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { 
                translation: en,
                about: aboutEn,  // Added aboutEn under the 'en' key
            },
            it: { 
                translation: it,
                about: aboutIt,  // Added aboutIt under the 'it' key
            },
        },
        lng: "it", // 🔸 Set default language to Italian
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
