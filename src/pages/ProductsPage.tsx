import { useEffect, useState } from "react";
import type { Product } from "../types";
import { Link } from "react-router";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      {products.map((product) => (
        <div key={product.id} className="w-[90%] border border-gray-300 rounded-lg p-4 m-4 flex flex-row justify-between items-center gap-4">
          <img src={product.thumbnail} alt={product.title} />
          <div className="flex flex-col justify-between items-start gap-5   ">
            <h2>{product.title}</h2>
            <p className="text-xl font-normal text-justify">{product.description}</p>
            <p className="font-bold">Category: {product.category}</p>
            <p className="text-emerald-700 font-bold ">${product.price}</p>
            <Link to={`/products/${product.id}`} className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors">
              See more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ProductsPage;
