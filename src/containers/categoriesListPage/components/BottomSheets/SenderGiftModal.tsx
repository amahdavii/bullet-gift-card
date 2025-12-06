import ChevronLeftSVG from "@/components/icons/ChevronLeftSVG";
import ChevronRightSVG from "@/components/icons/ChevronRightSVG";
import EmailSVG from "@/components/icons/EmailSVG";
import SmsSVG from "@/components/icons/SmsSVG";
import WhatsappSVG from "@/components/icons/WhatsappSVG";
import BottomSheetModal from "@/components/shared/BottomSheetModal";
import { Button } from "@/components/ui/Button";
import ClearableInput from "@/components/ui/ClearableInput";
import TextAreaField from "@/components/ui/TextArea";
import TextField from "@/components/ui/TextField";
import { useModalQuery } from "@/hooks/useModalQuery";
import { usePostNewProductOrder } from "@/services/categoriesList";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { FC, useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  close: () => void;
}

type SendItem = "whatsapp" | "email" | "sms";

const SenderGiftModal: FC<Props> = ({ isOpen, close }) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") ?? 0;
  const title = searchParams.get("title");
  const cardId = searchParams.get("cardId") ?? "";

  const pathname = usePathname();
  const params = useParams();
  const { id } = params;

  const isCategoryPage = pathname.includes("/category");

  const { mutateAsync: mutateProduct } = usePostNewProductOrder();
  const { open: openQrCode } = useModalQuery({ modalValue: "qr-code" });
  // const { open: openTerms } = useModalQuery({ modalValue: "terms" });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [sendItem, setSendItem] = useState<SendItem | null>(null);
  const [recieveItem, setRecieveItem] = useState<string>("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFirstName("");
      setLastName("");
      setMessage("");
      setSendItem(null);
      setRecieveItem("");
      setAcceptedTerms(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!sendItem) setRecieveItem("");
  }, [sendItem]);

  return (
    <BottomSheetModal isOpen={isOpen} onClose={close}>
      {/* Sender Info */}
      <div className="space-y-[1.5rem]">
        <TextField
          label="Sender First Name"
          value={firstName}
          id="sender"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Sender Last Name (optional)"
          value={lastName}
          id="sender-lastname"
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextAreaField
          id="message"
          label="Message (optional)"
          placeholder="Write a personal message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* Receive Options */}
      <div className="mt-[2.625rem] space-y-[1rem]">
        {sendItem === "whatsapp" ? (
          <ClearableInput
            id="Whatsapp"
            label="Whatsapp"
            inputMode="numeric"
            value={recieveItem}
            setValue={setRecieveItem}
          />
        ) : (
          <Button
            variant="primary"
            fullWidth
            disabled={!firstName}
            onClick={() => setSendItem("whatsapp")}
          >
            <WhatsappSVG /> Receive By WhatsApp
          </Button>
        )}

        {sendItem === "email" ? (
          <ClearableInput
            id="email"
            label="Email"
            inputMode="email"
            value={recieveItem}
            setValue={setRecieveItem}
          />
        ) : (
          <Button
            variant="primary"
            fullWidth
            disabled={!firstName}
            onClick={() => setSendItem("email")}
          >
            <EmailSVG /> Receive By Email
          </Button>
        )}

        {sendItem === "sms" ? (
          <ClearableInput
            id="Sms"
            label="Sms"
            inputMode="numeric"
            value={recieveItem}
            setValue={setRecieveItem}
          />
        ) : (
          <Button
            variant="primary"
            fullWidth
            disabled={!firstName}
            onClick={() => setSendItem("sms")}
          >
            <SmsSVG /> Receive By SMS
          </Button>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-[0.75rem] mt-[3.5rem]">
        <Button
          variant="outline"
          onClick={() =>
            push(
              isCategoryPage
                ? `/category/${id}/?title=${title}&modal=selected-card&amount=${amount}`
                : `/?modal=selected-card&amount=${amount}`
            )
          }
        >
          <ChevronLeftSVG /> Back
        </Button>
        <Button
          className="flex-1"
          disabled={!firstName || !sendItem || !recieveItem || !acceptedTerms} // چک‌باکس هم بررسی شد
          onClick={() => {
            mutateProduct({
              amount: Number(amount),
              cardId: cardId,
              message: message ?? "",
              sendGateway: sendItem ?? "",
              receiverAddress: recieveItem ?? "",
              customerName:
                firstName && lastName ? `${firstName} ${lastName}` : firstName,
            }).then((res) => openQrCode({ code: res.data.bill_no }));
          }}
        >
          Purchase
          <ChevronRightSVG
            color={
              !firstName || !sendItem || !recieveItem || !acceptedTerms
                ? "#979698"
                : "#fff"
            }
          />
        </Button>
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-center gap-2 mt-5 justify-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="accent-black w-5 h-5"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <p className="text-[#525153] text-sm">
            {/* I agree to re read and agree to the{" "}
            <span
              className="text-[#E0DA3E] font-semibold cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault(); // جلوگیری از تغییر چک‌باکس
                openTerms(); // باز کردن modal Terms
              }}
            >
              Purchase Terms
            </span> */}
            I agree to receive SMS messages for the purchased gift card.
          </p>
        </label>
      </div>
    </BottomSheetModal>
  );
};

export default SenderGiftModal;
