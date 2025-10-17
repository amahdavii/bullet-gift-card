"use client";
import FilterSVG from "@/components/icons/admin-panel/FilterSVG";
import TransactionsTable from "@/components/shared/admin-panel/TransactionsTable";
import DateQueryPicker from "@/components/shared/DatePickerBox";
import Select from "@/components/ui/Select";
import { useGetAllStores } from "@/services/adminPanel";
import { useRouter, useSearchParams } from "next/navigation";

const TransactionsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: storesList } = useGetAllStores();
  const storeId = searchParams.get("storeId");

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
    <div>
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
      <TransactionsTable hasPagination={true} />
    </div>
  );
};

export default TransactionsPage;
