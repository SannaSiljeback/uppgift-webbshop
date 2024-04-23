import { useEffect, useState } from 'react';
import './App.css'
import { Cart } from './components/Cart';
import { IProduct } from './models/IProduct';
import { Admin } from './components/Admin';

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<IProduct[]>([]);
  

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
  }

  const addToCart = (product: IProduct) => {
    setCart([...cart, product]);
  }

  return (
    <>
      <h2>En kul webbshop</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <img src={product.image} style={{ width: '200px', height: 'auto' }} />
            {product.name} - {product.price} kr
            <button onClick={() => addToCart(product)}>kom och köp</button>
          </li>
        ))}
      </ul>
      <Cart cart={cart}/>
      <Admin />
    </>
  );
}

export default App
