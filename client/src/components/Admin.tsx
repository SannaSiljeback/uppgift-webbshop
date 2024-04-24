import { useState } from "react";
import { AddProduct } from "./AddProduct";
import { ICreateProduct } from "../models/ICreateProduct";

export const Admin = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleToggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleAddProduct = async (product: ICreateProduct) => {
    try {
      const response = await fetch("/api/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product added:", data);
        // Uppdatera gränssnittet eller utför andra åtgärder efter att produkten har lagts till
      } else {
        console.error("Failed to add product:", response.statusText);
        // Hantera fel om något gick fel med servern
      }
    } catch (error) {
      console.error("Error adding product:", error);
      // Hantera fel om det uppstår något fel under anropet
    }
  };

  return (
    <>
      <h2>Admin</h2>
      <button onClick={handleToggleAddModal}>Add new Product</button>
      <AddProduct
        open={showAddModal}
        onClose={handleToggleAddModal}
        onAddProduct={handleAddProduct}
      />
    </>
  );
};
