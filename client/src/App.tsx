import { useEffect, useState } from 'react';
import './App.css'
import { Cart } from './components/Cart';

interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
}

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<IProduct[]>([]);

  // Hämta produkter vid montering av komponenten
  useEffect(() => {
    fetchProducts();
  }, []); // Använd en tom array som andra argument för att köra effekten en gång vid montering

  // Fetch-anrop för att hämta produkter
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/");
      const data = await response.json();
      setProducts(data); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const addToCart = (product: IProduct) => {
    setCart([...cart, product]);
  }

  return (
    <>
      <h2>En trist webbshop</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <img src={product.image} style={{ width: '200px', height: 'auto' }} />
            {product.name} - {product.price} kr
            <button onClick={() => addToCart(product)}>kom och köp</button>
          </li>
        ))}
      </ul>
      <Cart/>
      <h3>Varukorg</h3>
      <ul>
        {cart.map((product) => (
          <li key={product._id}>
            {product.name} - {product.price} kr
          </li>
        ))}
      </ul>
    </>
  );
}

export default App
