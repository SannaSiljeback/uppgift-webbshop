import { useEffect, useState } from "react";
import { Admin } from "./Admin";
import axios from "axios";

export const AdminWrapper = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/");
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return <Admin products={products} fetchProducts={fetchProducts} />;
};
