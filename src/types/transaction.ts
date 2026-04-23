export interface Transaction {
  uuid: string;
  eventName: string;
  email: string;
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
