import { Route, Routes } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/categories/:category" element={<CategoriesPage />} />
    </Routes>
  );
}

export default App;
