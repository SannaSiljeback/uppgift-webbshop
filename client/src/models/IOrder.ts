import { ILineItem } from "./ILineItem";

export interface IOrder {
  customerEmail: string;
  _id: string;
  customer: string;
  address: string;
  orderDate: string;
  status: string;
  totalPrice: number;
  paymentId: string;
  lineItems: ILineItem[];
}
