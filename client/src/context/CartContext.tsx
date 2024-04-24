import { IProduct } from "../models/IProduct";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ICartItem {
  product: IProduct;
  quantity: number;
}

interface ICartContext {
  cart: ICartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (product: IProduct) => void;
  clearCart: () => void;
  decreaseQuantity: (product: IProduct) => void;
}

const initialValues = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  decreaseQuantity: () => {},
};

const CartContext = createContext<ICartContext>(initialValues);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<ICartItem[]>(() => {
    const lsData = localStorage.getItem("cart");
    return lsData ? JSON.parse(lsData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  };

  const addToCart = (product: IProduct) => {
    const clonedCart = [...cart];

    const existingProduct = clonedCart.find(
      (item) => item.product._id === product._id
    );

    if (existingProduct) {
      existingProduct.quantity++;
      setCart(clonedCart);
    } else {
      setCart([...clonedCart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product: IProduct) => {
    const clonedCart = cart.filter((item) => item.product._id !== product._id);
    setCart(clonedCart);
  };

  const decreaseQuantity = (product: IProduct) => {
    const clonedCart = cart.map((item) => {
      if (item.product._id === product._id) {
        return {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
        };
      }
      return item;
    });
    setCart(clonedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
