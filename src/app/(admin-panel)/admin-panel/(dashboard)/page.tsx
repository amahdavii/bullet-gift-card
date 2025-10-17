"use client";
import ReportCard from "@/components/shared/admin-panel/ReportCard";
import TransactionsTable from "@/components/shared/admin-panel/TransactionsTable";
import { useGetAllStores, useGetOrdersStore } from "@/services/adminPanel";
import { MonthlyOrdersChart } from "../../components/MonthlyOrdersChart";
import FilterSVG from "@/components/icons/admin-panel/FilterSVG";
import Select from "@/components/ui/Select";
import { useRouter, useSearchParams } from "next/navigation";
import DateQueryPicker from "@/components/shared/DatePickerBox";
import { useMemo } from "react";

const AdminPanelPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const storeId = searchParams.get("storeId");
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  const queryParams = useMemo(() => {
    return {
      from_date: startDate || "",
      to_date: endDate || "",
      product_name: "",
      ...(storeId ? { store_id: Number(storeId) } : {}),
    };
  }, [storeId, startDate, endDate]);

  const { data, isLoading } = useGetOrdersStore(queryParams);
  const { data: storesList } = useGetAllStores();

  const storeOptions = storesList?.map((store) => ({
    label: store.name,
    value: store.id.toString(),
  }));

  const handleSelectChange = (value: string | string[] | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Array.isArray(value)) {
      params.set("storeIds", value.join(","));
    } else if (value) {
      params.set("storeId", value);
    } else {
      params.delete("storeIds");
      params.delete("storeId");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-12">
      {/* فیلترها */}
      <div className="flex items-center justify-between gap-7">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <FilterSVG />
            <span>Filter</span>
          </div>
          <Select
            label="Store"
            options={storeOptions || []}
            onChange={handleSelectChange}
            value={storeId || ""}
          />
        </div>

        <div className="flex items-center gap-7">
          <DateQueryPicker
            queryKey="start_date"
            placeholder="Start date"
            otherDateKey="end_date"
            isStart={true}
          />
          <DateQueryPicker
            queryKey="end_date"
            placeholder="End date"
            otherDateKey="start_date"
            isStart={false}
          />
        </div>
      </div>

      {/* کارت‌های گزارش */}
      <div className="flex items-center justify-between gap-x-6">
        <ReportCard
          title="Transactions"
          value={data?.total_purchase ?? 0}
          state={data?.purchase_change_rate.trend ?? "up"}
          percentage={data?.purchase_change_rate.change_percentage ?? 0}
          price
          isLoading={isLoading}
        />

        <ReportCard
          title="Total Sales"
          value={data?.total_orders ?? 0}
          state={data?.order_count_change_rate.trend ?? "up"}
          percentage={data?.order_count_change_rate.change_percentage ?? 0}
          isLoading={isLoading}
        />

        <ReportCard
          title="Gift Card Activated"
          value={data?.total_orders ?? 0}
          state={data?.order_count_change_rate.trend ?? "up"}
          percentage={data?.order_count_change_rate.change_percentage ?? 0}
          isLoading={isLoading}
        />
      </div>

      {/* نمودار فروش ماهانه */}
      <div className="flex w-full">
        <div className="bg-white p-[28px] rounded-2xl shadow-[0px_-2px_8px_0px_#BAB9BA1A,_0px_2px_8px_0px_#BAB9BA1A] flex flex-col gap-8 w-full">
          <h2 className="font-semibold text-[20px]">Sales Overview</h2>
          <MonthlyOrdersChart />
        </div>
      </div>

      {/* جدول تراکنش‌ها */}
      <TransactionsTable />
    </div>
  );
};

export default AdminPanelPage;
