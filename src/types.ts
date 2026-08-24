export type Genre = { id: number; name: string };
export type Cast = { id: number; character: string; name: string; profile_path: string | null };
export type Video = { id: string; key: string; name: string; site?: string; type?: string };
export type Movie = { id: number; title: string; original_title: string; overview: string; poster_path: string | null; backdrop_path: string | null; release_date?: string; vote_average?: number; genres?: Genre[] };
export type ChatMessage = { role: "user" | "assistant"; content: string };
