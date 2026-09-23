import { useState } from "react";
import type { ReactNode } from "react";
import type { CartItems } from "../types";
import { CartContext } from "./CartContext";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItems[]>([]);

  const addToCart = (product: CartItems) => {
    setItems((prevState) => {
      const exist = prevState.find((item) => item.id === product.id);
      {
        /*Produto já existe no carrinho ou não */
      }
      if (exist) {
        return prevState.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevState, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (productId: number) => {
    setItems((prevItem) => {
      const exist = prevItem.find((item) => item.id === productId);
      {
        /* Produto não existente no carrinho*/
      }
      if (!exist) return prevItem;

      {
        /* Produto existente no carrinho, mas quantidade é maior que 1*/
      }
      if (exist && exist.quantity > 1) {
        return prevItem.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
      return prevItem.filter((item) => item.id !== productId);
    });
  };
  {
    /*Limpar carrinho*/
  }
  const clearCart = () => {
    return setItems([] as CartItems[]);
  };

  {
    /*Quantidade total de itens */
  }
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  {
    /*Preço total do carrinho */
  }
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return(
    <CartContext.Provider value={{
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        items
    }}>
        {children}
    </CartContext.Provider>
  )
}
export default CartProvider;
