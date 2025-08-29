"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import LoginModal from "./components/LoginModal";
import { useModalQuery } from "@/hooks/useModalQuery";

export default function IntroPage() {
  const { open, isOpen, close } = useModalQuery({ modalValue: "login" });

  return (
    <>
      <div className="flex flex-col h-screen max-w-4xl mx-auto">
        <div className="relative h-[55vh] w-full">
          <Image
            src="/assets/images/brands.png"
            alt="brands image"
            className="object-cover"
            fill
          />
        </div>

        <div className="h-[45vh] px-[1.5rem] bg-white flex flex-col mt-[2.8125rem]">
          <div className="flex flex-col gap-[1rem] px-[1.125rem]">
            <h2 className="text-[1.375rem] font-semibold text-center">
              Gift Cards with more <br /> than 200 brands{" "}
            </h2>
            <p className="text-sm text-black text-center leading-[20px]">
              digital gift cards for every occasions. make your loved ones feel
              special instantly with their favorite brands
            </p>
          </div>
          <Button className="mt-[3rem]" onClick={() => open()}>
            Get started
          </Button>
        </div>
      </div>

      <LoginModal close={close} isOpen={isOpen} />
    </>
  );
}
