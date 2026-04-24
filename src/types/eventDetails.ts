export interface EventDetails {
  id: number;
  name: string;
  artist: string;
  location: string;
  city: string;
  startDate: string;
  endDate: string;
  thumbnail: string;
  totalTicket: number;
  category: string;
  description: string;
  deletedAt: string | null;
  organizerId: number;
  tickets: {
    id: number;
    ticketLevel: string;
    availableTicket: number;
    deletedAt: string | null;
    eventId: number;
    price: number;
  }[];
  organizer: {
    fullName: string;
    avatar: string | null;
  };
  vouchers: {
    expiredDate: string;
    discamount: number;
    amount: number;
    id?: number;
  }[];
  reviews: {
    id: number;
    text: string;
    rating: number;
    reviewer: {
      fullName: string;
      avatar: string;
    };
  }[];
};