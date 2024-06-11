import classNames from "classnames";
import Image from "next/image";
import { MouseEventHandler } from "react";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  name?: JSX.Element | string;
  icon: string;
  classes?: string;
};

export const ItemMenu = ({ onClick, name, icon, classes }: Props) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "flex items-center gap-1 text-gray-700 font-bold",
        classes
      )}
    >
      <Image src={icon} width={30} height={30} alt={icon} />
      <span className="p-2">{name}</span>
    </button>
  );
};
