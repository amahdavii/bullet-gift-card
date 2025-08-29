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

interface PostProductOrderBody {
  cardId: string;
  amount: number;
  customerTel: string;
  sendGateway: string;
  receiverName: string;
  receiverAddress: string;
  message: string;
}

interface PostNewProductOrderBody {
  customerName: string;
  cardId: string;
  amount: number;
  receiverAddress: string;
  message: string;
  sendGateway: string;
}

interface PostNewProductOrderResponse {
  message: string;
  data: {
    customer_name: string;
    card_id: string;
    amount: string;
    customer_address: string;
    message: string;
    send_gateway: string;
    is_paid: boolean;
    bill_no: string;
    UpdatedAt: string;
    CreatedAt: string;
    Id: number;
  };
}
