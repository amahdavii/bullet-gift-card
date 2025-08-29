"use client";

import React, { FC } from "react";
import BottomSheetModal from "@/components/shared/BottomSheetModal";
import CloseSVG from "@/components/icons/CloseSVG";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useGetDateRanges } from "@/services/dashboard/orders";

interface Props {
  isOpen: boolean;
  close: () => void;
}

const FilterModal: FC<Props> = ({ isOpen, close }) => {
  const { data } = useGetDateRanges();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("modal");
    params.set("period", value);
    router.replace(`/dashboard?${params.toString()}`);
  };

  const handleClose = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("modal");
    const newQuery = params.toString();
    const url = newQuery ? `/dashboard?${newQuery}` : "/dashboard";
    router.replace(url);
  };

  const handleReseet = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("period");
    params.delete("from");
    params.delete("to");
    const newQuery = params.toString();
    const url = newQuery ? `/dashboard?${newQuery}` : "/dashboard";
    router.replace(url);
  };

  const handleOpen = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("modal", "calender");

    params.delete("from");
    params.delete("to");
    params.delete("period");

    router.replace(`/dashboard?${params.toString()}`);
  };

  const getLabel = data?.data.length
    ? data?.data.find((item) => item.value === searchParams.get("period"))
        ?.label
    : null;

  return (
    <BottomSheetModal isOpen={isOpen} onClose={handleClose} height="95vh">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-[1.375rem] font-semibold">Filter By Date</h3>
          <button
            className="w-[1.625rem] h-[1.625rem] flex justify-center items-center rounded-full bg-[#F1F0F0]"
            onClick={close}
          >
            <CloseSVG />
          </button>
        </div>
        {!!getLabel && (
          <div className="px-3">
            <span
              className="bg-[#F1F0F0] text-[0.75rem] inline-flex items-center px-2 py-1 rounded gap-[0.5rem]"
              onClick={handleReseet}
            >
              {getLabel}
              <CloseSVG />
            </span>{" "}
          </div>
        )}

        <div className="flex-1 overflow-y-auto mt-4 px-4">
          <ul>
            {data?.data.map((item) => (
              <li
                key={item.value}
                onClick={() => handleSelect(item.value)}
                className="py-4 px-2 border-[#E3E1E2] border-t border-b first:border-t-0 last:border-b-0 cursor-pointer hover:bg-gray-100"
              >
                {item.label}
              </li>
            ))}
            <li
              className="py-4 px-2 border-[#E3E1E2] border-t border-b first:border-t-0 last:border-b-0 cursor-pointer hover:bg-gray-100"
              onClick={handleOpen}
            >
              Custom
            </li>{" "}
          </ul>
        </div>
        <div className="pt-4">
          <Button fullWidth onClick={handleReseet}>
            Reset
          </Button>
        </div>
      </div>
    </BottomSheetModal>
  );
};

export default FilterModal;
