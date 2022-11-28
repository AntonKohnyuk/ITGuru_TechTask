import { useSelector } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";

function ListOfPhotos() {
  const { photos, error, loading } = useTypedSelector((state) => state.photos);
  console.log(photos);
  return <div>ListOfPhotos</div>;
}

export default ListOfPhotos;
