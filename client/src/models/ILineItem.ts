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