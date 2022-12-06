import "../entities/styles/header.scss";

function Header() {
  return (
    <header className="header-wrapper">
      <div>
        <h1>
          The best free stock photos, royalty free images shared by creators.
        </h1>
        <form action="" role="search" className="search-form">
          <div className="search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search for free photos"
            />
            <button>Search</button>
          </div>
        </form>
        <div>Trending:</div>
      </div>
      <img alt="22" src="" />
      <a href="">
        <p>
          <span>Photo by</span>
          <span>{""}</span>
        </p>
      </a>
    </header>
  );
}

export default Header;
