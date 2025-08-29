"use client";
import { Button } from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useGetOrdersBillNo } from "@/services/dashboard/orders";
import { useEffect, useState } from "react";
import axios from "axios";
import ActiveCard from "@/components/shared/ActiveCard";

const DashBoardOrderPage = () => {
  const [billNo, setBillNo] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);

  const { isSuccess, refetch, data } = useGetOrdersBillNo(
    { bill_no: billNo },
    { enabled: false, retry: false }
  );

  useEffect(() => {
    setErrorMessage("");
    setSuccessMessage("");
  }, [billNo]);

  useEffect(() => {
    if (isActive) {
      setBillNo("");
    }
  }, [isActive]);

  const handleSubmit = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsActive(false);

    const res = await refetch();

    if (res.isError) {
      const err = res.error;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const axiosError = (err as any)?.originalError ?? err;

      if (axios.isAxiosError(axiosError)) {
        setErrorMessage(axiosError.response?.data?.message ?? "Unknown error");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    } else {
      setSuccessMessage("The card was successfully activated.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:pb-[6rem]">
      {/* Header ثابت */}
      <header className="bg-white flex justify-center items-center py-4 px-5 shadow-md sticky top-0 z-10">
        <h3 className="font-bold text-lg">Order</h3>
      </header>

      {/* Content قابل اسکرول */}
      <main className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
        <div className="bg-white p-4 rounded-md shadow-sm">
          <TextField
            id="Enter Qrcode id"
            label="Enter Qrcode id"
            clearable
            value={billNo}
            onChange={(e) => setBillNo(e.target.value)}
          />
        </div>

        <Button
          disabled={!billNo || billNo.length <= 20}
          onClick={handleSubmit}
        >
          Submit
        </Button>

        {/* پیام خطا */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {/* ActiveCard */}
        {isSuccess && !isActive && data && (
          <ActiveCard
            id={data?.Id as number}
            ImagePath={data?.product.ImagePath as string}
            Name={data?.product.Name as string}
            amount={data?.amount as string}
            customer_name={data?.customer_name as string}
            isPaid={data?.is_paid as boolean}
            setIsActive={setIsActive}
          />
        )}

        {/* پیام موفقیت بعد از فعال شدن */}
        {isActive && <p className="text-green-500">{successMessage}</p>}
      </main>
    </div>
  );
};

export default DashBoardOrderPage;
