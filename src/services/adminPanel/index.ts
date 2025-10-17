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

export const getAllStores = () =>
  http3.get<GetAllStoresResponse[]>("/store/all");

export const useGetAllStores = (
  options?: UseQueryOptions<GetAllStoresResponse[]>
): UseQueryResult<GetAllStoresResponse[]> => {
  return useQuery<GetAllStoresResponse[]>({
    queryKey: ["getAllStoresKey"],
    queryFn: async () => {
      const { data } = await getAllStores();
      return data;
    },
    ...options,
  });
};

export const createCategory = (body: ICreateCategoryBody) =>
  http3.post<unknown>("/tags", body).then((res) => res.data);

export const useCreateCategory = (): UseMutationResult<
  unknown,
  unknown,
  ICreateCategoryBody
> => {
  return useMutation({
    mutationFn: createCategory,
  });
};

export const updateCategory = (body: Partial<ICreateCategoryBody>, id: string) =>
  http3.put<unknown>(`/tags/${id}`, body).then((res) => res.data);

export const useUpdateCategory = (
  id: string
): UseMutationResult<
  unknown,
  unknown,
  Partial<ICreateCategoryBody>
> => {
  return useMutation({
    mutationFn: (body: Partial<ICreateCategoryBody>) => updateCategory(body, id),
  });
};

export const getCategoryDetail = (id: string) =>
  http3.get<ICategoryDetailResponse>(`/tags/${id}`);

export const useGetCategoryDetail = (
  id: string,
  options?: UseQueryOptions<ICategoryDetailResponse>
): UseQueryResult<ICategoryDetailResponse> => {
  return useQuery<ICategoryDetailResponse>({
    queryKey: ["getCategoryDetailKey", id],
    queryFn: async () => {
      const { data } = await getCategoryDetail(id);
      return data;
    },
    ...options,
  });
};

export const getStoreDetail = (id: string) =>
  http3.get<IGetStoreDetailResponse>(`/store/${id}`);

export const useGetStoreDetail = (
  id: string,
  options?: UseQueryOptions<IGetStoreDetailResponse>
): UseQueryResult<IGetStoreDetailResponse> => {
  return useQuery<IGetStoreDetailResponse>({
    queryKey: ["getStoreDetailKey", id],
    queryFn: async () => {
      const { data } = await getStoreDetail(id);
      return data;
    },
    ...options,
  });
};

export const createUser = (body: ICreateUserBody) =>
  http3.post<ICreateUserResponse>("/users", body).then((res) => res.data);

export const useCreateUser = (): UseMutationResult<
  ICreateUserResponse,
  ICreateUserError,
  ICreateUserBody
> => {
  return useMutation({
    mutationFn: createUser,
  });
};

export const updateUser = (body: Partial<ICreateUserBody>, id: string) =>
  http3.put<ICreateUserResponse>(`/users/${id}`, body).then((res) => res.data);

export const useUpdateUser = (
  id: string
): UseMutationResult<
  ICreateUserResponse,
  ICreateUserError,
  Partial<ICreateUserBody>
> => {
  return useMutation({
    mutationFn: (body: Partial<ICreateUserBody>) => updateUser(body, id),
  });
};

export const deleteUser = (id: string) =>
  http3.delete(`/users/${id}`).then((res) => res.data);

export const useDeleteUser = (): UseMutationResult<
  unknown,
  unknown,
  string
> => {
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
  });
};

export const deleteStore = (id: string) =>
  http3.delete(`/store/${id}`).then((res) => res.data);

export const useDeleteStore = (): UseMutationResult<
  unknown,
  unknown,
  string
> => {
  return useMutation({
    mutationFn: (id: string) => deleteStore(id),
  });
};

export const deleteCategory = (id: string) =>
  http3.delete(`/tags/${id}`).then((res) => res.data);

export const useDeleteCategory = (): UseMutationResult<
  unknown,
  unknown,
  string
> => {
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
  });
};

export const getUserDetail = (id: string) =>
  http3.get<IGetUserDetailResponse>(`/users/${id}`);

export const useGetUserDetail = (
  id: string,
  options?: UseQueryOptions<IGetUserDetailResponse>
): UseQueryResult<IGetUserDetailResponse> => {
  return useQuery<IGetUserDetailResponse>({
    queryKey: ["getAllStoresKey", id],
    queryFn: async () => {
      const { data } = await getUserDetail(id);
      return data;
    },
    ...options,
  });
};

export const getUsaStates = () =>
  http3.get<Record<string, string>>(`/usa/states`);

export const useGetUsaStates = (
  options?: UseQueryOptions<Record<string, string>>
): UseQueryResult<Record<string, string>> => {
  return useQuery<Record<string, string>>({
    queryKey: ["getUsaStatesKey"],
    queryFn: async () => {
      const { data } = await getUsaStates();
      return data;
    },
    ...options,
  });
};

export const createStore = (body: ICreateStoreBody) =>
  http3.post<ICreateUserResponse>("/store", body).then((res) => res.data);

export const useCreateStore = (): UseMutationResult<
  ICreateUserResponse,
  ICreateUserError,
  ICreateStoreBody
> => {
  return useMutation({
    mutationFn: createStore,
  });
};

export const updateStore = (body: Partial<ICreateStoreBody>, id: string) =>
  http3.put<ICreateUserResponse>(`/store/${id}`, body).then((res) => res.data);

export const useUpdateStore = (
  id: string
): UseMutationResult<
  ICreateUserResponse,
  ICreateUserError,
  Partial<ICreateStoreBody>
> => {
  return useMutation({
    mutationFn: (body: Partial<ICreateStoreBody>) => updateStore(body, id),
  });
};
