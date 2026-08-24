import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export function NotFoundPage() { const { t } = useTranslation(); return <section className="not-found"><strong>404</strong><h1>{t("notFound.title")}</h1><Link className="button primary" to="/">{t("notFound.back")}</Link></section>; }
