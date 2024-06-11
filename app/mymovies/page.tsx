"use client";
import { CardFilms } from "@/components/CardFilms";
import { ACCESS_TOKEN } from "@/config/key";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

type Movies = {
  original_title: string;
  id: any;
  poster_path: string;
  title?: string;
  backdrop_path?: string;
};

export default function MyMovies() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const image_path = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex justify-center items-center">
      <section
        className="w-full bg-img_bg_hero bg-no-repeat bg-center bg-cover bg-fixed p-10 h-[95.1vh]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!loading && (
          <Swiper
            spaceBetween={35}
            slidesPerView={4}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 3000 }}
            navigation={{
              nextEl: isHovered ? ".swiper-button-next" : null,
              prevEl: isHovered ? ".swiper-button-prev" : null,
            }}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Link href={`/mymovies/${movie.id}`} passHref>
                  <CardFilms
                    name={movie.original_title}
                    image={`${image_path}${movie.poster_path}`}
                    altImage={`${movie.title}_${movie.id}`}
                    backdropPath={`${image_path}${movie.backdrop_path}`}
                    id={movie.id}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="flex w-full justify-center items-center my-4">
          {loading ? (
            <div className="relative flex justify-center items-center">
              <div className="absolute animate-spin rounded-full h-[700px] w-[700px] border-t-8 border-b-8 border-purple-500"></div>
              <Image
                src={"/images/profile.png"}
                alt="Profile Picture"
                width={700}
                height={700}
                className="rounded-full p-1"
              />
            </div>
          ) : (
            <Image
              src={"/images/profile.png"}
              alt="Profile Picture"
              width={250}
              height={250}
              className="rounded-full p-1 border-purple-500 border-4"
            />
          )}
        </div>
      </section>
    </div>
  );
}
