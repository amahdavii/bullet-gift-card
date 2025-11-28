// import DownloadSVG from "@/components/icons/DownloadSVG";
import CloseSVG from "@/components/icons/CloseSVG";
import BottomSheetModal from "@/components/shared/BottomSheetModal";
// import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface Props {
  isOpen: boolean;
  close: () => void;
}
const TermsModal: FC<Props> = ({ isOpen, close }) => {
  const { back } = useRouter();
  return (
    <BottomSheetModal isOpen={isOpen} onClose={close}>
      <div className="flex flex-col justify-center space-y-[1.5rem] pb-[4rem]">
        <div className="flex items-center justify-between">
          <h2 className="text-[1rem] font-bold">
            BulletGiftCards Purchase Terms
          </h2>
          <span
            className="w-[26px] h-[26px] bg-[#F1F0F0] flex items-center justify-center rounded-full"
            onClick={() => back()}
          >
            <CloseSVG />
          </span>
        </div>

        <p>
          By sharing your email or phone number, you agree to receive the gift
          card details and relevant updates and offers from Bullet Gift{" "}
        </p>
      </div>
    </BottomSheetModal>
  );
};

export default TermsModal;
