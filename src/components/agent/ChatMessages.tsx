import { forwardRef } from "react";
import type { ChatMessage } from "../../types";
import { useTranslation } from "react-i18next";

type Props = { messages: ChatMessage[]; sending: boolean };
export const ChatMessages = forwardRef<HTMLDivElement, Props>(({ messages, sending }, ref) => { const { t } = useTranslation(); return <div className="messages" ref={ref} aria-live="polite">{messages.map((message, index) => <div className={`message ${message.role}`} key={`${message.role}-${index}`}><span>{message.role === "assistant" ? "DF" : t("agent.you")}</span><p>{message.content}</p></div>)}{sending && <div className="message assistant"><span>DF</span><p className="typing"><i /><i /><i /></p></div>}</div>; });
ChatMessages.displayName = "ChatMessages";
