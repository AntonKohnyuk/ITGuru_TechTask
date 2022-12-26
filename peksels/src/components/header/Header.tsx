import { Photo } from "pexels";
import { useEffect, useState } from "react";
import "./Header.scss";
import { backgroundFetch } from "../../entities/API/backgroundFetch";
import SearchIcon from "@mui/icons-material/Search";
import SvgIcon from "@mui/icons-material/Search";
import { getCategories } from "../../entities/data/query";
import { Link, useNavigate } from "react-router-dom";
import FixedHeader from "./fixed-header/FixedHeader";
import { CircularProgress } from "@mui/material";
import { useActions } from "../../hooks/useActions";

function Header() {
  const [backImg, setBackImg] = useState({} as Photo);
  const [inputVal, setInputVal] = useState("");
  const [categories, setCategories] = useState([] as string[]);
  const [hideHeader, setHideHeader] = useState(false);

  const { clearStore } = useActions();

  const navigate = useNavigate();

  const changeHeader = () => {
    setHideHeader(document.documentElement.scrollTop > 500);
  };

  useEffect(() => {
    setCategories(getCategories());

    backgroundFetch().then((photo) => {
      setBackImg(photo);
    });

    window.addEventListener("scroll", changeHeader);

    return () => window.removeEventListener("scroll", changeHeader);
  }, []);

  const findPhotos = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputVal) {
      clearStore();
      navigate(`/categories/${inputVal}`);
    }
  };

  return (
    <>
      <header className="header-wrapper">
        <Link to="/main" className="logo">
          <img
            src="/img/pexels-white.png"
            alt="Pexels Logo"
            className="logo-img"
          />
        </Link>
        <div className="header-content">
          <h1>
            The best free stock photos, royalty free images shared by creators.
          </h1>
          <form
            action=""
            role="search"
            className="search-form"
            style={{ marginTop: "30px" }}
          >
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search for free photos"
                value={inputVal}
                onChange={(event) => setInputVal(event.target.value)}
                onKeyDown={(event) => {
                  if (event.code === "13") {
                    findPhotos(event);
                  }
                }}
              />
              <button
                className="search-input-button"
                onClick={(event) => findPhotos(event)}
              >
                <SvgIcon
                  component={SearchIcon}
                  className="search-icon"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </form>
          <div className="trending">
            <span className="trending-search">Trending:&nbsp;</span>
            {categories.map((category, index) => (
              <Link
                to={`/categories/${category}`}
                key={index}
                className="category"
                onClick={clearStore}
              >
                {category}
                {index < 6 ? <span>,&nbsp;</span> : <span>&nbsp;</span>}
              </Link>
            ))}
          </div>
        </div>
        <img
          alt={backImg.alt || "Photo"}
          src={backImg.src?.landscape || "/img/loader.png"}
          className="header-background "
        />
        <a
          href={backImg.photographer_url || ""}
          className="photographer-url"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className="photographer-name"
            style={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <p style={{ opacity: 0.5 }}>Photo by&nbsp;—&nbsp;</p>

            {backImg.photographer || <CircularProgress color="inherit" />}
          </div>
        </a>
        <a
          href="https://www.pexels.com"
          className="copyright"
          target="_blank"
          rel="noreferrer"
        >
          <p>All Photos provided by Pexels</p>
        </a>
      </header>
      {hideHeader && <FixedHeader />}
    </>
  );
}

export default Header;
