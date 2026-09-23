import { BrowserRouter, Route, Routes } from "react-router";
import ProductPageDetails from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPageDetails />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
