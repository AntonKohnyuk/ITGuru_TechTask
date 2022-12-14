import { Navigate, Route, Routes } from "react-router-dom";
import { initializeLocalStorage } from "./entities/localStorage/localStorage";
import CategoriesPage from "./pages/CategoriesPage";
import MainPage from "./pages/MainPage";

function App() {
  initializeLocalStorage();
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/categories/:category" element={<CategoriesPage />} />
      <Route path="*" element={<Navigate to="/main" />} />
    </Routes>
  );
}

export default App;
