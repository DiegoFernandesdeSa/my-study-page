"use client";

import { CardFilmsDetails } from "@/components/CardFilms Details";
import { useEffect, useState } from "react";

export type Genre = {
  id: number;
  name: string;
};

export type Images = {
  id: number;
  backdrops: {
    file_path: string;
  }[];
  logos: {
    file_path: string;
  }[];
  posters: {
    file_path: string;
  }[];
};

export type Results = {
  id: number;
  key: string;
  name: string;
};

export type Cast = {
  id: number;
  character: string;
  name: string;
  profile_path: string;
};

export type Videos = {
  id: number;
  results: Results[];
};

export type Credits = {
  id: number;
  cast: Cast[];
};

type Movie = {
  original_title: string;
  id: any;
  poster_path: string;
  title?: string;
  backdrop_path?: string;
  overview: string;
  genres?: Genre[];
};

const image_path = "https://image.tmdb.org/t/p/w500";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGI2MDcwMzg5MTc0ZDEyY2QzN2Q5M2I1ZjRjYjkwNyIsInN1YiI6IjY1NTZkNDJiYjU0MDAyMTRkMDZlYTYxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kTQ5Oytfk8czYRTNXU6CvsLZrJj5OcoNqkQeocv4H8E",
  },
};

const useFetchMovieDetails = (id: string) => {
  const [data, setData] = useState<{
    movie: Movie | null;
    images: Images | null;
    videos: Videos | null;
    credits: Credits | null;
    loading: boolean;
    error: boolean;
  }>({
    movie: null,
    images: null,
    videos: null,
    credits: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchMovieDetailsAndImages = async () => {
      try {
        const [movieResponse, imagesResponse, videosResponse, creditsResponse] =
          await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
              options
            ),
            fetch(`https://api.themoviedb.org/3/movie/${id}/images`, options),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
              options
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
              options
            ),
          ]);

        const movieData = await movieResponse.json();
        const imagesData = await imagesResponse.json();
        const videosData = await videosResponse.json();
        const creditsData = await creditsResponse.json();

        setData({
          movie: movieData,
          images: imagesData,
          videos: videosData,
          credits: creditsData,
          loading: false,
          error: false,
        });
      } catch (err) {
        console.error(err);
        setData((prev) => ({ ...prev, loading: false, error: true }));
      }
    };

    fetchMovieDetailsAndImages();
  }, [id]);

  return data;
};

export default function Details({ params }: { params: { id: string } }) {
  const { id } = params;
  const { movie, images, videos, credits, loading, error } =
    useFetchMovieDetails(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error ? "Error fetching movie details." : "Movie not found."}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <section className="w-full bg-img_bg_hero bg-no-repeat bg-center bg-cover bg-fixed p-7">
        <div className="flex w-full justify-center items-center">
          <CardFilmsDetails
            name={movie.original_title}
            image={`${image_path}${movie.poster_path}`}
            altImage={`${movie.title}_${movie.id}`}
            backdropPath={`${image_path}${movie.backdrop_path}`}
            content={movie.overview}
            genres={movie.genres}
            images={images}
            videos={videos}
            credits={credits}
          />
        </div>
      </section>
    </div>
  );
}
