import { useEffect, useRef, useState } from "react";
import { AgentSidebar } from "../components/agent/AgentSidebar";
import { ChatComposer } from "../components/agent/ChatComposer";
import { ChatMessages } from "../components/agent/ChatMessages";
import type { ChatMessage } from "../types";

const STORAGE = { messages: "diego-agent-messages", draft: "diego-agent-draft" };
const welcome: ChatMessage = { role: "assistant", content: "Olá! Sou o agente virtual do portfólio do Diego. Podemos conversar sobre tecnologia, programação, carreira ou sobre este projeto. Como posso ajudar?" };
const suggestions = ["Como posso começar na programação?", "Explique APIs de um jeito simples", "Quais tecnologias devo estudar?"];

function loadMessages(): ChatMessage[] {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE.messages) || "null") as unknown;
    if (Array.isArray(saved) && saved.every(item => item && typeof item.content === "string" && ["user", "assistant"].includes(item.role))) return saved as ChatMessage[];
  } catch { /* começa uma conversa limpa */ }
  return [welcome];
}

export function AgentPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [text, setText] = useState(() => sessionStorage.getItem(STORAGE.draft) || "");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);

  useEffect(() => { sessionStorage.setItem(STORAGE.messages, JSON.stringify(messages)); }, [messages]);
  useEffect(() => { sessionStorage.setItem(STORAGE.draft, text); }, [text]);
  useEffect(() => { const box = messagesRef.current; if (box) box.scrollTo({ top: box.scrollHeight, behavior: "smooth" }); }, [messages, sending]);

  async function send(suggestion?: string) {
    const content = (suggestion ?? text).trim();
    if (!content || sendingRef.current) return;
    sendingRef.current = true;
    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(next); setText(""); setError(""); setSending(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ messages: next }) });
      const body = await response.text();
      let data: { message?: string; error?: string } = {};
      if (body) { try { data = JSON.parse(body) as typeof data; } catch { throw new Error(`O servidor respondeu em um formato inválido (HTTP ${response.status}). Reinicie com npm run dev.`); } }
      if (!response.ok || !data.message) throw new Error(data.error || "Não foi possível receber uma resposta.");
      setMessages(current => [...current, { role: "assistant", content: data.message! }]);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "O agente está indisponível."); }
    finally { sendingRef.current = false; setSending(false); }
  }

  return <section className="page agent-page"><header className="page-heading"><p className="eyebrow">Inteligência artificial</p><h1>Converse com <em>um agente.</em></h1><p>Tire dúvidas, explore ideias e converse sobre tecnologia em tempo real.</p></header><div className="chat-shell"><AgentSidebar /><div className="chat-panel"><ChatMessages ref={messagesRef} messages={messages} sending={sending} />{messages.length === 1 && <div className="suggestions">{suggestions.map(item => <button type="button" key={item} onClick={() => void send(item)}>{item}</button>)}</div>}{error && <p className="chat-error">{error}</p>}<ChatComposer text={text} sending={sending} onChange={setText} onSend={() => void send()} /></div></div></section>;
}
