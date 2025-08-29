import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { http2 } from "@/services/httpService";

//#region Post Store Login

export const storeLogin = (body: IStoreLoginBody) =>
  http2.post<IStoreLoginResponse>("/store/login", body).then((res) => res.data);

export const useStoreLogin = (): UseMutationResult<
  IStoreLoginResponse,
  unknown,
  IStoreLoginBody
> => {
  return useMutation({
    mutationFn: storeLogin,
  });
};

//#endregion

//#region Post Send Store OTP

export const sendStoreOtp = (body: ISendStoreOtpBody) =>
  http2.post<ISendStoreOtpResponse>("/store/otp", body).then((res) => res.data);

export const useSendStoreOtp = (): UseMutationResult<
  ISendStoreOtpResponse,
  unknown,
  ISendStoreOtpBody
> => {
  return useMutation({
    mutationFn: sendStoreOtp,
  });
};

//#endregion

//#region Post Store Reset Password

export const storeResetPassword = (body: IStoreResetPasswordBody) =>
  http2
    .post<IStoreResetPasswordResponse>("/store/reset-password", body)
    .then((res) => res.data);

export const useStoreResetPassword = (): UseMutationResult<
  IStoreResetPasswordResponse,
  unknown,
  IStoreResetPasswordBody
> => {
  return useMutation({
    mutationFn: storeResetPassword,
  });
};

//#endregion

//#region Store logout

export const storeLogout = () =>
  http2.post<IStoreLogoutResponse>("/store/logout").then((res) => res.data);

export const useStoreLogout = (): UseMutationResult<
  IStoreLogoutResponse,
  unknown,
  unknown
> => {
  return useMutation({
    mutationFn: storeLogout,
  });
};

//#endregion

//#region Store Change Password

export const storeChangePassword = (body: IStoreChangePasswordBody) =>
  http2
    .post<IStoreChangePasswordResponse>("/store/change-password", body)
    .then((res) => res.data);

export const useStoreChangePassword = (
  options?: UseMutationOptions<
    IStoreChangePasswordResponse,
    IStoreChangePasswordErrorResponse,
    IStoreChangePasswordBody
  >
) => {
  return useMutation<
    IStoreChangePasswordResponse,
    IStoreChangePasswordErrorResponse,
    IStoreChangePasswordBody
  >({
    mutationFn: storeChangePassword,
    ...options,
  });
};

//#endregion
