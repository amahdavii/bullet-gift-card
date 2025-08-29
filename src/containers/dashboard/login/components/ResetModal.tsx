import React, { FC, useState } from "react";
import CloseSVG from "@/components/icons/CloseSVG";
import BottomSheetModal from "@/components/shared/BottomSheetModal";
import { Button } from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useRouter, useSearchParams } from "next/navigation";
import { useStoreResetPassword } from "@/services/dashboard/login";

interface Props {
  isOpen: boolean;
  close: () => void;
}
const ResetModal: FC<Props> = ({ isOpen, close }) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const emailParams = searchParams.get("email");

  const { mutateAsync } = useStoreResetPassword();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = () => {
    mutateAsync({
      email: emailParams as string,
      new_password: password,
      new_password_confirmation: confirmPassword,
      otp,
    }).then(() => replace("/login"));
  };

  return (
    <>
      <BottomSheetModal isOpen={isOpen} onClose={close} height="75vh">
        <div className="flex flex-col justify-between h-full ">
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-[1.375rem] font-semibold">Reset Password</h3>
              <button
                className="w-[1.625rem] h-[1.625rem] flex justify-center items-center rounded-full bg-[#F1F0F0]"
                onClick={() => close()}
              >
                <CloseSVG />
              </button>
            </div>

            <div className="flex flex-col gap-[0.875rem] mt-[3rem]">
              <TextField
                label="OTP"
                value={otp}
                id="otp"
                onChange={(event) => setOtp(event.target.value)}
              />

              <TextField
                label="New Password"
                value={password}
                id="password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />

              <TextField
                label="Confirm New Password"
                value={confirmPassword}
                id="confirm-password"
                type="password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
          </div>

          <Button
            fullWidth
            disabled={!password || !confirmPassword || !otp}
            onClick={submitHandler}
          >
            Send
          </Button>
        </div>
      </BottomSheetModal>
    </>
  );
};

export default ResetModal;
