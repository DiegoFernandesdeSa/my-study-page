import { FiFilm } from "react-icons/fi";
import { useTranslation } from "react-i18next";
export function LoadingState() { const { t } = useTranslation(); return <div className="loading"><span /><span /><span /><p>{t("state.loading")}</p></div>; }
export function EmptyState({ title, text }: { title: string; text: string }) { return <div className="empty"><FiFilm /><h2>{title}</h2><p>{text}</p></div>; }
