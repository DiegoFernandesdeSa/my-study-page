import { FiSend } from "react-icons/fi";
import { useTranslation } from "react-i18next";
type Props = { text: string; sending: boolean; onChange: (value: string) => void; onSend: () => void };
export function ChatComposer({ text, sending, onChange, onSend }: Props) { const { t } = useTranslation(); return <form className="composer" onSubmit={event => { event.preventDefault(); onSend(); }}><textarea value={text} onChange={event => onChange(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); onSend(); } }} placeholder={t("agent.placeholder")} rows={1} maxLength={4000} /><button type="submit" disabled={!text.trim() || sending} aria-label={t("agent.send")}><FiSend /></button></form>; }
