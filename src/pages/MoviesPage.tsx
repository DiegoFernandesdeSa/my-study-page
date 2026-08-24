import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiChevronRight, FiHeart, FiSearch } from "react-icons/fi";
import { getMovieSummary, searchMovies } from "../api";
import { MovieCard } from "../components/movies/MovieCard";
import { EmptyState, LoadingState } from "../components/ui/PageState";
import { useFavorites } from "../context/FavoritesContext";
import type { Movie } from "../types";

const ITEMS_PER_PAGE = 20;
export function MoviesPage() {
  const { t, i18n } = useTranslation();
  const { favorites } = useFavorites();
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [translatedFavorites, setTranslatedFavorites] = useState<Movie[]>([]);
  const search = query.trim();
  const totalPages = Math.max(1, Math.ceil(favorites.length / ITEMS_PER_PAGE));
  const visibleFavorites = useMemo(() => favorites.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE), [favorites, page]);

  useEffect(() => {
    if (!search) { setResults([]); setLoading(false); setError(""); return; }
    const controller = new AbortController();
    setLoading(true); setError("");
    const timer = window.setTimeout(() => searchMovies(search, i18n.resolvedLanguage || i18n.language, controller.signal).then(setResults).catch(cause => {
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setError(cause instanceof Error ? cause.message : t("movies.searchError"));
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); }), 450);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [search, t, i18n.resolvedLanguage, i18n.language]);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);
  useEffect(() => {
    let active = true;
    Promise.all(visibleFavorites.map(movie => getMovieSummary(movie.id, i18n.resolvedLanguage || i18n.language).catch(() => movie))).then(movies => { if (active) setTranslatedFavorites(movies); });
    return () => { active = false; };
  }, [visibleFavorites, i18n.resolvedLanguage, i18n.language]);

  const movies = search ? results : translatedFavorites;
  return <section className="page"><header className="page-heading movies-heading"><div><p className="eyebrow">{t(search ? "movies.results" : "movies.collection")}</p><h1>{t(search ? "movies.yourSearch" : "movies.favorites")}</h1><p>{search ? t("movies.searching", { query: search }) : t("movies.count", { count: favorites.length })}</p></div><label className="search"><FiSearch /><input value={query} onChange={event => setQuery(event.target.value)} placeholder={t("movies.placeholder")} aria-label={t("movies.placeholder")} /><span>{loading ? "…" : movies.length}</span></label></header>{loading && <LoadingState />}{error && <EmptyState title={t("movies.searchError")} text={error} />}{!loading && !error && movies.length > 0 && <div className="movie-grid">{movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}</div>}{!loading && !error && !search && favorites.length === 0 && <div className="empty favorites-empty"><FiHeart /><h2>{t("movies.emptyTitle")}</h2><p>{t("movies.emptyText")}</p></div>}{!loading && !error && search && results.length === 0 && <EmptyState title={t("movies.notFound")} text={t("movies.notFoundText", { query: search })} />}{!search && totalPages > 1 && <nav className="pagination" aria-label={t("movies.favorites")}><button onClick={() => setPage(current => current - 1)} disabled={page === 1} aria-label={t("movies.previous")}><FiChevronLeft /></button><span>{t("movies.page", { page, total: totalPages })}</span><button onClick={() => setPage(current => current + 1)} disabled={page === totalPages} aria-label={t("movies.next")}><FiChevronRight /></button></nav>}</section>;
}
