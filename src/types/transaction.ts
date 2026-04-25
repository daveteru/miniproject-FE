export interface Transaction {
  uuid: string;
  eventName: string;
  createdAt: string;
  email: string;
  customerName: string;
  customerAvatar: string;
  tickets: {
    level: string;
    amount: number;
  }[];
  totalPrice: number;
  voucher: number;
  coupon: number;
  points: number;
  finalPrice: number;
  paymentStatus: string;
  paymentProof: string;
}
