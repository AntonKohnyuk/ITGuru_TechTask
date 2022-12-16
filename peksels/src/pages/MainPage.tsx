import Header from "../components/Header";
import ListOfPhotos from "../components/ListOfPhotos";
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
