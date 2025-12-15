interface IStoreLoginBody {
  email: string;
  password: string;
}

interface ICreateProductTagBody {
  product_id: number;
  tag_id: number;
  sort: number | null;
}

interface ICreateProductTagResponse {
  Id: number;
  ProductId: nummber;
  TagId: number;
  sort: number;
  product: unknown;
  tag: unknown;
}

interface IStoreLoginResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
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
      is_active: boolean;
      created_at: string;
      updated_at: string;
    };
  };
  token: string;
  token_type: string;
}

interface ISendStoreOtpBody {
  email: string;
}

interface ISendStoreOtpResponse {
  message: string;
  email: string;
  expires_at: string;
}

interface IStoreResetPasswordBody {
  email: string;
  otp: string;
  new_password: string;
  new_password_confirmation: string;
}

interface IStoreChangePasswordBody {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

interface IStoreResetPasswordResponse {
  message: string;
}

interface IStoreChangePasswordResponse {
  message: "Password changed successfully";
  user: unknown;
}

interface IStoreChangePasswordErrorResponse {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

interface IStoreLogoutResponse {
  message: string;
}

interface ICreateCategoryBody {
  Name: string;
  TagTypeId: number;
  isHome: boolean;
  IsTop: boolean;
  "widget-order": number;
}

interface ICreateUserBody {
  name: string;
  email: string;
  password: string;
  phone: string;
  is_active: boolean;
  is_admin: boolean;
  store_id: number;
}

interface ICreateStoreBody {
  name: string | null;
  address: string;
  state: string;
  postal_code: string;
  owner: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  is_active: boolean;
  max_sale_credit?: number | null;
}

interface ICreateUserResponse {
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
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
}

interface ICreateUserError {
  message: string;
  errors?: Record<string, string[]>;
}
