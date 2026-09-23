import { BrowserRouter, Route, Routes } from "react-router";
import ProductPageDetails from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";
import CartProducts from "./pages/CartProducts";
import CartProvider from "./context/CartProvider";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/produto/:id" element={<ProductPageDetails />} />
          <Route path="/cart" element={<CartProducts />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
export default App;