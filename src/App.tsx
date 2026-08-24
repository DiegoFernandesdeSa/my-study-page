import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { AboutPage } from "./pages/AboutPage";
import { AgentPage } from "./pages/AgentPage";
import { HomePage } from "./pages/HomePage";
import { MovieDetailsPage } from "./pages/MovieDetailsPage";
import { MoviesPage } from "./pages/MoviesPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return <><Header /><main><Routes><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/mymovies" element={<MoviesPage />} /><Route path="/mymovies/:id" element={<MovieDetailsPage />} /><Route path="/agent" element={<AgentPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></main><Footer /></>;
}
