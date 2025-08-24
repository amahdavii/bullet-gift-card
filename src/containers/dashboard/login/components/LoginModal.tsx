import React, { FC, useState } from "react";
import CloseSVG from "@/components/icons/CloseSVG";
import BottomSheetModal from "@/components/shared/BottomSheetModal";
import { Button } from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

interface Props {
  isOpen: boolean;
  close: () => void;
}
const LoginModal: FC<Props> = ({ isOpen, close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <BottomSheetModal isOpen={isOpen} onClose={close} height="75vh">
        <div className="flex flex-col justify-between h-full ">
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-[1.375rem] font-semibold">Login</h3>
              <button
                className="w-[1.625rem] h-[1.625rem] flex justify-center items-center rounded-full bg-[#F1F0F0]"
                onClick={() => close()}
              >
                <CloseSVG />
              </button>
            </div>

            <div className="flex flex-col gap-[0.875rem] mt-[3rem]">
              <TextField
                label="Email"
                value={email}
                id="email"
                onChange={(event) => setEmail(event.target.value)}
              />

              <TextField
                label="Password"
                value={password}
                id="password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <Button fullWidth>Login</Button>
        </div>
      </BottomSheetModal>
    </>
  );
};

export default LoginModal;
