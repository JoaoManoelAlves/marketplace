import { createContext } from "react";
import type { CartItems } from "../types";

export type CartContextProps = {
  addToCart: (product: CartItems) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  items: CartItems[];
};

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps,
);