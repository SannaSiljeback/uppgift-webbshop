import { Link } from "react-router-dom";
import "../styles/confirmation.css";

export const Confirmation = () => {
  return (
    <>
      <h1>Thank you for your order!</h1>
      <div className="confirmationContainer">
        <Link to="/" className="confirmationButton">
          Back to the shop
        </Link>
      </div>
    </>
  );
};
