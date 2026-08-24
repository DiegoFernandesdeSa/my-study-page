import { useEffect, useState } from "react";
import { FiArrowLeft, FiStar, FiUsers } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { getMovie, IMAGE } from "../api";
import { EmptyState, LoadingState } from "../components/ui/PageState";
import type { Cast, Movie, Video } from "../types";
import { useTranslation } from "react-i18next";

type MovieDetails = { movie: Movie; cast: Cast[]; videos: Video[]; images: { file_path: string }[] };

export function MovieDetailsPage() {
  const { t, i18n } = useTranslation();
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<MovieDetails | null>(null);
  const [error, setError] = useState("");

  useEffect(() => { setData(null); setError(""); getMovie(id, i18n.resolvedLanguage || i18n.language).then(setData).catch(cause => setError(cause instanceof Error ? cause.message : "Filme não encontrado")); }, [id, i18n.resolvedLanguage, i18n.language]);
  if (error) return <section className="page"><EmptyState title={t("details.loadError")} text={error} /></section>;
  if (!data) return <section className="page"><LoadingState /></section>;

  const { movie, cast, videos, images } = data;
  return <article className="detail"><div className="backdrop" style={{ backgroundImage: `linear-gradient(90deg,rgba(8,10,15,.98) 0%,rgba(8,10,15,.62) 58%,rgba(8,10,15,.85)),url(${IMAGE}original${movie.backdrop_path})` }}><button className="back" onClick={() => navigate(-1)}><FiArrowLeft /> {t("details.back")}</button><div className="detail-copy"><p className="eyebrow">{movie.release_date?.slice(0, 4)} {movie.vote_average ? <><FiStar /> {movie.vote_average.toFixed(1)}</> : null}</p><h1>{movie.title}</h1><div className="genres">{movie.genres?.map(genre => <span key={genre.id}>{genre.name}</span>)}</div><p>{movie.overview || t("details.noOverview")}</p></div></div><section className="detail-section"><h2><FiUsers /> {t("details.cast")}</h2><div className="cast-row">{cast.filter(person => person.profile_path).slice(0, 8).map(person => <div className="cast" key={person.id}><img src={`${IMAGE}w185${person.profile_path}`} alt={person.name} loading="lazy" /><strong>{person.name}</strong><span>{person.character}</span></div>)}</div></section>{videos.length > 0 && <section className="detail-section"><h2>{t("details.trailers")}</h2><div className="video-grid">{videos.filter(video => video.site === "YouTube").slice(0, 3).map(video => <iframe key={video.id} src={`https://www.youtube.com/embed/${video.key}`} title={video.name} allowFullScreen />)}</div></section>}{images.length > 0 && <section className="detail-section"><h2>{t("details.gallery")}</h2><div className="gallery">{images.slice(0, 6).map((image, index) => <img key={image.file_path} src={`${IMAGE}w780${image.file_path}`} alt={t("details.scene", { number: index + 1, title: movie.title })} loading="lazy" />)}</div></section>}</article>;
}
