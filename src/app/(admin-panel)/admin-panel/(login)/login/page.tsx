"use client";
import { Button } from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import useToast from "@/hooks/useToast";
import { useToken } from "@/hooks/useToken";
import { usePanelLogin } from "@/services/adminPanel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const AdminPanelLoginPage = () => {
  const toast = useToast();
  const { push } = useRouter();
  const { setToken, token } = useToken("panelAccessToken");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync, isPending } = usePanelLogin();

  const submitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    mutateAsync({
      email,
      password,
    })
      .then((res) => {
        setToken(res?.token);
        toast.success(res?.message);
        push("/admin-panel");
      })
      .catch((err) => toast.error(err?.message));
  };

  useEffect(() => {
    if (token) {
      push("/admin-panel");
    }
  }, [push, token]);

  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center bg-[#F4F6F8]">
      <form
        onSubmit={submitHandler}
        className="w-[400px] h-auto bg-white border border-gray-200 rounded-md p-4 flex flex-col items-center gap-6"
      >
        <Image
          src="/assets/images/logo.svg"
          width={156}
          height={137}
          alt="logo"
        />
        <TextField
          label="Email"
          id="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="Password"
          id="Password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          fullWidth
          type="submit"
          disabled={isPending || !Boolean(email) || !Boolean(password)}
        >
          Login
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default AdminPanelLoginPage;
