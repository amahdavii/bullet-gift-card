"use client";

import AdminPanelSearch from "@/app/(admin-panel)/components/AdminPanelSearch";
import { useDeleteStore, useGetStoreList } from "@/services/adminPanel";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import EditSVG from "@/components/icons/admin-panel/EditSVG";
import { Trash } from "lucide-react";
import useToast from "@/hooks/useToast";

interface Store {
  id: number;
  name: string;
  address: string;
  owner: string;
  phone: string;
  created_at: string;
  is_active: boolean;
}

export default function StoresTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const perPage = 10;
  const { push } = useRouter();

  // debounce search
  const debouncedSearch = useDebounce(search, 1000);

  const { mutateAsync } = useDeleteStore();
  const toast = useToast();

  const { data, isLoading, refetch } = useGetStoreList({
    page,
    per_page: perPage,
    name: debouncedSearch || undefined,
  });

  const handleDelete = (id: string) => {
    mutateAsync(id, {
      onSuccess: () => {
        toast.success("Store deleted successfully!");
        refetch();
      },
      onError: () => {
        toast.error("Failed to delete Store.");
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-100">
      <div className="flex items-center justify-between px-6 pt-6 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Store List</h2>
        <button
          className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
          onClick={() => push("/admin-panel/store/create-store")}
        >
          + Add Store
        </button>
      </div>

      <div className="pb-6 px-6">
        <AdminPanelSearch
          placeholder="Search for Store"
          searchValue={search}
          setSearchValue={setSearch}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 text-[#637381] text-xs">
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Address</th>
              <th className="p-4 font-semibold">Owner</th>
              <th className="p-4 font-semibold">Phone Number</th>
              <th className="p-4 font-semibold">Created at</th>
              <th className="p-4 font-semibold"></th>
              <th className="p-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data?.data?.map((store: Store) => (
              <tr
                key={store.id}
                className="border-b border-dashed border-[#919EAB33] hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">{store.name}</td>
                <td className="py-3 px-4">{store.address}</td>
                <td className="py-3 px-4">{store.owner}</td>
                <td className="py-3 px-4">{store.phone ?? "-"}</td>
                <td className="py-3 px-4 text-gray-500">
                  {new Date(store.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>

                <td className="py-3 px-4">
                  <button
                    className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                    onClick={() => push(`/admin-panel/store/${store.id}`)}
                  >
                    <EditSVG />
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button
                    className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleDelete(String(store.id))}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end mt-4 text-sm text-gray-500 px-6 pb-6">
        <span>
          {data?.from}–{data?.to} of {data?.total}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-2 py-1 rounded hover:bg-gray-100"
            disabled={page === 1}
          >
            &lt;
          </button>
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, data?.last_page || 1))
            }
            className="px-2 py-1 rounded hover:bg-gray-100"
            disabled={page === data?.last_page}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
