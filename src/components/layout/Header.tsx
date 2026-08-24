import { useState } from "react";
import { FiCpu, FiFilm, FiHome, FiLinkedin, FiMenu, FiUser, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";

export function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const navigation = [{ to: "/", label: t("nav.home"), icon: <FiHome /> }, { to: "/about", label: t("nav.about"), icon: <FiUser /> }, { to: "/mymovies", label: t("nav.movies"), icon: <FiFilm /> }, { to: "/agent", label: t("nav.agent"), icon: <FiCpu /> }];
  return <header className="header"><NavLink to="/" className="brand" onClick={closeMenu}><span>DF</span><div>Diego Fernandes<small>Software developer</small></div></NavLink><button className="menu-button" onClick={() => setOpen(current => !current)} aria-label="Abrir menu">{open ? <FiX /> : <FiMenu />}</button><nav className={open ? "nav open" : "nav"}>{navigation.map(({ to, label, icon }) => <NavLink key={to} to={to} end={to === "/"} onClick={closeMenu}>{icon}{label}</NavLink>)}<a className="social-link" href="https://www.linkedin.com/in/diego-fernandes-de-sa/" target="_blank" rel="noreferrer" aria-label={t("nav.linkedin")}><FiLinkedin /></a><LanguageSelector /></nav></header>;
}
