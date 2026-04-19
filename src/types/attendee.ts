export interface Attendee {
  id: number;
  fullName: string;
  email: string;
  tickets: {
    ticketId: number;
    ticketLevel: string;
    quantity: number;
    price: number;
  }[];
  totalPaid: number;
}
