# Portfólio Diego Fernandes

Portfólio pessoal construído com React, TypeScript e Vite. Inclui apresentação, trajetória e catálogo de filmes via TMDB.

## Como rodar

```bash
npm install
cp .env.example .env
npm run dev
```

Adicione ao `.env` um token de leitura da [TMDB](https://www.themoviedb.org/settings/api) para os filmes. O agente aceita Gemini (`AI_PROVIDER=gemini` e `GEMINI_API_KEY`) ou OpenAI (`AI_PROVIDER=openai` e `OPENAI_API_KEY`). As chaves ficam apenas no servidor e não devem ser commitadas.

## Scripts

- `npm run dev` — servidor local
- `npm run build` — checagem TypeScript e build de produção
- `npm start` — servidor de produção após o build
- `npm run preview` — visualização do build
