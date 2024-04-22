import { useEffect, useState } from "react";
import { IProduct, useCart } from "../context/CartContext";
import { BsBagPlus } from "react-icons/bs";
import "../styles/products.css";

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        const fetchedData = await response.json();
        console.log(fetchedData);

        setProducts(fetchedData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="productContainer">
        {products.map((product) => (
          <div key={product.id}>
            <div className="productName">
              <p>{product.name}</p>
            </div>
            <div className="imgContainer">
              <img src={product.images[0]} alt={product.name}  />
            </div>
            <div className="priceContainer">
              <span>{product.default_price.unit_amount / 100} SEK</span>
              <div onClick={() => addToCart(product)} className="buy">
                <BsBagPlus />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
