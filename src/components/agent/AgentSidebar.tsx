import { FiMessageCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";
export function AgentSidebar() { const { t } = useTranslation(); return <aside className="agent-info"><span className="agent-avatar"><FiMessageCircle /></span><div><strong>{t("agent.name")}</strong><span><i /> {t("agent.online")}</span></div><p>{t("agent.description")}</p><small>{t("agent.warning")}</small></aside>; }
