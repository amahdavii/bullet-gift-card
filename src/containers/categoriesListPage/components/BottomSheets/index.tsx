"use client";

import { FC } from "react";
import { useModalQuery } from "@/hooks/useModalQuery";
import QrCodeModal from "./QrCodeModal";
import SelectedCardModal from "./SelectedCardModal";
import SenderGiftModal from "./SenderGiftModal";
import SenderInfoModal from "./SenderInfoModal";

const BottomSheetManager: FC = () => {
  const qrCodeModal = useModalQuery({ modalValue: "qr-code" });
  const selectedCardModal = useModalQuery({ modalValue: "selected-card" });
  const senderGiftModal = useModalQuery({ modalValue: "sender-gift" });
  const senderInfoModal = useModalQuery({ modalValue: "sender-info" });

  return (
    <>
      <QrCodeModal isOpen={qrCodeModal.isOpen} close={qrCodeModal.close} />

      <SelectedCardModal
        isOpen={selectedCardModal.isOpen}
        close={selectedCardModal.close}
      />

      <SenderGiftModal
        isOpen={senderGiftModal.isOpen}
        close={senderGiftModal.close}
      />

      <SenderInfoModal
        isOpen={senderInfoModal.isOpen}
        close={senderInfoModal.close}
      />
    </>
  );
};

export default BottomSheetManager;
