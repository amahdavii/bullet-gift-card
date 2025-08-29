"use client";
import BasketSVG from "@/components/icons/BasketSVG";
import GiftSVG from "@/components/icons/GiftSVG";
import AmountSelector from "@/components/shared/AmountSelector";
import BottomSheetModal from "@/components/shared/BottomSheetModal";
import { Button } from "@/components/ui/Button";
import { useProduct } from "@/context/productContext";
import { useModalQuery } from "@/hooks/useModalQuery";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  close: () => void;
}

const SelectedCardModal: FC<Props> = ({ isOpen, close }) => {
  const { selectedProduct } = useProduct();
  const [amount, setAmount] = useState(0);
  const searchParams = useSearchParams();
  const amountParams = searchParams.get("amount");

  const { open: openSenderGift } = useModalQuery({
    modalValue: "sender-gift",
  });

  const { open: openSenderInfo } = useModalQuery({
    modalValue: "sender-info",
  });

  useEffect(() => {
    setAmount(0);
  }, [isOpen]);

  useEffect(() => {
    if (amountParams) {
      setAmount(Number(amountParams));
    } else {
      setAmount(0);
    }
  }, [isOpen, amountParams]);

  return (
    <BottomSheetModal isOpen={isOpen} onClose={close}>
      <div className="text-center mb-[3.5rem]">
        {selectedProduct?.imagePath && (
          <Image
            src={selectedProduct.imagePath}
            width={136}
            height={86}
            alt={selectedProduct?.name || "product image"}
            className="mx-auto"
          />
        )}
        <h2 className="mt-[0.5rem] text-[0.875rem] font-semibold">
          {selectedProduct?.name}
        </h2>
      </div>
      <AmountSelector
        amount={amount}
        setAmount={setAmount}
        min={selectedProduct?.minValue as number}
        max={selectedProduct?.maxValue as number}
      />
      <div className="flex space-x-[0.75rem] mt-[6.625rem]">
        <Button
          onClick={() => {
            openSenderGift({ amount, cardId: selectedProduct?.cardId });
          }}
          variant="outline"
          className="flex-1"
          disabled={!amount}
        >
          <GiftSVG />
          Gift
        </Button>
        <Button
          onClick={() =>
            openSenderInfo({ amount, cardId: selectedProduct?.cardId })
          }
          variant="outline"
          className="flex-1"
          disabled={!amount}
        >
          <BasketSVG />
          For My Own
        </Button>
      </div>
    </BottomSheetModal>
  );
};

export default SelectedCardModal;
