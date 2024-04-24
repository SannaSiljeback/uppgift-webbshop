import { useCart } from "../context/CartContext";

export const Cart = () => {
  const { cart, removeFromCart } = useCart();
  return (
    <>
      <h2>kundkorgen</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.product._id}>
            <div onClick={() => removeFromCart(product.product)}></div>
            {product.quantity} st -{" "} {product.product.name} - {product.product.price} kr
            <button onClick={() => removeFromCart(product.product)}>radera något</button>
          </li>
          
        ))}
        
      </ul>
      {cart.length > 0 && <button>betala din roliga kundkorg</button>}
    </>
  );
};
