import { FiFilm, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IMAGE } from "../../api";
import type { Movie } from "../../types";
import { useFavorites } from "../../context/FavoritesContext";
import { useTranslation } from "react-i18next";
export function MovieCard({ movie }: { movie: Movie }) { const { t } = useTranslation(); const { isFavorite, toggleFavorite } = useFavorites(); const favorite = isFavorite(movie.id); const title = movie.title || movie.original_title; return <Link to={`/mymovies/${movie.id}`} className="movie-card"><button className={favorite ? "favorite-button selected" : "favorite-button"} onClick={event => { event.preventDefault(); toggleFavorite(movie); }} aria-label={t(favorite ? "movies.remove" : "movies.add", { title })} title={t(favorite ? "movies.remove" : "movies.add", { title })}><FiHeart /></button>{movie.poster_path ? <img src={`${IMAGE}w500${movie.poster_path}`} alt={title} loading="lazy" /> : <div className="poster-placeholder"><FiFilm /></div>}<div><span>{movie.release_date?.slice(0, 4) || t("movies.yearFallback")}{movie.vote_average ? ` · ★ ${movie.vote_average.toFixed(1)}` : ""}</span><h2>{title}</h2></div></Link>; }
