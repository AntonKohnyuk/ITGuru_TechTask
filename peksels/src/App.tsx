import { Route, Routes } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import MainPage from "./pages/MainPage";
import { fetchPhotos } from "./store/action-creators/photos";

function App() {
  fetchPhotos();
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/categories/:category" element={<CategoriesPage />} />
    </Routes>
  );
}

export default App;
