import { useEffect, useState } from "react";
import { AddProductModal } from "./AddProductModal";
import { EditProductModal } from "./EditProductModal";
import { IProduct } from "../models/IProduct";
import { ICreateProduct } from "../models/ICreateProduct";
import "../styles/admin.css";
import { AllOrdersModal } from "./AllOrdersModal";

export const Admin = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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
      <button className="admin-other-button" onClick={openAddModal}>
        Add a fun duck
      </button>
      <AddProductModal
        open={showAddModal}
        onClose={closeAddModal}
        onAddProduct={handleAddProduct}
      />

      <button className="admin-other-button" onClick={openOrdersModal}>
        Show orders
      </button>
      <AllOrdersModal open={showOrdersModal} onClose={closeOrdersModal} />

      <ul className="ulContainer">
        {products.map((product) => (
          <li key={product._id}>
            <div className="admin-product">
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
                    className="admin-button"
                    onClick={() => handleOpenEditModal(product._id)}
                  >
                    Edit duck
                  </button>
                  <button
                    className="admin-button"
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
