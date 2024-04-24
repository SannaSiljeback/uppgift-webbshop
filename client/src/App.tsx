import { useEffect, useState } from "react";
import "./App.css";
import { Cart } from "./components/Cart";
import { Admin } from "./components/Admin";
import { IProduct } from "./models/IProduct";
import { useCart } from "./context/CartContext";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <>
      <h2>En kul webbshop</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product-wrapper">
              <img
                src={product.image}
                style={{ width: "150px", height: "auto" }}
              />
            </div>
            <div className="product-info">
              {product.name} - {product.price} kr
              <button onClick={() => addToCart(product)}>
                köp en rolig anka
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Cart />
      <Admin />
    </>
  );
}

export default App;
