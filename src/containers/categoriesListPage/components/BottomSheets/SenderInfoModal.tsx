import ChevronLeftSVG from "@/components/icons/ChevronLeftSVG";
import ChevronRightSVG from "@/components/icons/ChevronRightSVG";
import EmailSVG from "@/components/icons/EmailSVG";
import SmsSVG from "@/components/icons/SmsSVG";
import WhatsappSVG from "@/components/icons/WhatsappSVG";
import BottomSheetModal from "@/components/shared/BottomSheetModal";
import { Button } from "@/components/ui/Button";
import ClearableInput from "@/components/ui/ClearableInput";
import TextField from "@/components/ui/TextField";
import { useModalQuery } from "@/hooks/useModalQuery";
import { usePostProductOrder } from "@/services/categoriesList";
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

const SenderInfoModal: FC<Props> = ({ isOpen, close }) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const title = searchParams.get("title");

  const pathname = usePathname();
  const params = useParams();
  const { id } = params;

  const isCategoryPage = pathname.includes("/category");

  const { mutateAsync } = usePostProductOrder();

  const { open: openQrCode } = useModalQuery({
    modalValue: "qr-code",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [sendItem, setSendItem] = useState<SendItem | null>(null);
  const [recieveItem, setRecieveItem] = useState<string>("");

  useEffect(() => {
    if (!sendItem) {
      setRecieveItem("");
    }
  }, [sendItem]);

  useEffect(() => {
    if (!isOpen) {
      setFirstName("");
      setLastName("");
      setRecieveItem("");
      setSendItem(null);
    }
  }, [isOpen]);

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
      </div>
      <div className="mt-[6.625rem] space-y-[1rem]">
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
          onClick={() => mutateAsync().then((res) => openQrCode({ code: res }))}
        >
          Purchase
          <ChevronRightSVG
            color={!firstName || !sendItem || !recieveItem ? "#979698" : "#fff"}
          />
        </Button>
      </div>
    </BottomSheetModal>
  );
};

export default SenderInfoModal;
