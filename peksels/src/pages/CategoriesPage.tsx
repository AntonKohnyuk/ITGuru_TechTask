import ListOfPhotos from "../components/list-of-photos/ListOfPhotos";
import FixedHeader from "../components/header/fixed-header/FixedHeader";
import { PAGES } from "../entities/enums/pages";

function CategoriesPage() {
  return (
    <>
      <FixedHeader />
      <ListOfPhotos pageName={PAGES.CATEGORIES} />
    </>
  );
}

export default CategoriesPage;
