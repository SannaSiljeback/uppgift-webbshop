import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { CartProvider } from "../context/CartContext";

export const Layout = () => {
  return (
    <CartProvider>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </CartProvider>
  );
};
