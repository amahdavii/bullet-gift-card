interface IGetChartResponse {
  month: string;
  month_name: string;
  total_amount: number;
  order_count: number;
}

interface IChartData {
  name: string;
  amount: number;
  orders: number;
}

type GetAllOrdersParams = {
  per_page?: number;
  page?: number;
  store_id?: number;
  user_id?: number;
  card_id?: string;
  is_paid?: boolean;
  min_amount?: number;
  max_amount?: number;
  start_date?: string;
  end_date?: string;
  customer_name?: string;
  bill_no?: string;
};

type GetAllOrdersResponse = {
  current_page: number;
  data: [
    {
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
      eGifter_feedBack: {
        id: string;
        cost: number;
        theme: string;
        value: number;
        status: string;
        culture: string;
        quantity: number;
        claimData: [
          {
            id: string;
            claimLink: string;
            claimLinkChallengeAnswer: string;
          }
        ];
        productId: string;
        brandingId: string;
        personalization: {
          to: string;
          message: string;
          fromName: string;
          fromEmail: string;
          deliveryDate: string;
        };
      };
      CreatedAt: string;
      UpdatedAt: string;
      store: {
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
      };
      product: {
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
      user: null;
    }
  ];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [
    {
      url: string;
      label: string;
      page: number;
      active: boolean;
    }
  ];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
};

type GetAllUsersResponse = {
  current_page: number;
  data: [
    {
      phone: string;
      amount: string;
      id: number;
      name: string;
      email: string;
      is_admin: boolean;
      is_active: boolean;
      email_verified_at: string;
      created_at: string;
      updated_at: string;
      store_id: number;
      store: {
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
      };
    }
  ];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [
    {
      url: string;
      label: string;
      page: number;
      active: boolean;
    }
  ];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
};

interface GetAllUsersParams {
  per_page?: number;
  page?: number;
  name?: string;
  email?: string;
  phone?: string;
  store_id?: number;
  is_admin?: boolean;
  is_active?: boolean;
  email_verified?: boolean;
  sort_by?: string;
  sort_order?: string;
}

interface GetAllStoreParams {
  name?: string;
  state?: string;
  owner?: string;
  is_active?: boolean;
  country?: string;
  city?: string;
  email?: string;
  per_page?: number;
  page?: number;
}

type GetAllStoreResponse = {
  current_page: number;
  data: [
    {
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
  ];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [
    {
      url: string;
      label: string;
      page: number;
      active: boolean;
    }
  ];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
};

interface GetAllProductsParams {
  type?: string;
  denomination_type?: string;
  currency_code?: string;
  min_price?: number;
  max_price?: number;
  active_only?: boolean;
  tag_id?: number;
  name?: string;
  min_value?: number;
  max_value?: number;
  deleted_only?: boolean;
  tag_ids?: string;
  tag_name?: string;
  card_id?: string;
  short_description?: string;
  long_description?: string;
  has_image?: boolean;
  sort_by?: string;
  sort_order?: string;
  per_page?: number;
  page?: number;
}

type GetAllProductsResponse = {
  current_page: number;
  data: [
    {
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
      tags: [
        {
          Id: number;
          Name: string;
          TagTypeId: number;
          isHome: boolean;
          "widget-order": null;
          IsDeleted: number;
          IsTop: number;
          pivot: {
            ProductId: number;
            TagId: number;
          };
        }
      ];
      product_tags: [
        {
          Id: number;
          ProductId: number;
          TagId: number;
        }
      ];
    }
  ];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [
    {
      url: string;
      label: string;
      page: number;
      active: boolean;
    }
  ];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
};

interface GetAllCategoriesParams {
  name?: string;
  tag_type_id?: number;
  is_home?: boolean;
  order_by_widget?: boolean;
}

type GetAllCategoriesResponse = {
  Id: number;
  Name: string;
  TagTypeId: number;
  isHome: boolean;
  "widget-order": null;
  IsDeleted: number;
  IsTop: number;
};

interface IGetUserDetailResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_active: boolean;
  is_admin: boolean;
  email_verified_at: string;
  store_id: number;
  created_at: string;
  updated_at: string;
  store: {
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
  };
}
