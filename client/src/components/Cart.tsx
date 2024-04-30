import { useState } from "react";
import { Modal } from "@mui/material";
import { useCart } from "../context/CartContext";
import { IProduct } from "../models/IProduct";
import { GiPlasticDuck } from "react-icons/gi";
import "../styles/cart.css";
import { CiTrash } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const [openCart, setOpenCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  console.log(selectedProduct);

  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  //cart items funktionality
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

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleRemoveItem = (product: IProduct) => {
    removeFromCart(product); // Call removeFromCart function from the context
  };

  //modal functionality
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

  //customer form functionality
  const handleCustomerForm = () => {
    setShowCustomerForm(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  };

  const handleBuyOrder = () => {
    const lineItems = cart.map((item) => ({
      productId: item.product._id,
      price: item.product.price,
      quantity: item.quantity,
    }));

    try {
      fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          address: address,
          orderDate: new Date().toISOString(),
          status: "paid",
          totalPrice: calculateTotal(),
          lineItems: lineItems,
          paymentId: "1234",
        }),
      }).then((response) => {
        if (response.ok) {
          console.log("Order placed successfully");
          setShowCustomerForm(false);
          setOpenCart(false);
          navigate("/confirmation");
        } else {
          console.error("Failed to place order");
        }
      });
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  return (
    <>
      <button onClick={() => setOpenCart(!openCart)} className="cartButton">
        Buy all ducks <GiPlasticDuck className="duck" />
      </button>
      <Modal
        open={openCart}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
        <>
          <div className="modalDiv">
            <button onClick={handleCloseModal} className="closeButton">
              X
            </button>
            <h2>Cart:</h2>
            <h3>Products:</h3>
            <div className="itemContainer">
              {cart.map((item) => (
                <div key={item.product._id} style={{ marginBottom: "10px" }}>
                  <hr style={{ marginBottom: "20px" }} />
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{ width: "100px", marginRight: "10px" }}
                  />
                  <div>
                    <h4>{item.product.name}</h4>
                    <p>Price: {item.product.price} kr</p>
                    <div className="buttonContainer">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDecrement(item.product._id);
                        }}
                        className="quantityButton"
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
                        className="quantityButton"
                      >
                        +
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(item.product);
                        }}
                        className="deleteButton"
                      >
                        <CiTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h3>Total: {calculateTotal()} kr</h3>
            <button className="buyCartButton" onClick={handleCustomerForm}>
              Continue to checkout
            </button>

            {showCustomerForm && (
              <div className="customerForm">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  className="formInput"
                />
                <input
                  type="text"
                  placeholder="Firstname"
                  onChange={handleFirstNameChange}
                  className="formInput"
                />
                <input
                  type="text"
                  placeholder="Lastname"
                  onChange={handleLastNameChange}
                  className="formInput"
                />
                <input
                  type="text"
                  placeholder="Address"
                  onChange={handleAddressChange}
                  className="formInput"
                />
                <button
                  className="buyCartButton"
                  style={{ display: "block", marginTop: "10px" }}
                  onClick={handleBuyOrder}
                >
                  Buy this fun cart
                </button>
              </div>
            )}
          </div>
        </>
      </Modal>
    </>
  );
};
