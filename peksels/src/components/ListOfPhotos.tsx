import { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import PhotoCard from "./Photo";
import "../entities/styles/list-of-photos.scss";
import { useActions } from "../hooks/useActions";

function ListOfPhotos() {
  const { photos, error, loading } = useTypedSelector((state) => state.photos);
  const { page, per_page } = useTypedSelector((state) => state.fetchSettings);
  const { fetchPhotos, setFetchSettings } = useActions();

  const InfiniteScroll = () => {
    while (true) {
      let windowRelativeBottom =
        document.documentElement.getBoundingClientRect().bottom;
      if (
        windowRelativeBottom > document.documentElement.clientHeight + 3000 ||
        loading
      )
        break;
      return setFetchSettings({ page: page! + 1, per_page });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", InfiniteScroll);
    return () => window.removeEventListener("scroll", InfiniteScroll);
  });

  useEffect(() => {
    fetchPhotos({ page, per_page });
  }, [page]);

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
