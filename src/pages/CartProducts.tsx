import { useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { items, addToCart, removeFromCart, clearCart, totalItems, totalPrice } =
    useContext(CartContext);

  const botao =
    "bg-emerald-700 text-white px-3 py-1 rounded-lg hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  // Carrinho vazio
  if (items.length === 0) {
    return (
      <div className="p-8 flex flex-col items-center gap-4">
        <h1>Carrinho</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/" className="text-emerald-700 font-bold">
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <h1>Carrinho</h1>

      <ul className="w-[90%] flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="border border-gray-300 rounded-lg p-4 flex flex-row items-center justify-between gap-4"
          >
            <img src={item.thumbnail} alt={item.title} width={80} />

            <div className="flex flex-col items-start">
              <Link to={`/produto/${item.id}`} className="text-emerald-700 font-bold">
                {item.title}
              </Link>
              <p>${item.price.toFixed(2)} cada</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Diminui 1 unidade (remove o item ao chegar em 0) */}
              <button className={botao} onClick={() => removeFromCart(item.id)}>
                -
              </button>
              <span>{item.quantity}</span>
              {/* Soma 1 unidade, respeitando o estoque */}
              <button
                className={botao}
                onClick={() => addToCart(item)}
                disabled={item.quantity >= item.stock}
              >
                +
              </button>
            </div>

            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-2">
        <p>Total de itens: {totalItems}</p>
        <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <button className={botao} onClick={clearCart}>
          Limpar carrinho
        </button>
        <Link to="/" className="text-emerald-700 font-bold">
          Continuar comprando
        </Link>
      </div>
    </div>
  );
}

export default Cart;