import type { Transaction } from "../types/transaction";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function revenuePerYear(transactions: Transaction[], year: number) {
  const totalByMonth: number[] = new Array(12).fill(0);
  const transactionsByMonth: number[][] = new Array(12);

  for (let i = 0; i < transactionsByMonth.length; i++) {
    transactionsByMonth[i] = [];
  }

  // group transactions into montly buckets
  transactions.forEach((transaction) => {
    const month = new Date(transaction.createdAt).getMonth();
    const transYear = new Date(transaction.createdAt).getFullYear();
    if (transaction.paymentStatus === "PAID" && transYear === year) {
      transactionsByMonth[month].push(transaction.finalPrice);
    }
  });

  // calculate totals for each bucket
  for (let i = 0; i < transactionsByMonth.length; i++) {
    const revenueByMonth = transactionsByMonth[i].reduce(
      (acc, curr) => acc + curr,
      0,
    );
    totalByMonth[i] += revenueByMonth;
  }

  // convert data into format usable by recharts
  const result = totalByMonth.map((monthlyTotal, index) => {
    return { month: months[index], total: monthlyTotal };
  });

  return result;
}

export function getTotalRevenue(transactions: Transaction[]) {
  if (!transactions) return 0;

  const revenueArray = transactions
    .filter(
      (transaction) =>
        transaction.paymentStatus === "PAID" && transaction.finalPrice,
    )
    .map((transaction) => transaction.finalPrice);

  const totalRevenue = revenueArray.reduce(
    (accumulator, current) => accumulator + current,
    0,
  );

  return totalRevenue;
}

export function getThisYearsRevenue(transactions: Transaction[]) {
  if (!transactions) return 0;
  const currentYear = new Date().getFullYear();

  const revenueArray = transactions
    .filter(
      (transaction) =>
        transaction.paymentStatus === "PAID" &&
        transaction.finalPrice &&
        new Date(transaction.createdAt).getFullYear() === currentYear,
    )
    .map((transaction) => transaction.finalPrice);

  const totalRevenue = revenueArray.reduce(
    (accumulator, current) => accumulator + current,
    0,
  );

  return totalRevenue;
}

export function getThisMonthsRevenue(transactions: Transaction[]) {
  if (!transactions) return 0;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const revenueArray = transactions
    .filter(
      (transaction) =>
        transaction.paymentStatus === "PAID" &&
        transaction.finalPrice &&
        new Date(transaction.createdAt).getFullYear() === currentYear &&
        new Date(transaction.createdAt).getMonth() === currentMonth,
    )
    .map((transaction) => transaction.finalPrice);

  const totalRevenue = revenueArray.reduce(
    (accumulator, current) => accumulator + current,
    0,
  );

  return totalRevenue;
}

export function getTodaysRevenue(transactions: Transaction[]) {
  if (!transactions) return 0;
  const today = new Date().setHours(0, 0, 0, 0);

  const revenueArray = transactions
    .filter(
      (transaction) =>
        transaction.paymentStatus === "PAID" &&
        transaction.finalPrice &&
        new Date(transaction.createdAt).setHours(0, 0, 0, 0) === today,
    )
    .map((transaction) => transaction.finalPrice);

  const totalRevenue = revenueArray.reduce(
    (accumulator, current) => accumulator + current,
    0,
  );

  return totalRevenue;
}

export function getTotalTicketsSold(transactions: Transaction[]) {
  if (!transactions) return 0;

  const soldTicketsByTransaction = transactions
    .filter(
      (transaction) =>
        transaction.paymentStatus === "PAID" && transaction.tickets,
    )
    .map((transaction) => {
      return transaction.tickets;
    });

  console.log(soldTicketsByTransaction);

  let totalTicketsSold = 0;
  soldTicketsByTransaction.map((transaction) => {
    const ticketAmtsByTransaction = transaction.map((ticket) => ticket.amount);
    const ticketTotByTransaction = ticketAmtsByTransaction.reduce(
      (acc, curr) => acc + curr,
      0,
    );
    totalTicketsSold += ticketTotByTransaction;
  });

  console.log(totalTicketsSold);

  return totalTicketsSold;
}

export function getTransactionCount(transactions: Transaction[]) {
  if (!transactions) return 0;
  const paidTransactions = transactions.filter(
    (transaction) => transaction.paymentStatus === "PAID",
  );

  return paidTransactions.length;
}

export function getFirstSixTransactions(transactions: Transaction[]) {
  if (!transactions) return [];

  const result: Transaction[] = [];

  for (let i = 0; i < 6; i++) {
    if (!transactions[i]) return result;

    if (transactions[i].paymentStatus === "PAID") {
      result.push(transactions[i]);
    }
  }

  return result;
}
