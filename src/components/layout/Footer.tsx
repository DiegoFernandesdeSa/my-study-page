import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTranslation } from "react-i18next";
export function Footer() { const { t } = useTranslation(); return <footer><span>{t("footer.made")}</span><div><a href="https://github.com/" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href="https://www.linkedin.com/in/diego-fernandes-de-sa/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a></div></footer>; }
