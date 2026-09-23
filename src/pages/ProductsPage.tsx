import { useContext, useEffect, useState } from "react";
import type { Product } from "../types";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";

function ProductsPage() {
  const { totalItems } = useContext(CartContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) throw new Error("Erro ao carregar os produtos");
        const data = await response.json();
        setProducts(data.products);
      } catch {
        setError("Erro ao buscar os produtos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="p-8">Carregando produtos...</p>;
  if (error) return <p className="p-8">Erro: {error}</p>;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[90%] flex justify-end mt-4">
        <Link
          to="/cart"
          className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
        >
          Carrinho ({totalItems})
        </Link>
      </div>

      {products.map((product) => (
        <div
          key={product.id}
          className="w-[90%] border border-gray-300 rounded-lg p-4 m-4 flex flex-row justify-between items-center gap-4"
        >
          <img src={product.thumbnail} alt={product.title} />
          <div className="flex flex-col justify-between items-start gap-5">
            <h2>{product.title}</h2>
            <p className="text-xl font-normal text-justify">{product.description}</p>
            <p className="font-bold">Category: {product.category}</p>
            <p className="text-emerald-700 font-bold">${product.price}</p>
            {/* Rota dinâmica: /produto/:id */}
            <Link
              to={`/produto/${product.id}`}
              className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              See more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ProductsPage;