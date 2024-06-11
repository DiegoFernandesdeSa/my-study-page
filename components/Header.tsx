"use client";
import { ItemMenu } from "./ItemMenu";
import { Search } from "./Search";

type Props = {
  handleClick?: () => void;
};

export const Header = ({ handleClick }: Props) => {
  return (
    <header className="flex items-center w-full h-12">
      <div className="flex w-full max-w-[1246px] mx-auto">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-12">
            <ul className="flex items-center gap-12">
              <li>
                <ItemMenu
                  icon="/images/home-smile-fill.png"
                  name="Home"
                  onClick={() => (window.location.href = "/")}
                />
              </li>
              <li>
                <ItemMenu
                  icon="/images/id-card-fill.png"
                  name="Sobre"
                  onClick={() => (window.location.href = "/about")}
                />
              </li>
              <li>
                <ItemMenu
                  icon="/images/id-card-fill.png"
                  name="Meus Filmes Preferidos"
                  onClick={() => (window.location.href = "/mymovies")}
                />
              </li>
              <li>
                <ItemMenu
                  icon="/images/linkedin-box-fill.png"
                  name="Linkedin"
                  onClick={() =>
                    (window.location.href =
                      "https://www.linkedin.com/in/diego-fernandes-de-sa/")
                  }
                />
              </li>
            </ul>
          </div>
          <Search />
        </div>
      </div>
    </header>
  );
};
