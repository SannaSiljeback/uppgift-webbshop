import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/confirmation.css";
import { GiCoffeeBeans } from "react-icons/gi";

export const Confirmation = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { clearCart } = useCart();

  useEffect(() => {
    if (!verified) {
      const verifySession = async () => {
        let sessionId;

        const dataFromLs = localStorage.getItem("sessionId");

        if (dataFromLs) {
          sessionId = JSON.parse(dataFromLs);
        }

        const response = await fetch(
          "http://localhost:3001/payments/verify-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setVerified(data.verified);
          setIsLoading(false);
        }

        if (data.verified) {
          localStorage.removeItem("sessionId");
          clearCart();
        }
      };
      verifySession();
    }
  }, [verified]);

  return (
    <>
    <div className="confirmation">
      <h1>{verified && !isLoading ? "Thank you for your purchase" : "Loading...."} <GiCoffeeBeans /></h1>
      </div>
    </>
  );
};
