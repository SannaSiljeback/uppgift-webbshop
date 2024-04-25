import { useEffect, useState } from "react";
import { AddProduct } from "./AddProduct";
import { ICreateProduct } from "../models/ICreateProduct";
import { IProduct } from "../models/IProduct";
import { EditProduct } from "./EditProduct";

export const Admin = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

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


  const handleEditProduct = async () => {
    
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

      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product-wrapper">
              <img
                src={product.image}
                style={{ width: "150px", height: "auto" }}
              />
            </div>
            <div className="product-info">
              {product.name} - {product.price} kr
              <button onClick={handleToggleAddModal}>Edit Product</button>
                <EditProduct
                  open={showAddModal}
                  onClose={handleToggleAddModal}
                  onEditProduct={handleEditProduct}
                />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
