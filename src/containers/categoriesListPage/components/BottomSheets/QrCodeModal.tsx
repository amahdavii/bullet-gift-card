// import DownloadSVG from "@/components/icons/DownloadSVG";
import BottomSheetModal from "@/components/shared/BottomSheetModal";
import QRCodeGenerator from "@/components/shared/QRCodeGenerator";
// import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import React, { FC } from "react";

interface Props {
  isOpen: boolean;
  close: () => void;
}
const QrCodeModal: FC<Props> = ({ isOpen, close }) => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  return (
    <BottomSheetModal isOpen={isOpen} onClose={close}>
      <div className="flex flex-col items-center justify-center space-y-[1.5rem]">
        <h2 className="text-[1.375rem]">My QR Code</h2>
        {code ? <QRCodeGenerator value={code} /> : null}

        <p className="text-center">
          Present this QR code to the cashier to complete your purchase.
        </p>
        {/* <Button variant="outline" fullWidth>
          <DownloadSVG />
          Save
        </Button> */}
      </div>
    </BottomSheetModal>
  );
};

export default QrCodeModal;
