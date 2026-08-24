import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";
import pt from "./locales/pt/translation.json";

const savedLanguage = localStorage.getItem("diego-language");
i18n.use(initReactI18next).init({
  resources: { pt: { translation: pt }, en: { translation: en }, es: { translation: es } },
  lng: savedLanguage || "pt",
  fallbackLng: "pt",
  interpolation: { escapeValue: false },
});

export default i18n;
