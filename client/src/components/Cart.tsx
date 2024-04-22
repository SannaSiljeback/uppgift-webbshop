import { useCart } from "../context/CartContext";
import { Payment } from "./Payment";
import { AiOutlineDelete } from "react-icons/ai";
import "../styles/cart.css";

export const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <div className="bigCartContainer">
        <h2>Your coffee cart</h2>
        <ul>
          {cart.map((product) => (
            <div key={product.product.id} className="smallCartContainer">
              <h3>{product.product.name}</h3>
              <div className="itemContainer">
                <img
                  src={product.product.images[0]}
                  alt={product.product.name}
                  style={{ width: "80px" }}
                />
                <div className="quantityContainer">
                  <p className="quantity">
                    {product.quantity} st -{" "}
                    {product.product.default_price.unit_amount / 100} SEK
                  </p>
                  <div
                    onClick={() => removeFromCart(product.product)}
                    className="delete"
                  >
                    <AiOutlineDelete />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>

        <Payment />
      </div>
    </>
  );
};
