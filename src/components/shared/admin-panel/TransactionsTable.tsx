"use client";

import AdminPanelSearch from "@/app/(admin-panel)/components/AdminPanelSearch";
import ArrowRightSVG from "@/components/icons/ArrowRightSVG";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllOrders } from "@/services/adminPanel";
import Link from "next/link";
import { useState } from "react";

type Status = "Completed" | "Pending" | "Canceled";

type SortKey = "amount" | "date" | "fee" | null;
type SortOrder = "asc" | "desc";

export default function TransactionsTable({
  hasPagination = false,
}: {
  hasPagination?: boolean;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  const {
    data: transitionData,
    isLoading,
    isError,
  } = useGetAllOrders({
    per_page: 10,
    page: currentPage,
    customer_name: debouncedSearch,

  });

  const statusColor: Record<Status, string> = {
    Completed: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Canceled: "bg-red-100 text-red-600",
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (isLoading)
    return <div className="py-6 text-center text-gray-500">Loading...</div>;
  if (isError)
    return (
      <div className="py-6 text-center text-red-500">Something went wrong</div>
    );

  const sortedData = [...transitionData.data].sort((a, b) => {
    if (!sortKey) return 0;

    let valA: number | Date = 0;
    let valB: number | Date = 0;

    if (sortKey === "amount" || sortKey === "fee") {
      valA = parseFloat(a.amount || "0");
      valB = parseFloat(b.amount || "0");
    } else if (sortKey === "date") {
      valA = new Date(a.CreatedAt);
      valB = new Date(b.CreatedAt);
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <span className="ml-1 text-gray-300">⇅</span>;
    return sortOrder === "asc" ? (
      <span className="ml-1 text-gray-600">↑</span>
    ) : (
      <span className="ml-1 text-gray-600">↓</span>
    );
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (currentPage < transitionData.last_page)
      setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 pt-6 px-6">
        Transactions
      </h2>

      <div className="pb-6 px-6">
        <AdminPanelSearch
          placeholder="Search for Customer"
          searchValue={search}
          setSearchValue={setSearch}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 text-[#637381] text-xs">
              <th className="p-4 font-semibold">Store</th>
              <th className="p-4 font-semibold">Customer</th>
              <th
                className="p-4 font-semibold cursor-pointer select-none"
                onClick={() => handleSort("amount")}
              >
                Amount {renderSortIcon("amount")}
              </th>
              <th
                className="p-4 font-semibold cursor-pointer select-none"
                onClick={() => handleSort("date")}
              >
                Date {renderSortIcon("date")}
              </th>
              <th
                className="p-4 font-semibold cursor-pointer select-none"
                onClick={() => handleSort("fee")}
              >
                Fee {renderSortIcon("fee")}
              </th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {sortedData.map((item) => (
              <tr
                key={item.Id}
                className="border-b border-dashed border-[#919EAB33] hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">{item.store?.name || "-"}</td>
                <td className="py-3 px-4">{item.customer_name}</td>
                <td className="py-3 px-4">${item.amount}</td>
                <td className="py-3 px-4 text-gray-500 flex flex-col">
                  <div>
                    {new Date(item.CreatedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="text-[#637381]">
                    {new Date(item.CreatedAt).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </td>
                <td className="py-3 px-4">
                  {item.eGifter_feedBack?.cost || "-"}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.is_paid ? statusColor.Completed : statusColor.Pending
                    }`}
                  >
                    {item.is_paid ? "Completed" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {hasPagination ? (
        <div className="flex items-center justify-end mt-4 text-sm text-gray-500 px-6 pb-6">
          <span>
            Page {transitionData.current_page} of {transitionData.last_page}
          </span>
          <div className="flex gap-2 ml-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              &lt;
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === transitionData.last_page}
              className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      ) : (
        <Link
          href="/admin-panel/transactions"
          className="flex items-center gap-3 justify-end mt-4 text-sm text-gray-500 px-6 pb-6"
        >
          View all <ArrowRightSVG />
        </Link>
      )}
    </div>
  );
}
