import Image from "next/image";
import { FC } from "react";
import { Button } from "../ui/Button";
import { usePatchMarkOrderPaid } from "@/services/dashboard/orders";
import SpinnerSVG from "../icons/SpinnerSVG";
import CircleCheckSVG from "../icons/CircleCheckSVG";
import useToast from "@/hooks/useToast";

interface Props {
  customer_name: string;
  Name: string;
  amount: string;
  ImagePath: string;
  isPaid: boolean;
  id: number;
  setIsActive?: (item: boolean) => void;
}

const ActiveCard: FC<Props> = ({
  customer_name,
  Name,
  amount,
  ImagePath,
  isPaid,
  id,
  setIsActive,
}) => {
  const toast = useToast();
  const { mutateAsync, isPending } = usePatchMarkOrderPaid();

  return (
    <article className="bg-white px-[2rem] py-[1.5rem] rounded-[1rem]">
      <div className="flex justify-center items-center">
        {!!ImagePath && (
          <Image
            className="rounded-[0.5rem]"
            src={ImagePath}
            width={350}
            height={176}
            alt={`${Name} Image`}
          />
        )}
      </div>
      <div className="mt-[0.5rem] mb-[2rem] flex flex-col gap-[0.5rem]">
        <h3 className="text-[1.375rem]">{Name}</h3>
        <div className="flex items-center justify-between text-[0.875rem]">
          <p className="font-semibold">Purchaser Name</p>
          <p className="text-[#B3ADB1]">{customer_name}</p>
        </div>
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <span className="font-bold text-[1rem]">${amount}</span>
        <Button
          onClick={() => {
            setIsActive?.(false);
            mutateAsync(id)
              .then(() => {
                setIsActive?.(true);
                toast.success("The card was successfully activated.");
              })
              .catch(() => toast.error("An error occurred"));
          }}
          fullWidth
        >
          {!!isPaid && (
            <div className="flex items-center gap-[4px]">
              <CircleCheckSVG />
              <p>Activated</p>
            </div>
          )}

          {isPending ? (
            <div className="flex items-center gap-[4px]">
              <SpinnerSVG />
              <p>Activating</p>
            </div>
          ) : (
            "Activate"
          )}
        </Button>
      </div>
    </article>
  );
};

export default ActiveCard;
