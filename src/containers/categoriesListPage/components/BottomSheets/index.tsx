"use client";

import { FC } from "react";
import { useModalQuery } from "@/hooks/useModalQuery";
import QrCodeModal from "./QrCodeModal";
import SelectedCardModal from "./SelectedCardModal";
import SenderGiftModal from "./SenderGiftModal";
import SenderInfoModal from "./SenderInfoModal";
import TermsModal from "./TermsModal";
import AssignCategoryModal from "@/app/(admin-panel)/admin-panel/(dashboard)/product/components/Modals/AssignCategoryModal";

const BottomSheetManager: FC = () => {
  const qrCodeModal = useModalQuery({ modalValue: "qr-code" });
  const selectedCardModal = useModalQuery({ modalValue: "selected-card" });
  const senderGiftModal = useModalQuery({ modalValue: "sender-gift" });
  const senderInfoModal = useModalQuery({ modalValue: "sender-info" });
  const termsModal = useModalQuery({ modalValue: "terms" });
  const assignModal = useModalQuery({ modalValue: "assign" });

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

      <TermsModal isOpen={termsModal.isOpen} close={termsModal.close} />

      <AssignCategoryModal
        isOpen={assignModal.isOpen}
        close={assignModal.close}
      />
    </>
  );
};

export default BottomSheetManager;
