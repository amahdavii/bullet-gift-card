type OrdersStoreParams = {
  from_date?: string;
  to_date?: string;
  product_name?: string;
  period?: string;
};

type OrderBillNoParams = {
  bill_no: string;
};

interface Store {
  id: number;
  name: string;
  address: string;
  state: string;
  postal_code: string;
  owner: string;
  is_active: boolean;
}

interface Product {
  Id: number;
  CardId: string;
  Name: string;
  MinValue: string;
  MaxValue: string;
  Type: string;
  DenominationType: string;
  ImagePath: string;
  CurrencyCode: string;
}

interface Order {
  CreatedAt: string;
  Id: number;
  customer_name: string;
  bill_no: string;
  store_id: number;
  card_id: string;
  amount: string;
  is_paid: boolean;
  store: Store;
  product: Product;
}

interface OrdersStoreResponse {
  orders: Order[];
  total_purchase: number;
  total_orders: number;
  store_id: number | null;
  purchase_change_rate: {
    current_period: {
      from: string;
      to: string;
      total: number;
    };
    previous_period: {
      from: string;
      to: string;
      total: number;
    };
    change_amount: number;
    change_percentage: number;
    is_positive: boolean;
    trend: string;
  };
  order_count_change_rate: {
    current_period: {
      from: string;
      to: string;
      total: number;
    };
    previous_period: {
      from: string;
      to: string;
      total: number;
    };
    change_amount: number;
    change_percentage: number;
    is_positive: boolean;
    trend: string;
  };
  date_range: { from: string; to: string };
}

interface DateOption {
  value: string;
  label: string;
}

interface DateOptionsResponse {
  data: DateOption[];
}

type TProduct = {
  Id: number;
  CardId: string;
  Name: string;
  MinValue: string;
  MaxValue: string;
  ShortDescription: string;
  LongDescription: string;
  RedemptionNote: string;
  Type: string;
  DenominationType: string;
  ImageName: string;
  ImagePath: string;
  CurrencyCode: string;
};

type TGiftResponse = {
  Id: number;
  customer_name: string;
  bill_no: string;
  store_id: number;
  card_id: string;
  amount: string;
  customer_address: string;
  message: string;
  send_gateway: string;
  is_paid: boolean;
  eGifter_feedBack: string | null;
  CreatedAt: string;
  UpdatedAt: string;
  product: Product;
};

type MarkedOrderAsPaidParams = {
  id: number;
};

interface TMarkPaidResponse {
  message: string;
  order: unknown;
}

interface GetAllStoresResponse {
  id: number;
  name: string;
  address: string;
  state: string;
  postal_code: string;
  owner: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ICategoryDetailResponse {
  Id: number;
  Name: string;
  TagTypeId: number;
  isHome: boolean;
  "widget-order": number;
  IsDeleted: number;
  IsTop: number;
}

interface IGetStoreDetailResponse {
  id: number;
  name: string;
  address: string;
  state: string;
  postal_code: string;
  owner: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
