// import { useCart } from "../context/CartContext";

// export const Cart = () => {
//   const { cart, removeFromCart, addToCart } = useCart();
//   return (
//     <>
//       <h2>kundkorgen</h2>
//       <ul>
//         {cart.map((product) => (
//           <li key={product.product._id}>
//             <img
//               src={product.product.image}
//               style={{ width: "80px", height: "auto" }}
//             />
//             {product.quantity} st - {product.product.name} -{" "}
//             {product.product.price} kr
//             <button onClick={() => addToCart(product.product)}>köp mer ankor</button>
//             <button onClick={() => removeFromCart(product.product)}>
//               radera något
//             </button>
//           </li>
//         ))}
//       </ul>
//       {cart.length > 0 && <button>betala din roliga kundkorg</button>}
//     </>
//   );
// };

// import { useState } from "react";
// import { Modal } from "@mui/material";
// import { useCart } from "../context/CartContext";
// import { IProduct } from "../models/IProduct";

// export const Cart = () => {
//   const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();
//   const [openCart, setOpenCart] = useState(false);

//   const toggleCart = () => setOpenCart(!openCart);

//   const handleIncrement = (product: IProduct) => {
//     addToCart(product);
//   };

//   const handleDecrement = (product: IProduct) => {
//     const item = cart.find((item) => item.product._id === product._id);
//     if (item && item.quantity > 1) {
//       decreaseQuantity(product);
//     } else if (item && item.quantity === 1) {
//       removeFromCart(product);
//     }
//   };

//   const calculateTotal = () => {
//     return cart.reduce(
//       (total, item) => total + item.product.price * item.quantity,
//       0
//     );
//   };

//   return (
//     <>
//       <button onClick={toggleCart}>
//         toggla
//       </button>
//       <Modal
//         open={openCart}
//         onClose={toggleCart}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}>
//         <div
//           style={{
//             backgroundColor: "white",
//             padding: "20px",
//             borderRadius: "10px",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
//             width: "40%",
//             maxWidth: "500px",
//             maxHeight: "80vh",
//             overflow: "auto",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}>
//           <button
//             onClick={toggleCart}
//             style={{
//               alignSelf: "flex-end",
//               border: "none",
//               background: "none",
//               fontSize: "large",
//               cursor: "pointer",
//             }}>
//             X
//           </button>
//           <h2>Your Cart</h2>
//           {cart.length > 0 ? (
//             cart.map((item) => (
//               <div
//                 key={item.product._id}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   marginBottom: "10px",
//                   width: "100%",
//                 }}>
//                 <img
//                   src={item.product.image}
//                   alt={item.product.name}
//                   style={{ width: "50px", marginRight: "10px" }}
//                 />
//                 <h4 style={{ flex: 1 }}>{item.product.name}</h4>
//                 <p>Pris: {item.product.price} SEK</p>
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <button
//                     onClick={() => handleDecrement(item.product)}
//                     style={{ marginRight: "5px" }}>
//                     ta bort en
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => handleIncrement(item.product)}
//                     style={{ marginLeft: "5px" }}>
//                     lägg till en
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>Cart is empty</p>
//           )}
//           <h3>Total: {calculateTotal()} kr</h3>
//           <button style={{ marginTop: "10px" }}>Go to payment</button>
//         </div>
//       </Modal>
//     </>
//   );
// };

import { useState } from "react";
import { Modal } from "@mui/material";
import { useCart } from "../context/CartContext";
import { IProduct } from "../models/IProduct";

export const Cart = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const [openCart, setOpenCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  console.log(selectedProduct);

  //Släng in i en useEffect.
  //   const calculateTotal = () => {
  //     return cart.reduce((total, item) => total + item.product.price, 0);
  //   };

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
        style={{ position: "fixed", top: "10px", right: "10px" }}>
        toggla cart
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
            backgroundColor: "white",
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
              fontSize: "16px",
              color: "#666",
            }}
          >
            X
          </button>
          <h2 style={{ color: "purple" }}>Kundvagn:</h2>
          <h3>Artiklar:</h3>
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
                  <h4 style={{ fontSize: "16px", marginBottom: "2px" }}>
                    {item.product.name}
                  </h4>
                  <p style={{ fontSize: "12px", marginBottom: "2px" }}>
                    Pris: {item.product.price} kr
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
                        fontSize: "12px",
                      }}
                    >
                      -
                    </button>
                    <p
                      style={{
                        marginRight: "5px",
                        padding: "5px 10px",
                        fontSize: "12px",
                      }}
                    >
                      Antal: {item.quantity}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIncrement(item.product._id);
                      }}
                      style={{
                        marginRight: "5px",
                        padding: "5px 10px",
                        fontSize: "12px",
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
                        marginLeft: "5px",
                        padding: "5px 10px",
                        fontSize: "14px",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "red",
                      }}
                    >
                      ta bort allt
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h3>Total: {calculateTotal()} kr</h3>
          <button>Gå till betalning</button>
        </div>
      </Modal>
    </>
  );
};
