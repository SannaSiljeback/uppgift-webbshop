import { useEffect, useState } from "react";
import { AddProductModal } from "./AddProductModal";
import { EditProductModal } from "./EditProductModal";
import { IProduct } from "../models/IProduct";
import { ICreateProduct } from "../models/ICreateProduct";
import "../styles/admin.css";
import { AllOrdersModal } from "./AllOrdersModal";
import { Link } from "react-router-dom";
import axios from "axios";

interface IAdminProps {
  products: IProduct[];
  fetchProducts: () => void;
}

export const Admin: React.FC<IAdminProps> = ({ products, fetchProducts }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchProducts();
  }, [products]);

  //ADD functionality
  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const addProductFunction = async (product: ICreateProduct) => {
    try {
      const response = await axios.post("/api/create-product", product, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        const data = response.data;
        console.log("Product added", data);
      } else {
        console.error("Could not add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  //EDIT functionality
  const handleOpenEditModal = (productId: string) => {
    setSelectedProductId(productId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedProductId(null);
  };

  const editProductFunction = async (productId: string, product: ICreateProduct) => {
    try {
      const response = await axios.put(`/api/edit-product/${productId}`, product, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        const data = response.data;
        console.log("Product updated", data);
      } else {
        console.error("Could not update product:", response.statusText);
      }
    } catch (error) {
      console.error("Error with updating product:", error);
    }
  };

  //ORDERS functionality
  const openOrdersModal = () => {
    setShowOrdersModal(true);
  };

  const closeOrdersModal = () => {
    setShowOrdersModal(false);
  };

  const deleteProductFunction = async (productId: string) => {
    const confirmMessage = window.confirm("Are you sure you want to delete this duck?");
  
    if (!confirmMessage) {
      return;
    }
  
    try {
      const response = await axios.delete(`/api/delete-product/${productId}`);
  
      if (response.status === 201) {
        console.log("Product deleted", productId);
        fetchProducts();
      } else {
        console.error("Could not delete product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <h1>Fun admin page</h1>
      <button className="homeButton">
        <Link to="/" style={{ color: "black" }}>
          Home
        </Link>
      </button>

      <button
        className="adminOtherButtons"
        onClick={openAddModal}
        style={{ position: "fixed", top: "15px", right: "210px" }}
      >
        Add a fun duck
      </button>
      <AddProductModal
        open={showAddModal}
        onClose={closeAddModal}
        onAddProduct={addProductFunction}
      />

      <button
        className="adminOtherButtons"
        onClick={openOrdersModal}
        style={{ position: "fixed", top: "15px", right: "15px" }}
      >
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
                    onClick={() => deleteProductFunction(product._id)}
                  >
                    Delete duck
                  </button>
                  {selectedProductId && (
                    <EditProductModal
                      open={showEditModal}
                      onClose={handleCloseEditModal}
                      onEditProduct={editProductFunction}
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
