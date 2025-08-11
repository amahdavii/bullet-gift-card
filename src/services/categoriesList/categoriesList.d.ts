interface ProductItem {
  cardId: string;
  currencyCode: string;
  denominationType: string;
  id: number;
  imageName: string;
  imagePath: string;
  isDeleted: boolean;
  longDescription: string;
  maxValue: number;
  minValue: number;
  name: string;
  redemptionNote: string;
  shortDescription: string;
  type: string;
}

interface ProductsListResponse {
  id: number;
  name: string;
  products: ProductItem[] | [];
}

interface CategoryItem {
  id: number;
  name: string;
  tagTypeId: number;
  tagType: {
    id: number;
    name: string;
  };
  isTop: boolean;
  isDeleted: boolean;
}

type Categoryitems = CategoryItem[];

interface CategoryDetailResponse {
  message: string;
  tagId: number;
  count: number;
  data: ProductItem[];
}

interface SearchResponse {
  searchTerm: string;
  count: number;
  products: ProductItem[];
}

interface SearchParams {
  name: string;
}

interface SearchProductsResponse {
  searchTerm: string;
  count: number;
  products: ProductItem[];
}
