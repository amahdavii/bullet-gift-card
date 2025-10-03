import { http3 } from "@/services/httpService";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

//#region Post Store Login

export const panelLogin = (body: IStoreLoginBody) =>
  http3.post<IStoreLoginResponse>("/admin/login", body).then((res) => res.data);

export const usePanelLogin = (): UseMutationResult<
  IStoreLoginResponse,
  unknown,
  IStoreLoginBody
> => {
  return useMutation({
    mutationFn: panelLogin,
  });
};

//#endregion

//#region Get All Product List - Homepage API

export const getOrdersStore = (params?: OrdersStoreParams) =>
  http3.get<OrdersStoreResponse>("/orders/store", {
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

export const getChartData = () =>
  http3.get<IGetChartResponse[]>("/orders/monthly-paid-amounts");

export const useGetChartData = (
  options?: UseQueryOptions<IGetChartResponse[], Error, IChartData[]>
): UseQueryResult<IChartData[], Error> => {
  return useQuery<IGetChartResponse[], Error, IChartData[]>({
    queryKey: ["getChartDataKey"],
    queryFn: async () => {
      const { data } = await getChartData();
      return data;
    },
    select: (rawData) =>
      rawData.map((item) => ({
        name: item.month_name,
        amount: item.total_amount,
        orders: item.order_count,
      })),
    ...options,
  });
};

export const getAllOrders = (params?: GetAllOrdersParams) =>
  http3.get<GetAllOrdersResponse>("/orders", {
    params,
  });

export const useGetAllOrders = (
  params?: GetAllOrdersParams,
  options?: UseQueryOptions<GetAllOrdersResponse>
): UseQueryResult<GetAllOrdersResponse> => {
  return useQuery<GetAllOrdersResponse>({
    queryKey: ["getAllOrdersKey", params],
    queryFn: async () => {
      const { data } = await getAllOrders(params);
      return data;
    },
    ...options,
  });
};

export const getAllUsers = (params?: GetAllUsersParams) =>
  http3.get<GetAllUsersResponse>("/users", {
    params,
  });

export const useGetAllUsers = (
  params?: GetAllUsersParams,
  options?: UseQueryOptions<GetAllUsersResponse>
): UseQueryResult<GetAllUsersResponse> => {
  return useQuery<GetAllUsersResponse>({
    queryKey: ["getAllUsersKet", params],
    queryFn: async () => {
      const { data } = await getAllUsers(params);
      return data;
    },
    ...options,
  });
};

export const getStoreList = (params?: GetAllStoreParams) =>
  http3.get<GetAllStoreResponse>("/store", {
    params,
  });

export const useGetStoreList = (
  params?: GetAllStoreParams,
  options?: UseQueryOptions<GetAllStoreResponse>
): UseQueryResult<GetAllStoreResponse> => {
  return useQuery<GetAllStoreResponse>({
    queryKey: ["getStoreListKey", params],
    queryFn: async () => {
      const { data } = await getStoreList(params);
      return data;
    },
    ...options,
  });
};

export const getAllProducts = (params?: GetAllProductsParams) =>
  http3.get<GetAllProductsResponse>("/products", {
    params,
  });

export const useGetAllProducts = (
  params?: GetAllProductsParams,
  options?: UseQueryOptions<GetAllProductsResponse>
): UseQueryResult<GetAllProductsResponse> => {
  return useQuery<GetAllProductsResponse>({
    queryKey: ["getAllProductsKey", params],
    queryFn: async () => {
      const { data } = await getAllProducts(params);
      return data;
    },
    ...options,
  });
};

export const getAllCategories = (params?: GetAllCategoriesParams) =>
  http3.get<GetAllCategoriesResponse[]>("/tags", {
    params,
  });

export const useGetAllCategories = (
  params?: GetAllCategoriesParams,
  options?: UseQueryOptions<GetAllCategoriesResponse[]>
): UseQueryResult<GetAllCategoriesResponse[]> => {
  return useQuery<GetAllCategoriesResponse[]>({
    queryKey: ["getAllCategoriesKey", params],
    queryFn: async () => {
      const { data } = await getAllCategories(params);
      return data;
    },
    ...options,
  });
};
