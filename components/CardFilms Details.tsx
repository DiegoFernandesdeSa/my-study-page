import { Credits, Genre, Images, Videos } from "@/app/mymovies/[id]/page";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ItemMenu } from "./ItemMenu";

type Props = {
  altImage?: string;
  content?: string;
  name?: string;
  image?: string;
  backdropPath?: string;
  genres?: Genre[];
  images?: Images | null;
  videos?: Videos | null;
  credits?: Credits | null;
};

export const CardFilmsDetails = ({
  altImage = "profile",
  content,
  name,
  image = "/images/logo.png",
  backdropPath,
  genres,
  images,
  videos,
  credits,
}: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const image_path = "https://image.tmdb.org/t/p/w500";

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {}, []);

  console.log(videos);

  return (
    <div className="flex flex-col w-full justify-center">
      <div className="flex w-full">
        <div
          className="flex flex-col items-center justify-end rounded-l-2xl w-2/4"
          style={
            backdropPath
              ? {
                  backgroundImage: `url(${backdropPath})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
        >
          <div className="flex flex-col items-center m-4 w-full justify-center">
            <div className="flex text-gray-200 p-2 justify-center items-center text-4xl font-semibold bg-black/50 rounded-2xl w-fit px-4">
              {name}
            </div>
            <Image
              className={classNames(
                "flex mt-4 h-1/2 duration-300 transform",
                altImage !== "profile" ? "rounded-lg" : "rounded-full"
              )}
              src={image}
              alt={`${altImage}_${image}`}
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center pt-6 space-y-4 w-full px-4 text-gray-200 bg-black/50 rounded-r-2xl">
          <div className="flex flex-col justify-center items-center text-lg font-semibold bg-black/50 rounded-xl w-fit p-4">
            <h1 className="flex justify-center items-center text-lg font-semibold bg-black/50 rounded-xl w-fit p-2 mb-2">
              Gênero
            </h1>
            <div className="flex gap-4">
              {genres?.map((genre, idx) => (
                <div
                  key={idx}
                  className="justify-center items-center text-lg font-semibold bg-black/50 rounded-xl w-fit px-2 flex"
                >
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center text-lg font-semibold bg-black/50 rounded-xl w-fit p-4">
            <div className="flex flex-col justify-center items-center text-lg font-semibold bg-black/50 rounded-xl w-fit p-4">
              <h1 className="flex justify-center items-center text-lg font-semibold bg-black/50 rounded-xl w-fit p-2 mb-2">
                Descrição
              </h1>
              <div className="flex">
                <p className="text-xl text-center justify-center flex leading-relaxed bg-black/50 rounded-xl w-fit px-2">
                  {content}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-col text-center justify-center items-center text-lg font-semibold bg-black/50 rounded-xl w-full p-4">
            <div className="flex flex-col justify-center items-center text-lg font-semibold bg-black/50 rounded-xl w-full p-4">
              <h1 className="flex justify-center items-center text-center text-lg font-semibold bg-black/50 rounded-xl w-fit p-2 mb-2">
                Elenco
              </h1>
              <div className="flex space-x-8 justify-center items-start w-full">
                {credits?.cast.slice(0, 6).map((credit, idx) => (
                  <div
                    className="flex flex-col justify-center items-center"
                    key={idx}
                  >
                    <Image
                      className={classNames(
                        "flex h-full max-w-26 rounded-lg cursor-pointer",
                        altImage !== "profile" ? "rounded-lg" : "rounded-full"
                      )}
                      src={`${image_path}${credit.profile_path}`}
                      alt={`${altImage}_${credit.profile_path}`}
                      width={150}
                      height={100}
                    />
                    <p className="max-h-[4rem] text-xl text-center justify-center flex leading-relaxed ounded-xl w-fit px-2 max-w-24 overflow-hidden overflow-ellipsis">
                      {credit.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-7xl w-full mt-4 justify-center items-center text-center">
        Videos
      </h1>
      <div className="w-full h-full grid grid-cols-3 gap-4 my-4">
        {videos &&
          videos.results.map((video, idx) => (
            <div className="w-full flex justify-center mt-4" key={idx}>
              <iframe
                id="player"
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${video.key}`}
                className="rounded-lg"
              />
            </div>
          ))}
      </div>
      <h1 className="text-7xl w-full mt-4 justify-center items-center text-center">
        Imagens
      </h1>
      <div className="w-full h-full grid grid-cols-3 gap-4 my-4">
        {images?.backdrops.map((imageBackdrop, idx) => (
          <div key={idx} className="flex w-full justify-center items-center">
            <Image
              className={classNames(
                "flex h-full w-full rounded-lg cursor-pointer",
                altImage !== "profile" ? "rounded-lg" : "rounded-full"
              )}
              src={`${image_path}${imageBackdrop.file_path}`}
              alt={`${altImage}_${imageBackdrop.file_path}`}
              width={300}
              height={300}
              onClick={() =>
                openModal(`${image_path}${imageBackdrop.file_path}` ?? "")
              }
            />
          </div>
        ))}
      </div>
      {modalIsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative bg-white rounded-lg p-8 max-h-[600px]">
            <div className="w-2 h-2">
              <ItemMenu
                icon="/images/close.png"
                onClick={closeModal}
                classes="absolute top-0 right-0 m-2 text-gray-800 hover:text-gray-700 w-5 h-5 cursor-pointer"
              />
            </div>
            {selectedImage && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer"
              >
                <Image
                  src={selectedImage}
                  alt={`${altImage}_${selectedImage}`}
                  width={800}
                  height={800}
                  className="rounded-lg mb-2"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
