"use client";
import PlusSVG from "@/components/icons/PlusSVG";
import { Button } from "@/components/ui/Button";
import AdminPanelSearch from "../../../components/AdminPanelSearch";
import { useState } from "react";
import { useGetAllCategories } from "@/services/adminPanel";

const CategoriesPage = () => {
  const [search, setSearch] = useState("");
  const { data } = useGetAllCategories({ name: search });
  return (
    <div className="px-[1rem] py-[3rem] flex flex-col gap-[2.5rem]">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-[#1C252E] text-[1.5rem] font-bold">
          Category List
        </h2>
        <Button>
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
            <div className="font-semibold text-[#637381] text-[0.875rem]">
              Created at
            </div>
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
                <div>
                  <div>12 Jan 2025</div>
                </div>
                <div className="text-right">
                  <button className="text-gray-500 hover:text-gray-700">
                    ✎
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
