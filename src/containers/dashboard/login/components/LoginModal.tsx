import React, { FC, useState } from "react";
import CloseSVG from "@/components/icons/CloseSVG";
import BottomSheetModal from "@/components/shared/BottomSheetModal";
import { Button } from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useStoreLogin } from "@/services/dashboard/login";
import { useToken } from "@/hooks/useToken";
import { useModalQuery } from "@/hooks/useModalQuery";
import ForgetModal from "./ForgetModal";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  close: () => void;
}
const LoginModal: FC<Props> = ({ isOpen, close }) => {
  const {
    open: openForget,
    isOpen: isOpenForget,
    close: closeForget,
  } = useModalQuery({ modalValue: "forget" });
  const { push } = useRouter();
  const { mutateAsync } = useStoreLogin();
  const { setToken } = useToken("accessToken");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    if (email && password) {
      mutateAsync({
        email,
        password,
      }).then((res) => {
        setToken(res.token);
        localStorage.setItem("email", res.user.email);
        localStorage.setItem("name", res.user.name);

        push("/dashboard");
      });
    } else {
      return;
    }
  };

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
            <p
              onClick={() => openForget()}
              className="text-[#D1AE82] font-semibold text-[0.75rem] mt-[0.5rem] cursor-pointer"
            >
              Forget Password?
            </p>
          </div>

          <Button
            fullWidth
            disabled={!email || !password}
            onClick={submitHandler}
          >
            Login
          </Button>
        </div>
      </BottomSheetModal>

      <ForgetModal isOpen={isOpenForget} close={closeForget} />
    </>
  );
};

export default LoginModal;
