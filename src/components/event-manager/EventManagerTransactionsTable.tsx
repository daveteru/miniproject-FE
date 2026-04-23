import { useState } from "react";
import type { PageableResponse } from "../../types/pagination";
import type { Transaction } from "../../types/transaction";
import { formatThousand } from "../../utility/utils";
import Pagination from "../Pagination";
import Popup from "../Popup";
import useAcceptTransaction from "../../hooks/transactions/useAcceptTransaction";
import useRejectTransaction from "../../hooks/transactions/useRejectTransaction";

interface TransactionsTableProps {
  transactions: PageableResponse<Transaction> | undefined;
  onPageChange: (page: number) => void;
}

export default function EventManagerTransactionsTable({
  transactions,
  onPageChange,
}: TransactionsTableProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [proof, setProof] = useState<string | null>(null);
  const { mutate: acceptTransaction } = useAcceptTransaction();
  const { mutate: rejectTransaction } = useRejectTransaction();

  const handleDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    proof?: string,
    uuid?: string,
  ) => {
    const selectedValue = e.target.value;
    if (selectedValue === "proof" && proof) {
      setProof(proof);
      setOpen(true);
    }
    if (selectedValue === "accept" && uuid) {
      acceptTransaction(uuid);
    }
    if (selectedValue === "reject" && uuid) {
      rejectTransaction(uuid);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="w-full min-w-420 border-y border-black bg-[#f2ff7b]">
          <div className="grid grid-cols-[200px_300px_150px_150px_150px_120px_120px_150px_180px_150px] font-bold text-[14px]">
            <div className="px-4 py-2">Event</div>
            <div className="px-4 py-2">Email</div>
            <div className="px-4 py-2">Tickets</div>
            <div className="px-4 py-2">Total Price</div>
            <div className="px-4 py-2">Voucher Used</div>
            <div className="px-4 py-2">Coupon Used</div>
            <div className="px-4 py-2">Points Used</div>
            <div className="px-4 py-2">Final Price</div>
            <div className="px-4 py-2">Status</div>
            <div className="px-4 py-2">Actions</div>
          </div>
        </div>

        {transactions ? (
          transactions.data.map((transaction, index) => (
            <div
              key={index}
              className="grid grid-cols-[200px_300px_150px_150px_150px_120px_120px_150px_180px_150px] min-w-420 border-b border-neutral-300 font-medium text-[14px]"
            >
              <div className="px-4 py-2">{transaction.eventName}</div>
              <div className="px-4 py-2 wrap-break-word">
                {transaction.email}
              </div>
              <div className="px-4 py-2">
                {transaction.tickets.map((ticket, index) => (
                  <div key={index} className="flex flex-col">
                    <div>
                      {ticket.level} {ticket.amount}x
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2">
                Rp. {formatThousand(transaction.totalPrice)}
              </div>
              <div className="px-4 py-2">
                {transaction.voucher ? "✅" : "❎"}
              </div>
              <div className="px-4 py-2">
                {transaction.coupon ? <p>{transaction.coupon}%</p> : "❎"}
              </div>
              <div className="px-4 py-2">
                {formatThousand(transaction.points)}
              </div>
              <div className="px-4 py-2">
                Rp. {formatThousand(transaction.finalPrice)}
              </div>
              <div className="px-4 py-2">{transaction.paymentStatus}</div>
              <div className="px-4 py-2">
                <select
                  onChange={(e) =>
                    handleDropdownChange(
                      e,
                      transaction.paymentProof,
                      transaction.uuid,
                    )
                  }
                  className="border rounded px-3 py-0.5"
                >
                  <option></option>
                  <option value="proof">Payment Proof</option>
                  <option
                    value="accept"
                    className={
                      transaction.paymentStatus === "WAITING_FOR_CONFIRM"
                        ? ""
                        : "hidden"
                    }
                  >
                    Accept
                  </option>
                  <option
                    value="reject"
                    className={
                      transaction.paymentStatus === "WAITING_FOR_CONFIRM"
                        ? ""
                        : "hidden"
                    }
                  >
                    Reject
                  </option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">No transactions found</div>
        )}
      </div>
      {transactions && (
        <Pagination
          currentPage={transactions.meta.page}
          totalPages={Math.ceil(
            transactions.meta.total / transactions.meta.take,
          )}
          onPageChange={onPageChange}
        />
      )}
      <Popup open={open} onClose={() => setOpen(false)}>
        <p className="font-krona-one absolute top-1 left-1 p-2">
          Payment Proof
        </p>
        {proof && <img src={proof} className="h-40 mt-4" />}
      </Popup>
    </div>
  );
}
