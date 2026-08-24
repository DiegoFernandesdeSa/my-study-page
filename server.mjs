import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import path from "node:path";

const app = express();
const port = Number(process.env.PORT) || 5173;
const root = path.dirname(fileURLToPath(import.meta.url));
const httpServer = createServer(app);

app.use(express.json({ limit: "32kb" }));
app.post("/api/chat", async (request, response) => {
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  if (provider === "gemini" && !process.env.GEMINI_API_KEY) return response.status(503).json({ error: "Configure GEMINI_API_KEY no arquivo .env e reinicie o servidor." });
  if (provider === "openai" && !process.env.OPENAI_API_KEY) return response.status(503).json({ error: "Configure OPENAI_API_KEY no arquivo .env e reinicie o servidor." });
  if (!["gemini", "openai"].includes(provider)) return response.status(500).json({ error: "AI_PROVIDER deve ser gemini ou openai." });
  const messages = Array.isArray(request.body?.messages) ? request.body.messages.slice(-12) : [];
  const input = messages
    .filter((item) => item && ["user", "assistant"].includes(item.role) && typeof item.content === "string")
    .map((item) => ({ role: item.role, content: item.content.slice(0, 4000) }));
  if (!input.length || input.at(-1)?.role !== "user") return response.status(400).json({ error: "Envie uma mensagem válida." });
  try {
    const instructions = "Você é o agente virtual do portfólio de Diego Fernandes. Responda sempre em português do Brasil, com clareza, cordialidade e objetividade. Ajude com dúvidas sobre tecnologia, programação, carreira e o conteúdo do portfólio. Se não souber algo pessoal sobre Diego, diga isso claramente e não invente.";
    if (provider === "gemini") {
      const gemini = new OpenAI({
        apiKey: process.env.GEMINI_API_KEY,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
      });
      const result = await gemini.chat.completions.create({
        model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
        messages: [{ role: "system", content: instructions }, ...input],
        max_tokens: 700,
      });
      return response.json({ message: result.choices[0]?.message?.content || "Não recebi conteúdo do Gemini." });
    }
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await openai.responses.create({ model: process.env.OPENAI_MODEL || "gpt-4.1-mini", instructions, input, max_output_tokens: 700 });
    return response.json({ message: result.output_text });
  } catch (error) {
    console.error(`${provider === "gemini" ? "Gemini" : "OpenAI"} request failed:`, {
      status: error?.status,
      code: error?.code,
      type: error?.type,
      requestId: error?.request_id,
    });
    const status = Number.isInteger(error?.status) ? error.status : 500;
    const code = error?.code || error?.error?.code;
    let message = "Não foi possível falar com o agente agora.";
    const providerName = provider === "gemini" ? "Gemini" : "OpenAI";
    if (status === 401 || status === 403) message = `A chave do ${providerName} não é válida ou não possui acesso ao modelo.`;
    if (status === 429 && code === "insufficient_quota") message = `A conta do ${providerName} está sem cota disponível.`;
    if (status === 429 && code !== "insufficient_quota") message = `O limite gratuito do ${providerName} foi atingido. Aguarde a renovação da cota e tente novamente.`;
    return response.status(status).json({ error: message, code });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(root, "dist")));
  app.get("*", (_request, response) => response.sendFile(path.join(root, "dist", "index.html")));
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true, hmr: { server: httpServer } },
    appType: "spa",
  });
  app.use(vite.middlewares);
}
httpServer.listen(port, () => console.log(`Portfolio disponível em http://localhost:${port}`));
