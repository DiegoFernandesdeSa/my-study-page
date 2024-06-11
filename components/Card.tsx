import classNames from "classnames";
import Image from "next/image";

type Props = {
  altImage?: string;
  content?: string;
  name?: string;
  profession?: string;
  image?: string;
  backdropPath?: string;
};

const Card = ({
  altImage = "profile",
  content,
  name,
  profession,
  image = "/images/logo.png",
  backdropPath,
}: Props) => {
  return (
    <div className="flex flex-col justify-center items-center bg-black/85 border border-t-0 border-gray-400 rounded-3xl max-w-full">
      <div className="rounded-t-3xl h-5 border-t-gray-400 border gap-1 bg-gray-500 w-full flex">
        <div className="flex gap-1.5 mt-1 m-2">
          <div className="flex h-3 w-3 bg-red-500 rounded-full" />
          <div className="flex h-3 w-3 bg-yellow-400 rounded-full" />
          <div className="flex h-3 w-3 bg-green-500 rounded-full" />
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-end w-full rounded-b-2xl"
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
        <div className="flex items-start m-4">
          <Image
            className={classNames(
              "flex mt-4 h-1/2",
              altImage !== "profile" ? "rounded-lg" : "rounded-full"
            )}
            src={image}
            alt={altImage}
            width={300}
            height={300}
          />
          <div className="items-start pt-6 space-y-4 w-full px-4 text-gray-200">
            <div className="justify-center items-start text-lg font-semibold">
              {name}
            </div>
            <p className="text-xl text-center justify-center flex leading-relaxed">
              {content}
            </p>
            <div className="text-center">{profession}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
