"use client";

import { useState, useMemo, useEffect } from "react";
import AdminPanelSearch from "@/app/(admin-panel)/components/AdminPanelSearch";
import { useGetAllProducts } from "@/services/adminPanel";
import Image from "next/image";
import { Bolt } from "lucide-react";
import { useModalQuery } from "@/hooks/useModalQuery";
import Select from "@/components/ui/Select";
import { useGetAllCategoriesList } from "@/services/categoriesList";

type Status = "Active" | "Draft" | "Deactivate";

interface ProductTableRow {
  id: string;
  name: string;
  category: string;
  price: number;
  date: string;
  status: Status;
  image: string;
}

type SortKey = "name" | "date" | "category" | "price" | "status" | null;
type SortOrder = "asc" | "desc";

export default function ProductTable() {
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { open: openAssign, isOpen } = useModalQuery({ modalValue: "assign" });
  const { data: categoryData } = useGetAllCategoriesList();
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  // کوئری گرفتن از API
  const { data, isLoading, refetch } = useGetAllProducts({
    per_page: rowsPerPage,
    page,
    name: search || undefined,
    sort_by: sortKey || undefined,
    sort_order: sortOrder,
    tag_ids: categoryId,
  });

  const categoryItems = useMemo(() => {
    if (!categoryData) return [];

    return Object.entries(categoryData).map((item) => ({
      value: String(item[1].id),
      label: item[1].name,
    }));
  }, [categoryData]);

  useEffect(() => {
    if (!isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  const products: ProductTableRow[] = useMemo(() => {
    if (!data) return [];
    return data.data.map((p) => ({
      id: String(p.Id),
      name: p.Name,
      category: p.tags?.[0]?.Name || "Uncategorized",
      price: parseFloat(p.MinValue || "0"),
      date: new Date().toISOString(), // چون API تاریخ نداره، فعلا Current Date یا فیلد مناسب
      status: Math.random() > 0.5 ? "Active" : "Draft", // نمونه‌سازی چون API status نداره
      image: p.ImagePath,
    }));
  }, [data]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) return "⇅";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-100 p-4">
      {/* Filters */}
      <div className="flex items-center gap-4 mb-4">
        <div className="py-3 px-3 w-full">
          <AdminPanelSearch
            placeholder="Search for Store"
            searchValue={search}
            setSearchValue={setSearch}
          />
        </div>
        <Select
          label="Filter By Category"
          options={categoryItems}
          onChange={(id) => {
            if (typeof id === "string") {
              setCategoryId(id);
            } else {
              setCategoryId(undefined);
            }
          }}
          value={categoryId || ""}
        />
      </div>

      {/* Info */}
      <div className="text-sm text-gray-500 mb-2">
        {isLoading ? "Loading..." : `${data?.total || 0} results found`}
        {categoryFilter && (
          <span className="ml-2 bg-gray-100 px-2 py-1 rounded">
            Category: {categoryFilter}{" "}
            <button
              className="ml-1 text-red-500"
              onClick={() => setCategoryFilter("")}
            >
              ✕
            </button>
          </span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-xs">
              <th
                className="p-3 w-[30%] text-left cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Product {renderSortIcon("name")}
              </th>
              <th
                className="p-3 w-[20%] text-left cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Create at {renderSortIcon("date")}
              </th>
              <th
                className="p-3 w-[20%] text-left cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Category {renderSortIcon("category")}
              </th>
              <th
                className="p-3 w-[15%] text-left cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Price {renderSortIcon("price")}
              </th>

              <th />
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr
                key={item.id}
                className="border-b border-dashed border-[#919EAB33] hover:bg-gray-50 transition-colors"
              >
                {/* Product (Image + Name) */}
                <td className="p-3 flex items-center gap-2">
                  <Image
                    src={item.image}
                    width={68}
                    height={43}
                    alt={item.name}
                    className="rounded w-[68px] h-[43px] object-cover"
                  />
                  <span className="truncate">{item.name}</span>
                </td>

                {/* Date */}
                <td className="p-3">
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>

                {/* Category */}
                <td className="p-3 truncate">{item.category}</td>

                {/* Price */}
                <td className="p-3">${item.price.toFixed(2)}</td>

                {/* Status */}
                {/* <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Draft"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td> */}

                <td className="p-3 text-center">
                  <Bolt
                    className="cursor-pointer"
                    onClick={() =>
                      openAssign({ id: item.id, category: item.category })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <div>
          Rows per page:{" "}
          <select
            className="border rounded px-2 py-1"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 20].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <div>
            {data?.from}–{data?.to} of {data?.total}
          </div>
          <div className="flex gap-2">
            <button
              disabled={!data?.prev_page_url}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              &lt;
            </button>
            <button
              disabled={!data?.next_page_url}
              onClick={() => setPage((p) => p + 1)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
