import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  default_price: {
    unit_amount: number;
  };
}

interface ICartItem {
  product: IProduct;
  quantity: number;
}

interface ICartContext {
  cart: ICartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (product: IProduct) => void;
  clearCart: () => void;
}

const initialValues = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
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
      (item) => item.product.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity++;
      setCart(clonedCart);
    } else {
      setCart([...clonedCart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product: IProduct) => {
    const clonedCart = [...cart];

    const existingProduct = clonedCart.find(
      (item) => item.product.id === product.id
    );

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
      } else {
        const index = clonedCart.findIndex(
          (item) => item.product.id === product.id
        );
        clonedCart.splice(index, 1);
      }

      setCart(clonedCart);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
