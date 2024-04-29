import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  // ListItem,
  ListItemText,
  DialogActions,
  Button,
} from "@mui/material";
import { IOrder } from "../models/IOrder";

interface AllOrdersProps {
  open: boolean;
  onClose: () => void;
}

export const AllOrdersModal: React.FC<AllOrdersProps> = ({ open, onClose }) => {
  const [allOrders, setAllOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders-with-details");
      const data = await response.json();
      setAllOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>All fun orders</DialogTitle>
      <DialogContent>
        <List>
          {allOrders.map((order) => (
            <div key={order._id}>
              <hr />
              <ListItemText
                primary={`Order ID: ${order._id}`}
                secondary={`Customer: ${order.customer}, Order Date: ${new Date(
                  order.orderDate
                ).toLocaleDateString()}, Status: ${
                  order.status
                }, Total Price: ${order.totalPrice} SEK, Payment ID: ${
                  order.paymentId
                }`}
              />

              {order.lineItems &&
                order.lineItems.map((item) => (
                  <div key={item._id}>
                    <ListItemText
                      primary={`Product: ${item.linkedProduct.name}`}
                      secondary={`Amount: ${item.amount}, Total Price: ${item.totalPrice} SEK`}
                    />
                  </div>
                ))}
                <hr />
            </div>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "#2d898b" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
