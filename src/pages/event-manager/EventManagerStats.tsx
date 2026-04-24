import { useEffect, useState } from "react";
import { Link } from "react-router";
import DashboardBarChart from "../../components/event-manager/DashboardBarChart";
import useGetOrganizerTransactions from "../../hooks/users/useGetOrganizerTransactions";
import {
  getFirstSixTransactions,
  getThisMonthsRevenue,
  getThisYearsRevenue,
  getTodaysRevenue,
  getTotalRevenue,
  getTotalTicketsSold,
  getTransactionCount,
  revenuePerYear,
} from "../../utility/dashboard-utils";
import { formatThousand } from "../../utility/utils";
import DashboardRecentsRow from "../../components/event-manager/DashboardRecentsRow";
import type { Transaction } from "../../types/transaction";

export default function EventManagerStats() {
  const { data: transactions } = useGetOrganizerTransactions(1, 9999999);

  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [yearRevenue, setYearRevenue] = useState<number>(0);
  const [monthRevenue, setMonthRevenue] = useState<number>(0);
  const [todaysRevenue, setTodaysRevenue] = useState<number>(0);

  const [totalTicketSold, setTotalTicketSold] = useState<number>(0);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);

  const [firstSixTransactions, setFirstSixTransactions] = useState<
    Transaction[]
  >([]);

  const [revenueView, setRevenueView] = useState<
    "total" | "year" | "month" | "day"
  >("total");

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [chartData, setChartData] =
    useState<{ month: string; total: number }[]>();

  useEffect(() => {
    if (transactions) {
      console.log(transactions);

      setTotalRevenue(getTotalRevenue(transactions.data));
      setYearRevenue(getThisYearsRevenue(transactions.data));
      setMonthRevenue(getThisMonthsRevenue(transactions.data));
      setTodaysRevenue(getTodaysRevenue(transactions.data));
      setTotalTicketSold(getTotalTicketsSold(transactions.data));
      setTotalTransactions(getTransactionCount(transactions.data));
      setFirstSixTransactions(getFirstSixTransactions(transactions.data));
      setChartData(revenuePerYear(transactions.data, year));
    }
  }, [transactions, year]);

  const handleChartYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(e.target.value);
    setYear(newYear);
  };

  const handleRevenueViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRevenueView(e.target.value as "total" | "year" | "month" | "day");
  };

  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-10 py-6 md:py-8 w-full overflow-y-auto">
      <nav className="text-xs uppercase tracking-wide text-neutral-500 mb-2 sm:mb-3">
        <Link to="/" className="hover:text-neutral-900 cursor-pointer">
          Home
        </Link>
        <span className="mx-1">&gt;</span>
        <Link
          to="/event-manager/my-events"
          className="hover:text-neutral-900 cursor-pointer"
        >
          Event Manager
        </Link>
        <span className="mx-1">&gt;</span>
        <span className="text-neutral-700">Dashboard</span>
      </nav>

      <h1 className="text-xl sm:text-2xl font-bold uppercase text-neutral-900 mb-6 sm:mb-8">
        DASHBOARD
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        <div className="flex flex-col w-full max-w-6xl gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-2">
            <div className="border border-neutral-200 p-4 rounded shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="font-krona-one">Revenue</h2>
                <select
                  value={revenueView}
                  onChange={handleRevenueViewChange}
                  className="border border-neutral-200 px-2 py-1 rounded-md shadow-xs focus:border-blue-500 text-[12px]"
                >
                  <option value="total">Total</option>
                  <option value="year">This year</option>
                  <option value="month">This month</option>
                  <option value="day">Today</option>
                </select>
              </div>
              <p className="mt-3 font-semibold">
                Rp.{" "}
                {revenueView === "total"
                  ? formatThousand(totalRevenue)
                  : revenueView === "year"
                    ? formatThousand(yearRevenue)
                    : revenueView === "month"
                      ? formatThousand(monthRevenue)
                      : revenueView === "day"
                        ? formatThousand(todaysRevenue)
                        : "-"}
              </p>
            </div>
            <div className="border border-neutral-200 p-4 rounded shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="font-krona-one">Tickets Sold</h2>
              </div>
              <p className="mt-3 font-semibold">{totalTicketSold} tickets</p>
            </div>
          </div>
          <div className="h-60 sm:h-72 md:h-80 lg:h-96 border border-neutral-200 p-4 pb-10 rounded shadow-md">
            <div className="flex items-start justify-between">
              <p className="font-krona-one mb-4">Overview</p>
              <select
                value={year}
                onChange={handleChartYearChange}
                className="border border-neutral-200 px-2 py-1 rounded-md shadow-xs focus:border-blue-500 text-[12px]"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>
            {chartData && <DashboardBarChart data={chartData} />}
          </div>
        </div>
        <div className="border border-neutral-200 p-4 sm:px-6 rounded shadow-md">
          <div className="flex flex-col gap-1">
            <h2 className="font-krona-one">Recent Transactions</h2>
            <p className="text-neutral-600 text-[12px]">
              You have made {formatThousand(totalTransactions)} sales so far.
            </p>
          </div>
          <div className="flex flex-col mt-3">
            {firstSixTransactions.map((transaction) => (
              <DashboardRecentsRow
                key={transaction.uuid}
                name={transaction.customerName}
                email={transaction.email}
                avatar={transaction.customerAvatar}
                saleAmount={transaction.finalPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
