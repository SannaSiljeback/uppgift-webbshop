import { useEffect, useState } from "react";
import { Admin } from "./Admin";


export const AdminWrapper = () => {
  const [products, setProducts] = useState([]);

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

  return <Admin products={products} fetchProducts={fetchProducts} />;
};