import { IProduct } from "../models/IProduct";

interface ICartProps {
  cart: IProduct[];
}
export const Cart = ({ cart }: ICartProps) => {
  return (
    <>
      <h2>kundkorgen</h2>
      <ul>
        {cart.map((product) => (
          <li key={product._id}>
            {product.name} - {product.price} kr
          </li>
        ))}
      </ul>
    </>
  );
};
