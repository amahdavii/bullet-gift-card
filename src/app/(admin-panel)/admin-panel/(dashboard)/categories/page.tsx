"use client";
import PlusSVG from "@/components/icons/PlusSVG";
import { Button } from "@/components/ui/Button";
import AdminPanelSearch from "../../../components/AdminPanelSearch";
import { useState } from "react";
import { useDeleteCategory, useGetAllCategories } from "@/services/adminPanel";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import EditSVG from "@/components/icons/admin-panel/EditSVG";
import useToast from "@/hooks/useToast";

const CategoriesPage = () => {
  const [search, setSearch] = useState("");
  const { data, refetch } = useGetAllCategories({ name: search });
  const { push } = useRouter();
  const { mutateAsync } = useDeleteCategory();
  const toast = useToast();

  const handleDelete = (id: string) => {
    mutateAsync(id, {
      onSuccess: () => {
        toast.success("Category deleted successfully!");
        refetch();
      },
      onError: () => {
        toast.error("Failed to delete Category.");
      },
    });
  };

  return (
    <div className="px-[1rem] py-[3rem] flex flex-col gap-[2.5rem]">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-[#1C252E] text-[1.5rem] font-bold">
          Category List
        </h2>
        <Button
          onClick={() => push("/admin-panel/categories/create-catergory")}
        >
          <PlusSVG />
          Add Category
        </Button>
      </div>
      <AdminPanelSearch
        placeholder="Search for Category"
        searchValue={search}
        setSearchValue={setSearch}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white rounded shadow-sm p-2">
          {/* Header */}
          <div className="grid grid-cols-3 bg-gray-100 rounded-lg px-4 py-3 text-sm font-medium text-gray-700">
            <div className="font-semibold text-[#637381] text-[0.875rem]">
              Name
            </div>
            {/* <div className="font-semibold text-[#637381] text-[0.875rem]">
              Created at
            </div> */}
            <div></div>

            <div></div>
          </div>

          {/* Rows */}
          <div className="mt-2 space-y-3">
            {data?.map((c, i) => (
              <div
                key={i}
                className="grid grid-cols-3 items-center bg-white border border-[#919EAB1F] rounded-lg px-4 py-3"
              >
                <div className="flex items-center space-x-3">
                  <span className="cursor-move">⋮⋮</span>
                  <span>{c.Name}</span>
                </div>
                {/* <div>
                  <div>12 Jan 2025</div>
                </div> */}
                <div />

                {/* <Link
                  href={`/admin-panel/categories/${c.Id}`}
                  className="text-right"
                >
                  <button
                    className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                  >
                    <Trash />
                  </button>{" "}
                </Link> */}

                <div className="text-right flex gap-2 justify-end">
                  <button
                    className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                    onClick={() => push(`/admin-panel/categories/${c.Id}`)}
                  >
                    <EditSVG />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleDelete(String(c.Id))}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {/* <div className="flex justify-between items-center p-4 text-sm text-gray-500">
            <span>Rows per page: 5</span>
            <div className="flex items-center space-x-2">
              <span>6-10 of 11</span>
              <button className="w-6 h-6 flex items-center justify-center border rounded">
                ◀
              </button>
              <button className="w-6 h-6 flex items-center justify-center border rounded">
                ▶
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
