import React, { FC, useState } from "react";
import CloseSVG from "@/components/icons/CloseSVG";
import BottomSheetModal from "@/components/shared/BottomSheetModal";
import { Button } from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useModalQuery } from "@/hooks/useModalQuery";
import ResetModal from "./ResetModal";

interface Props {
  isOpen: boolean;
  close: () => void;
}
const ForgetModal: FC<Props> = ({ isOpen, close }) => {
  const {
    open: openReset,
    isOpen: isOpenReset,
    close: closeReset,
  } = useModalQuery({ modalValue: "reset" });

  const [email, setEmail] = useState("");

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
            <p className="mb-[2.6875rem] mt-[3rem] text-[0.875rem]">
              Enter your email and we’ll send you a one‑time code to reset your
              password.
            </p>
            <div className="flex flex-col gap-[0.875rem]">
              <TextField
                label="Email"
                value={email}
                id="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <Button
            fullWidth
            disabled={!email}
            onClick={() => openReset({ email })}
          >
            Send
          </Button>
        </div>
      </BottomSheetModal>

      <ResetModal isOpen={isOpenReset} close={closeReset} />
    </>
  );
};

export default ForgetModal;
