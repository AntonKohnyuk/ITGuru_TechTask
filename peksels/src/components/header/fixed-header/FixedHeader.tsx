import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import SvgIcon from "@mui/icons-material/Search";
import "./FixedHeader.scss";

export default function FixedHeader() {
  const [inputVal, setInputVal] = useState("");

  const navigate = useNavigate();

  const findPhotos = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputVal) {
      navigate(`/categories/${inputVal}`);
    }
  };

  return (
    <div style={{ height: "90px", marginBottom: "30px" }}>
      <div className="fixed-header">
        <Link to="/main" className="logo">
          <img
            src="/img/pexels-white.png"
            alt="Pexels Logo"
            className="logo-img"
          />
        </Link>
        <form action="" role="search" className="search-form">
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
      </div>
    </div>
  );
}
