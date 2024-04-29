import { useState } from "react";
import { AddProductModal } from "./AddProductModal";
import { EditProductModal } from "./EditProductModal";
import { IProduct } from "../models/IProduct";
import { ICreateProduct } from "../models/ICreateProduct";
import "../styles/admin.css";
import { AllOrdersModal } from "./AllOrdersModal";
import { Link } from "react-router-dom";

interface IAdminProps {
  products: IProduct[];
  fetchProducts: () => void;
}

export const Admin: React.FC<IAdminProps> = ({products, fetchProducts}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  // add functionality
  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
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
      } else {
        console.error("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  //edit functionality
  const handleOpenEditModal = (productId: string) => {
    setSelectedProductId(productId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedProductId(null);
  };

  const handleEditProduct = async (
    productId: string,
    product: ICreateProduct
  ) => {
    try {
      const response = await fetch(`/api/update-product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product updated:", data);
      } else {
        console.error("Failed to update product:", response.statusText);
      }
    } catch (error) {
      console.error("Error with updating product:", error);
    }
  };

  //orders functionality
  const openOrdersModal = () => {
    setShowOrdersModal(true);
  };

  const closeOrdersModal = () => {
    setShowOrdersModal(false);
  };

  //delete functionality
  const deleteProduct = async (productId: string) => {
    const confirmMessage = confirm(
      "Are you sure you want to delete this duck?"
    );

    if (!confirmMessage) {
      return;
    }

    try {
      const response = await fetch(`/api/delete-product/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Product deleted:", productId);
        fetchProducts();
      } else {
        console.error("Failed to delete product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <h1>Fun admin page</h1>
      <button className="homeButton">
        <Link to="/" style={{color: "black"}}>Home</Link>
      </button>
      
      <button className="adminOtherButtons" onClick={openAddModal} style={{position: "fixed", top: "15px", right: "210px"}}>
        Add a fun duck
      </button>
      <AddProductModal
        open={showAddModal}
        onClose={closeAddModal}
        onAddProduct={handleAddProduct}
      />

      <button className="adminOtherButtons" onClick={openOrdersModal} style={{position: "fixed", top: "15px", right: "15px"}}>
        Show orders
      </button>
      <AllOrdersModal open={showOrdersModal} onClose={closeOrdersModal} />

      <ul className="ulContainer">
        {products.map((product) => (
          <li key={product._id}>
            <div className="adminContainer">
              <div className="imgContainer">
                <img
                  src={product.image}
                  style={{ width: "150px", height: "auto" }}
                  alt={product.name}
                />
                <div className="priceContainer">
                  <p>
                    {product.name} - {product.price} SEK
                  </p>
                  <button
                    className="adminButtons"
                    onClick={() => handleOpenEditModal(product._id)}
                  >
                    Edit duck
                  </button>
                  <button
                    className="adminButtons"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete duck
                  </button>
                  {selectedProductId && (
                    <EditProductModal
                      open={showEditModal}
                      onClose={handleCloseEditModal}
                      onEditProduct={handleEditProduct}
                      productId={selectedProductId}
                      product={
                        products.find(
                          (p) => p._id === selectedProductId
                        ) as ICreateProduct
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
