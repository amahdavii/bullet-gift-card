"use client";
import { NextPage } from "next";
import IntroPage from "@/containers/dashboard/login";
import { useRouter } from "next/navigation";
import { useToken } from "@/hooks/useToken";
import { useEffect } from "react";

const LoginPage: NextPage = () => {
  const { push } = useRouter();
  const { token } = useToken();

  useEffect(() => {
    if (token) {
      push("/dashboard");
    }
  }, [token, push]);

  return <IntroPage />;
};

export default LoginPage;
