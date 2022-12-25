import Header from "../components/header/Header";
import ListOfPhotos from "../components/list-of-photos/ListOfPhotos";
import { PAGES } from "../entities/enums/pages";

function MainPage() {
  return (
    <>
      <Header />
      <ListOfPhotos pageName={PAGES.MAIN} />
    </>
  );
}

export default MainPage;
