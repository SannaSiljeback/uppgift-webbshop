import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Register } from "./Register";
import { CiShoppingBasket } from "react-icons/ci";
import "../styles/navbar.css";
import { useCart } from "../context/CartContext";
import { Cart } from "./Cart";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";

export const Navbar = () => {
  const { cart } = useCart();
  const [user, setUser] = useState<string>("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartQuantity(totalQuantity);
  }, [cart]);

  useEffect(() => {
    const authorize = async () => {
      const response = await fetch("http://localhost:3001/auth/authorize", {
        credentials: "include",
      });

      const data = await response.json();
      if (response.status === 200) {
        setUser(data);
      } else {
        setUser("");
      }
    };
    authorize();
  }, []);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <>
    
      <nav>
        <div className="navContainer">
        <ul>
          <li>
            <NavLink to="/" className="home">
              <BiSolidCoffeeBean />
              <div>Home</div>
            </NavLink>
          </li>
          <li>
            {!user ? (
              <div onClick={toggleLogin} className="login">
                <AiOutlineUser />
                <div>Log in</div>
              </div>
            ) : (
              <>
                {" "}
                <Logout setUser={setUser} />{" "}
              </>
            )}
          </li>

          <li>
            {!user && (
              <div onClick={toggleRegister} className="register">
                <AiOutlineUserAdd />
                <div>Register</div>
              </div>
            )}
          </li>

          <li>
            {user && (
              <div className="cart" onClick={toggleCart}>
                <CiShoppingBasket />
                <p>{cartQuantity}</p>
                <div>Cart</div>
              </div>
            )}
          </li>
        </ul>
        </div>
      </nav>
      {!user && showLogin && <Login setUser={setUser} />}
      {!user && showRegister && <Register />}
      {showCart && <Cart />}
    </>
  );
};
