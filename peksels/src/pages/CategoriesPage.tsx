import ListOfPhotos from "../components/ListOfPhotos";
import Managment from "../components/Managment";
import { PAGES } from "../entities/enums/pages";

function CategoriesPage() {
  return (
    <>
      <Managment />
      <ListOfPhotos pageName={PAGES.CATEGORIES} />
    </>
  );
}

export default CategoriesPage;
