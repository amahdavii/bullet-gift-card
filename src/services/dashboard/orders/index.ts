import { http2 } from "@/services/httpService";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

//#region Get All Product List - Homepage API

export const getOrdersStore = (params?: OrdersStoreParams) =>
  http2.get<OrdersStoreResponse>("/orders/store", {
    params,
  });

export const useGetOrdersStore = (
  params?: OrdersStoreParams,
  options?: UseQueryOptions<OrdersStoreResponse>
): UseQueryResult<OrdersStoreResponse> => {
  return useQuery<OrdersStoreResponse>({
    queryKey: ["getOrdersStoreKey", params],
    queryFn: async () => {
      const { data } = await getOrdersStore(params);
      return data;
    },
    ...options,
  });
};

//#endregion

export const getDateRanges = () =>
  http2.get<DateOptionsResponse>("/orders/date-ranges");

export const useGetDateRanges = (
  options?: UseQueryOptions<DateOptionsResponse>
): UseQueryResult<DateOptionsResponse> => {
  return useQuery<DateOptionsResponse>({
    queryKey: ["getDateRangesKey"],
    queryFn: async () => {
      const { data } = await getDateRanges();
      return data;
    },
    ...options,
  });
};

export const getOrdersBillNo = (params?: OrderBillNoParams) =>
  http2.get<TGiftResponse>("/orders/bill-no", {
    params,
  });

export const useGetOrdersBillNo = (
  params?: OrderBillNoParams,
  options?: UseQueryOptions<TGiftResponse>
): UseQueryResult<TGiftResponse> => {
  return useQuery<TGiftResponse>({
    queryKey: ["TGiftResponseKey", params],
    queryFn: async () => {
      const { data } = await getOrdersBillNo(params);
      return data;
    },
    ...options,
  });
};

export const patchMarkOrderPaid = (id: number) =>
  http2.patch<TMarkPaidResponse>(`/orders/${id}/mark-paid`);

export const usePatchMarkOrderPaid = (
  options?: UseMutationOptions<TMarkPaidResponse, Error, number>
): UseMutationResult<TMarkPaidResponse, Error, number> => {
  return useMutation<TMarkPaidResponse, Error, number>({
    mutationFn: (id: number) => patchMarkOrderPaid(id).then((res) => res.data),
    ...options,
  });
};
