import { useEffect, useState } from "react";
import "./App.css";
import { Cart } from "./components/Cart";
import { IProduct } from "./models/IProduct";
import { useCart } from "./context/CartContext";
import { Link } from "react-router-dom";
import { ShowProducts } from "./components/ShowProdutcs";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { addToCart } = useCart();
  const [showLogin, setShowLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const showAdminLogin = () => {
    setShowLogin(true);
  };

  const handleAdminLogin = () => {
    const adminUsername = "admin";
    const adminPassword = "admin123";

    if (username === adminUsername && password === adminPassword) {
      setAdminLogin(true);
    } else {
      alert("Wrong username or password");
    }
  };

  return (
    <>
      <h1>A fun webbshop</h1>
      <ShowProducts products={products} addToCart={addToCart} />
      <Cart />

      {!showLogin && !adminLogin && (
        <button onClick={showAdminLogin} className="adminButton">
          Admin
        </button>
      )}

      {showLogin && (
        <div className="loginContainer">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="loginInput"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="loginInput"
          />
          <button onClick={handleAdminLogin} className="loginButton">
            <Link to="/admin" style={{ color: "black" }}>
              Login
            </Link>
          </button>
        </div>
      )}
    </>
  );
}

export default App;
