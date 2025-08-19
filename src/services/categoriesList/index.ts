import http from "../httpService";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

//#region Get All Product List - Homepage API

export const getAllProductList = () =>
  http.get<ProductsListResponse[]>("/Product/home");

export const useGetAllProductList = (): UseQueryResult<
  ProductsListResponse[]
> => {
  return useQuery<ProductsListResponse[]>({
    queryKey: ["getAllProductListKey"],
    queryFn: async () => {
      const { data } = await getAllProductList();
      return data;
    },
  });
};

//#endregion

//#region Get All Gategories List

export const getAllCategoriesList = () =>
  http.get<Categoryitems>("/Product/TOP");

export const useGetAllCategoriesList = (): UseQueryResult<Categoryitems> => {
  return useQuery<Categoryitems>({
    queryKey: ["getAllCategoriesListKey"],
    queryFn: async () => {
      const { data } = await getAllCategoriesList();
      return data;
    },
  });
};

//#endregion

//#region Get Category Item

export const getCategoryItem = (id: string) =>
  http.get<CategoryDetailResponse>(`/Tag/${id}/products`);

export const useGetCategoryItem = (
  id: string,
  options?: UseQueryOptions<CategoryDetailResponse>
): UseQueryResult<CategoryDetailResponse> => {
  return useQuery<CategoryDetailResponse>({
    queryKey: ["getCategoryItemKey", id],
    queryFn: async () => {
      const { data } = await getCategoryItem(id);
      return data;
    },
    ...options,
  });
};

//#endregion

//#region Post Category Item

export const postProductOrder = (body: PostProductOrderBody) =>
  http.post<string>("/Product/Order", body).then((res) => res.data);

export const usePostProductOrder = (): UseMutationResult<
  string,
  unknown,
  PostProductOrderBody
> => {
  return useMutation({
    mutationFn: postProductOrder,
  });
};

//#endregion

export const searchProducts = (name: string) => {
  return http.get<SearchProductsResponse>(`/Product/search`, {
    params: { name },
  });
};

export const useSearchProducts = (
  name: string,
  options?: UseQueryOptions<SearchProductsResponse>
): UseQueryResult<SearchProductsResponse> => {
  return useQuery<SearchProductsResponse>({
    queryKey: ["searchProducts", name],
    queryFn: async () => {
      const { data } = await searchProducts(name);
      return data;
    },
    enabled: name.length >= 2,
    ...options,
  });
};
