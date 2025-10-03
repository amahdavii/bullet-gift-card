"use client";
import ReportCard from "@/components/shared/admin-panel/ReportCard";
import TransactionsTable from "@/components/shared/admin-panel/TransactionsTable";
import { useGetAllOrders, useGetOrdersStore } from "@/services/adminPanel";
import { MonthlyOrdersChart } from "../../components/MonthlyOrdersChart";

const AdminPanelPage = () => {
  const { data, isLoading } = useGetOrdersStore();
  const { data: transitionData } = useGetAllOrders();
  console.log("transitionData ==>", transitionData);

  return (
    <div className="flex flex-col gap-12">
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
      <div className="flex w-full">
        <div className="bg-white p-[28px] rounded-2xl shadow-[0px_-2px_8px_0px_#BAB9BA1A,_0px_2px_8px_0px_#BAB9BA1A] flex flex-col gap-8 w-full">
          <h2 className="font-semibold text-[20px]">Sales Overview</h2>
          <MonthlyOrdersChart />
        </div>
      </div>

      <TransactionsTable  />
    </div>
  );
};

export default AdminPanelPage;
