import { useState } from "react";
import { Modal } from "@mui/material";
import { useCart } from "../context/CartContext";
import { IProduct } from "../models/IProduct";
import { GiPlasticDuck } from "react-icons/gi";
import "../styles/cart.css";
import { CiTrash } from "react-icons/ci";

export const Cart = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const [openCart, setOpenCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  console.log(selectedProduct);

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleIncrement = (productId: string) => {
    const product = cart.find((item) => item.product._id === productId);
    if (product) {
      addToCart(product.product);
    }
  };

  const handleDecrement = (productId: string) => {
    const product = cart.find((item) => item.product._id === productId);
    if (product && product.quantity > 1) {
      decreaseQuantity(product.product);
    }
  };

  const handleRemoveItem = (product: IProduct) => {
    removeFromCart(product); // Call removeFromCart function from the context
  };

  const handleOpenModal = (product: IProduct) => {
    setSelectedProduct(product);
    setOpenCart(true);
  };
  console.log(handleOpenModal); //ska ha?

  const handleCloseModal = () => {
    setOpenCart(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: IProduct) => {
    addToCart(product);
  };
  console.log(handleAddToCart); //ska ha?

  return (
    <>

      <button
        onClick={() => setOpenCart(!openCart)}
        style={{ backgroundColor: "#FDF9EC", position: "fixed", top: "15px", right: "15px" }} className="duck-button">
        Buy all ducks <GiPlasticDuck className="duck" />
      </button>
      <Modal
        open={openCart}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            backgroundColor: "#FDF9EC",
            padding: "20px",
            width: "300px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <button
            onClick={handleCloseModal}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "20px",
              color: "#666",
            }}
          >
            X
          </button>
          <h2 style={{ color: "#2D898B", fontSize: "22px" }}>Cart:</h2>
          <h3 style={{ fontSize: "20px"}}>Products:</h3>
          <div style={{ marginBottom: "20px" }}>
            {cart.map((item) => (
              <div key={item.product._id} style={{ marginBottom: "10px" }}>
                <hr style={{ marginBottom: "20px" }} />
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: "100px", marginRight: "10px" }}
                />
                <div>
                  <h4 style={{ fontSize: "18px", marginBottom: "2px" }}>
                    {item.product.name}
                  </h4>
                  <p style={{ fontSize: "15px", marginBottom: "2px" }}>
                    Price: {item.product.price} kr
                  </p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecrement(item.product._id);
                      }}
                      style={{
                        marginLeft: "5px",
                        padding: "5px 10px",
                        fontSize: "15px",
                        backgroundColor: "#57C5C7",
                        height: "32px",
                        display: "flex",
                        justifyContent: "center", 
                        alignItems: "center", 
                      }}
                    >
                      -
                    </button>
                    <p
                      style={{
                        marginRight: "5px",
                        padding: "5px 10px",
                        fontSize: "15px",
                      }}
                    >
                      Quantity: {item.quantity}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIncrement(item.product._id);
                      }}
                      style={{
                        marginRight: "5px",
                        padding: "5px 10px",
                        fontSize: "15px",
                        backgroundColor: "#57C5C7",
                        height: "32px",
                        display: "flex",
                        justifyContent: "center", 
                        alignItems: "center", 
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(item.product);
                      }}
                      style={{
                        display: "flex",
                        marginLeft: "5px",
                        padding: "5px 10px",
                        fontSize: "19px",
                        border: "none",
                        cursor: "pointer",
                        color: "red",
                        justifyContent: "center", 
                        alignItems: "center", 
                        backgroundColor: "#D3D7D9",
                        height: "32px",
                                         
                      }}
                    >
                      <CiTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h3>Total: {calculateTotal()} kr</h3>
          <button className="buy-all-button">Buy this fun cart</button>
        </div>
      </Modal>
    </>
  );
};
