"use client";

import { NextPage } from "next";
import { useState } from "react";

import FilterSVG from "@/components/icons/FilterSVG";
import DashboardSearch from "@/components/shared/DashboardSearch";
import DetailCard from "@/components/shared/DetailCard";
import ReportCard from "@/components/shared/ReportCard";
import { useGetOrdersStore } from "@/services/dashboard/orders";
import useDebounce from "@/hooks/useDebounce";
import { useModalQuery } from "@/hooks/useModalQuery";
import FilterModal from "./_components/FilterModal";
import { useSearchParams } from "next/navigation";
import CalenderModal from "@/components/shared/CalenderModal";

const DashboardHomePage: NextPage = () => {
  const searchParams = useSearchParams();
  const periodParams = searchParams.get("period");
  const fromParams = searchParams.get("from");
  const toParams = searchParams.get("to");

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  const params: OrdersStoreParams = {};

  if (debouncedSearch.length >= 2) {
    params.product_name = debouncedSearch;
  }

  if (periodParams) {
    params.period = periodParams;
  }

  if (fromParams && toParams) {
    params.from_date = fromParams;
    params.to_date = toParams;
  }

  const { data, isLoading } = useGetOrdersStore(params);

  const {
    open: openFilter,
    isOpen,
    close,
  } = useModalQuery({
    modalValue: "filter",
  });

  const { close: closeCalender, isOpen: isCalenderOpen } = useModalQuery({
    modalValue: "calender",
  });

  return (
    <>
      <header className="py-4 px-6 flex items-center justify-center gap-x-2 bg-white">
        <DashboardSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div
          className="w-12 h-12 flex justify-center items-center border border-[#E3E1E2] rounded-lg shrink-0 cursor-pointer relative"
          onClick={() => openFilter()}
        >
          <FilterSVG />
          {!!periodParams && (
            <span className="w-[0.5rem] h-[0.5rem] bg-[#D1AE82] rounded-full absolute top-0 -right-1" />
          )}
        </div>
      </header>

      <div className="px-6 pt-6 pb-20">
        <h2 className="font-semibold mb-4">Sales Overview</h2>

        {!!data && (
          <div className="flex items-center gap-4 mb-6">
            <ReportCard
              title="Total Purchase"
              date_range={data.date_range}
              changePercent={data.purchase_change_rate.change_percentage}
              state={data.purchase_change_rate.trend as string}
              price={data.total_purchase}
            />
            <ReportCard
              title="Total Activated"
              date_range={data.date_range}
              changePercent={data.order_count_change_rate.change_percentage}
              state={data.order_count_change_rate.trend as string}
              count={data.total_orders}
            />
          </div>
        )}

        <div className="space-y-4">
          {isLoading && <p>Loading...</p>}
          {data?.orders.map((item) => {
            const { product } = item;
            return (
              <DetailCard
                key={item.bill_no}
                amount={item.amount}
                bill_no={item.bill_no}
                customer_name={item.customer_name}
                owner={item.store.owner}
                is_paid={item.is_paid}
                CreatedAt={item.CreatedAt}
                {...product}
              />
            );
          })}
        </div>
      </div>

      <FilterModal isOpen={isOpen} close={close} />
      <CalenderModal isOpen={isCalenderOpen} close={closeCalender} />
    </>
  );
};

export default DashboardHomePage;
