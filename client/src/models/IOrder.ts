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

export interface ILineItem {
    _id: string;
    quantity: number;
    product: string;
    totalPrice: number;
    linkedProduct: {
      image: string;
      name: string;
    };
  }