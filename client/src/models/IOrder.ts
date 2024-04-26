export interface ILineItem {
    _id: string;
    orderId: string;
    amount: number;
    product: string;
    totalPrice: number;
    linkedProduct: {
      _id: string;
      name: string;
      description: string;
      price: number;
      image: string;
      inStock: number;
      status: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  }
  
 export interface IOrder {
    _id: string;
    customer: string;
    orderDate: string;
    status: string;
    totalPrice: number;
    paymentId: string;
    lineItems: ILineItem[];
  }