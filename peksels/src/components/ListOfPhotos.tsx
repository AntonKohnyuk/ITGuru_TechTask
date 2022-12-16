import { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import PhotoCard from "./Photo";
import "../entities/styles/list-of-photos.scss";
import { useActions } from "../hooks/useActions";
import { useParams } from "react-router-dom";

interface PageProps {
  pageName: string;
}

function ListOfPhotos({ pageName }: PageProps) {
  const { photos, error, loading } = useTypedSelector((state) => state.photos);
  const { page, per_page } = useTypedSelector((state) => state.fetchSettings);
  const { fetchPhotos, setFetchSettings, clearStore } = useActions();
  const { category } = useParams();

  const [query, setQuery] = useState(category || "");

  const InfiniteScroll = () => {
    while (true) {
      let windowRelativeBottom =
        document.documentElement.getBoundingClientRect().bottom;
      if (
        windowRelativeBottom > document.documentElement.clientHeight + 1000 ||
        loading
      )
        break;
      return setFetchSettings({ page: page! + 1, per_page });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", InfiniteScroll);
    return () => {
      window.removeEventListener("scroll", InfiniteScroll);
    };
  });

  useEffect(() => {
    fetchPhotos({ page, per_page, query }, pageName);
  }, [page]);
  useEffect(() => {
    return () => {
      clearStore();
    };
  }, []);
  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div className="cards-wrapper">
      {photos.map((photo) => (
        <PhotoCard photo={photo} key={photo.id} />
      ))}

      {loading && <h2>Идет загрузка...</h2>}
    </div>
  );
}

export default ListOfPhotos;
