interface IStoreLoginBody {
  email: string;
  password: string;
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
