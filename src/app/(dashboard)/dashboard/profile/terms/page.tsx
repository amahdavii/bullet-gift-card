"use client";

import NarrowLeft from "@/components/icons/NarrowLeftSVG";
import IconButton from "@/components/ui/IconButton";
import { useRouter } from "next/navigation";

export default function TermsPage() {
  const { back } = useRouter();
  return (
    <div>
      <header className="bg-white flex justify-between items-center py-[0.875rem] px-[1.5rem]">
        <IconButton onClick={() => back()}>
          <NarrowLeft />
        </IconButton>
        <h3 className="font-semibold text-[#0C0A0C]">Terms & Conditions</h3>
        <span className="w-[1.5rem] h-[1.5rem]" />
      </header>

      <main className="mt-[0.5rem] bg-white h-[90vh] p-[1.5rem]">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </main>
    </div>
  );
}
