import { FiArrowRight, FiCode } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export function HomePage() {
  const { t } = useTranslation();
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          {t("home.eyebrow")} <span>👋</span>
        </p>
        <h1>
          {t("home.titleStart")} <em>{t("home.titleEmphasis")}</em>
        </h1>
        <p className="lead">
          {t("home.lead")}
        </p>
        <div className="actions">
          <Link to="/about" className="button primary">
            {t("home.story")} <FiArrowRight />
          </Link>
          <Link to="/mymovies" className="button ghost">
            {t("home.inspiration")}
          </Link>
        </div>
        <div className="availability">
          <i /> {t("home.available")}
        </div>
      </div>
      <div className="portrait">
        <div className="portrait-frame">
          <img src="/images/eu.jpg" alt="Diego Fernandes" />
          <span className="floating-tag top">
            <FiCode /> {t("home.apis")}
          </span>
          <span className="floating-tag bottom">{t("home.experience", { defaultValue: "+5 anos criando" })}</span>
        </div>
      </div>
    </section>
  );
}
