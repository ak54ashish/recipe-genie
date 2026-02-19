import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import en from "@/i18n/en.json";
import hi from "@/i18n/hi.json";

type Lang = "en" | "hi";
type Translations = typeof en;

const translations: Record<Lang, Translations> = { en, hi };

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return (localStorage.getItem("recipe-finder-lang") as Lang) || "en";
    } catch {
      return "en";
    }
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("recipe-finder-lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};
