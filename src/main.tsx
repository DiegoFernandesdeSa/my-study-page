import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./styles.css";
import "./i18n";
ReactDOM.createRoot(document.getElementById("root")!).render(<BrowserRouter><FavoritesProvider><App /></FavoritesProvider></BrowserRouter>);
