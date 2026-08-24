import type { Cast, Movie, Video } from "./types";
const API = "https://api.themoviedb.org/3";
export const IMAGE = "https://image.tmdb.org/t/p/";
const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN as string | undefined;
async function request<T>(path: string): Promise<T> {
  if (!token) throw new Error("Configure VITE_TMDB_ACCESS_TOKEN no arquivo .env e reinicie o servidor.");
  const response = await fetch(`${API}${path}`, {
    headers: { accept: "application/json", Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const detail = (await response.json().catch(() => null)) as { status_message?: string } | null;
    throw new Error(detail?.status_message || `A TMDB respondeu com status ${response.status}`);
  }
  return response.json() as Promise<T>;
}
const tmdbLocale = (language: string) => ({ pt: "pt-BR", en: "en-US", es: "es-ES" })[language.split("-")[0]] || "pt-BR";
export const getPopularMovies = async (language = "pt") => (await request<{ results: Movie[] }>(`/movie/popular?language=${tmdbLocale(language)}&page=1`)).results;
export const getMovieSummary = async (id: number, language = "pt") => request<Movie>(`/movie/${id}?language=${tmdbLocale(language)}`);
export const searchMovies = async (query: string, language = "pt", signal?: AbortSignal) => {
  if (!token) throw new Error("Configure VITE_TMDB_ACCESS_TOKEN no arquivo .env e reinicie o servidor.");
  const params = new URLSearchParams({ query, language: tmdbLocale(language), page: "1", include_adult: "false" });
  const response = await fetch(`${API}/search/movie?${params}`, {
    headers: { accept: "application/json", Authorization: `Bearer ${token}` },
    signal,
  });
  if (!response.ok) throw new Error(`Não foi possível pesquisar na TMDB (${response.status})`);
  return ((await response.json()) as { results: Movie[] }).results;
};
export const getMovie = async (id: string, language = "pt") => { const locale = tmdbLocale(language); const [movie, credits, videos, images] = await Promise.all([request<Movie>(`/movie/${id}?language=${locale}`), request<{ cast: Cast[] }>(`/movie/${id}/credits?language=${locale}`), request<{ results: Video[] }>(`/movie/${id}/videos?language=${locale}`), request<{ backdrops: { file_path: string }[] }>(`/movie/${id}/images`)]); return { movie, cast: credits.cast, videos: videos.results, images: images.backdrops }; };
