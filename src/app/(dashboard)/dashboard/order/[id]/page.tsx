"use client";

import { use, useEffect, useState } from "react";
import { useGetOrdersBillNo } from "@/services/dashboard/orders";
import ActiveCard from "@/components/shared/ActiveCard";
import { useToken } from "@/hooks/useToken";
import { useRouter } from "next/navigation";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params); // unwrap the Promise
  const [isLoaded, setIsLoaded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { replace } = useRouter();
  const { data, isError, isSuccess, isLoading } = useGetOrdersBillNo(
    {
      bill_no: resolvedParams.id,
    },
    {
      enabled: !!resolvedParams.id,
      retry: false,
    }
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const { token } = useToken();

  useEffect(() => {
    if (!token && isLoaded) {
      replace("/login");
    }
  }, [isLoaded, replace, token]);

  return (
    <>
      <header className="flex justify-center items-center py-[1rem] bg-white">
        <h2 className="font-semibold text-[1rem]">Order</h2>
      </header>
      <div className="py-[2.375rem] px-[1.5rem]">
        {isLoading && <p>Loading...</p>}

        {isError && <p>There is no card to activate.</p>}

        {isSuccess && !isActive && (
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

        {isActive && (
          <p className="text-green-500">The card was successfully activated.</p>
        )}
      </div>
    </>
  );
}
