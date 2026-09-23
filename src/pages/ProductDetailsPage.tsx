import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Product } from "../types";
import { CartContext } from "../context/CartContext";

function ProductPageDetails() {
  const { id } = useParams<{ id: string }>();
  const { items, addToCart, removeFromCart, totalItems } = useContext(CartContext);

  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Produto não encontrado");
        const data: Product = await res.json();
        setProductDetails(data);
      } catch {
        setError("Erro ao buscar o produto")
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

  }, [id]);

  if (loading) return <p className="p-8">Carregando...</p>;

  if (error || !productDetails) {
    return (
      <div className="p-8 flex flex-col items-center gap-4">
        <p>{error ?? "Produto não encontrado."}</p>
        <Link to="/" className="text-emerald-700 font-bold">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  // Quantidade deste produto que já está no carrinho
  const cartItem = items.find((item) => item.id === productDetails.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const atingiuEstoque = quantity >= productDetails.stock;

  const handleAdd = () => {
    addToCart({ ...productDetails, quantity: 1 });
  };

  const handleRemove = () => {
    removeFromCart(productDetails.id);
  };

  // Remove todas as unidades deste produto do carrinho
  const handleRemoveAll = () => {
    for (let i = 0; i < quantity; i++) {
      removeFromCart(productDetails.id);
    }
  };

  const botao =
    "bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="w-full flex flex-col items-center gap-6 p-6">
      {/* Navegação: voltar para a página inicial e ir para o carrinho */}
      <div className="w-full flex justify-between">
        <Link to="/" className="text-emerald-700 font-bold">
          ← Voltar para a lista de produtos
        </Link>
        <Link to="/cart" className="text-emerald-700 font-bold">
          Carrinho ({totalItems})
        </Link>
      </div>

      <div className="flex flex-col items-center gap-3 max-w-2xl">
        <h1>{productDetails.title}</h1>
        <img src={productDetails.thumbnail} alt={productDetails.title} />
        <p className="font-bold">Categoria: {productDetails.category}</p>
        <p className="text-xl">{productDetails.description}</p>
        <p className="text-emerald-700 font-bold">${productDetails.price}</p>
        <p>Estoque: {productDetails.stock} unidades</p>
      </div>

      {/* Controles do carrinho: adicionar, retirar e alterar a quantidade */}
      <div className="flex flex-col items-center gap-3">
        <p>Quantidade no carrinho: {quantity}</p>

        {quantity === 0 ? (
          <button
            className={botao}
            onClick={handleAdd}
            disabled={productDetails.stock === 0}
          >
            {productDetails.stock === 0 ? "Sem estoque" : "Adicionar ao carrinho"}
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button className={botao} onClick={handleRemove}>
              -
            </button>
            <span>{quantity}</span>
            <button className={botao} onClick={handleAdd} disabled={atingiuEstoque}>
              +
            </button>
            <button className={botao} onClick={handleRemoveAll}>
              Remover do carrinho
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPageDetails;