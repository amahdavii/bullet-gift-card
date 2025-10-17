"use client";

import AdminPanelSearch from "@/app/(admin-panel)/components/AdminPanelSearch";
import EditSVG from "@/components/icons/admin-panel/EditSVG";
import useDebounce from "@/hooks/useDebounce";
import useToast from "@/hooks/useToast";
import { useDeleteUser, useGetAllUsers } from "@/services/adminPanel";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Status = "Active" | "Inactive";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  createdAt: string;
  status: Status;
}

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const perPage = 10;
  const { push } = useRouter();
  const toast = useToast();

  const debouncedSearch = useDebounce(search, 1000);

  const { data, refetch, isLoading } = useGetAllUsers({
    page,
    per_page: perPage,
    name: debouncedSearch || undefined,
  });

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  //   const statusColor: Record<Status, string> = {
  //     Active: "bg-green-100 text-green-600",
  //     Inactive: "bg-red-100 text-red-600",
  //   };

  const { mutateAsync } = useDeleteUser();

  const handleDelete = (id: string) => {
    mutateAsync(id, {
      onSuccess: () => {
        toast.success("User deleted successfully!");
        refetch();
      },
      onError: () => {
        toast.error("Failed to delete user.");
      },
    });
  };

  const handleStatusChange = (id: number, newStatus: Status) => {
    if (!data) return;
    // تغییر وضعیت در state موقت
    data.data = data.data.map((u) =>
      u.id === id ? { ...u, status: newStatus } : u
    ) as typeof data.data;
    setOpenDropdown(null);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-100">
      <div className="flex items-center justify-between px-6 pt-6 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">User List</h2>
        <button
          className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
          onClick={() => push("/admin-panel/user/create-user")}
        >
          + Add User
        </button>
      </div>

      <div className="pb-6 px-6">
        <AdminPanelSearch
          placeholder="Search for user"
          searchValue={search}
          setSearchValue={setSearch}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 text-[#637381] text-xs">
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Phone</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Created at</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold"></th>
              <th className="p-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data?.data.map((user) => (
              <tr
                key={user.id}
                className="border-b border-dashed border-[#919EAB33] hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.phone || "-"}</td>
                <td className="py-3 px-4">
                  {user.is_admin ? "admin" : "normal"}
                </td>
                <td className="py-3 px-4 text-gray-500">
                  {new Date(user.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-4 relative">
                  {/* <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === user.id ? null : user.id)
                    }
                    className={`flex items-center justify-between gap-1 px-3 py-1.5 rounded-full text-xs font-medium min-w-[110px] ${
                      statusColor[user.status]
                    }`}
                  >
                    {user.status}
                  </button> */}
                  {user.is_active ? "Active" : "Inactive"}

                  {openDropdown === user.id && (
                    <div className="absolute mt-1 bg-white border rounded-lg shadow z-10 w-[110px]">
                      {(["Active", "Inactive"] as Status[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => handleStatusChange(user.id, s)}
                          className="block w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <button
                    className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                    onClick={() => push(`/admin-panel/user/${user.id}`)}
                  >
                    <EditSVG />
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button
                    className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleDelete(String(user.id))}
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
