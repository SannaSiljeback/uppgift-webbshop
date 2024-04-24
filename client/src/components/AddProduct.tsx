import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

import { ICreateProduct } from "../models/ICreateProduct";

interface AddProductProps {
  open: boolean;
  onClose: () => void;
  onAddProduct: (product: ICreateProduct) => void;
}

export const AddProduct: React.FC<AddProductProps> = ({
  open,
  onClose,
  onAddProduct,
}) => {
  const [product, setProduct] = useState({
    
    name: "",
    description: "",
    price: 0,
    image: "",
    inStock: 0,
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(product);
    onClose();
  };

  


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={product.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={product.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="image"
            label="Image URL"
            value={product.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="inStock"
            label="In Stock"
            type="number"
            value={product.inStock}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="status"
            label="Status"
            value={product.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => onAddProduct} type="submit" color="primary">
              lägg till produkt
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};