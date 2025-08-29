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
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

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

  const { open: openQrCode } = useModalQuery({
    modalValue: "qr-code",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const [sendItem, setSendItem] = useState<SendItem | null>(null);
  const [recieveItem, setRecieveItem] = useState<string>("");

  useEffect(() => {
    if (!isOpen) {
      setFirstName("");
      setLastName("");
      setRecieveItem("");
      setSendItem(null);
      setMessage("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!sendItem) {
      setRecieveItem("");
    }
  }, [sendItem]);

  useEffect(() => {
    setRecieveItem("");
  }, [sendItem]);

  return (
    <BottomSheetModal isOpen={isOpen} onClose={close}>
      <div className="space-y-[1.5rem]">
        <TextField
          label="Sender First Name"
          value={firstName}
          id="sender"
          onChange={(event) => setFirstName(event.target.value)}
        />

        <TextField
          label="Sender Last Name (optional)"
          value={lastName}
          id="sender lastname"
          onChange={(event) => setLastName(event.target.value)}
        />

        <TextAreaField
          id="message"
          label="Message (optional)"
          placeholder="Write a personal message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      <div className="mt-[2.625rem] space-y-[1rem]">
        {sendItem === "whatsapp" ? (
          <ClearableInput
            inputMode="numeric"
            value={recieveItem}
            setValue={setRecieveItem}
            setClear={setSendItem as Dispatch<SetStateAction<null>>}
          />
        ) : (
          <Button
            variant="primary"
            fullWidth
            disabled={!firstName}
            onClick={() => setSendItem("whatsapp")}
          >
            <WhatsappSVG />
            Receive By WhatsApp
          </Button>
        )}

        {sendItem === "email" ? (
          <ClearableInput
            inputMode="email"
            value={recieveItem}
            setValue={setRecieveItem}
            setClear={setSendItem as Dispatch<SetStateAction<null>>}
          />
        ) : (
          <Button
            variant="primary"
            fullWidth
            disabled={!firstName}
            onClick={() => setSendItem("email")}
          >
            <EmailSVG />
            Receive By Email
          </Button>
        )}

        {sendItem === "sms" ? (
          <ClearableInput
            inputMode="numeric"
            value={recieveItem}
            setValue={setRecieveItem}
            setClear={setSendItem as Dispatch<SetStateAction<null>>}
          />
        ) : (
          <Button
            variant="primary"
            fullWidth
            disabled={!firstName}
            onClick={() => setSendItem("sms")}
          >
            <SmsSVG />
            Receive By SMS
          </Button>
        )}
      </div>

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
          <ChevronLeftSVG />
          Back
        </Button>
        <Button
          className="flex-1"
          disabled={!firstName || !sendItem || !recieveItem}
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
            color={!firstName || !sendItem || !recieveItem ? "#979698" : "#fff"}
          />{" "}
        </Button>
      </div>
    </BottomSheetModal>
  );
};

export default SenderGiftModal;
