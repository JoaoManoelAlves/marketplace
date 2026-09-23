export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number; // estoque (o enunciado pede para exibir)
  category: string;
  thumbnail: string;
};
 
export type CartItems = Product & {
  quantity: number;
};
 