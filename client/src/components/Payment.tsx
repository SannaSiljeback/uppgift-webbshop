import { useCart } from "../context/CartContext";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import "../styles/payment.css";

export const Payment = () => {
  const { cart } = useCart();

  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:3001/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log(data);
    localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
    window.location = data.url;
  };

  return (
    <>
      <div onClick={handlePayment} className="checkout">
        <MdOutlineShoppingCartCheckout />
      </div>
    </>
  );
};
