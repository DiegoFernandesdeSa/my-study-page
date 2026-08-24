import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [{ code: "pt", flag: "🇧🇷" }, { code: "en", flag: "🇺🇸" }, { code: "es", flag: "🇪🇸" }];
export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = languages.find(language => language.code === i18n.language.split("-")[0]) || languages[0];
  useEffect(() => { const close = (event: MouseEvent) => { if (!ref.current?.contains(event.target as Node)) setOpen(false); }; document.addEventListener("mousedown", close); return () => document.removeEventListener("mousedown", close); }, []);
  const select = async (code: string) => { await i18n.changeLanguage(code); localStorage.setItem("diego-language", code); document.documentElement.lang = code === "pt" ? "pt-BR" : code; setOpen(false); };
  return <div className="language-selector" ref={ref}><button className="language-current" onClick={() => setOpen(value => !value)} aria-label={t("language.label")} aria-expanded={open}><span>{current.flag}</span></button>{open && <div className="language-menu">{languages.map(language => <button key={language.code} className={language.code === current.code ? "selected" : ""} onClick={() => void select(language.code)}><span>{language.flag}</span>{t(`language.${language.code}`)}</button>)}</div>}</div>;
}
