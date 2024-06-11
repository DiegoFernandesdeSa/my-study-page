// components/CardFilms.js

import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

type Props = {
  altImage?: string;
  content?: string;
  name?: string;
  profession?: string;
  image?: string;
  backdropPath?: string;
  id: any;
};

export const CardFilms = ({
  altImage = "profile",
  content,
  name,
  profession,
  image = "/images/logo.png",
  backdropPath,
  id,
}: Props) => {
  return (
    <Link href={`/mymovies/${id}`}>
      <div
        className="flex flex-col items-center justify-end w-full rounded-2xl"
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
        <div className="items-center m-4">
          <Image
            className={classNames(
              "mt-4 h-1/2 absolut block duration-300 transform hover:scale-110 hover:rounded-lg",
              altImage !== "profile" ? "rounded-lg" : "rounded-full"
            )}
            src={image}
            alt={altImage}
            width={300}
            height={300}
          />
          <div className="flex items-center justify-center text-center pt-6 space-y-4 w-full px-4 text-gray-200">
            <div className="justify-center items-center text-lg font-semibold bg-black rounded-xl w-fit px-2">
              {name}
            </div>
            <p className="text-xl text-center justify-center flex leading-relaxed">
              {content}
            </p>
            <div className="text-center">{profession}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
