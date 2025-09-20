import Image from "next/image";
import { FC } from "react";

interface Props {
  ImagePath: string;
  Name: string;
  amount: string;
  bill_no: string;
  customer_name: string;
  owner?: string;
  CreatedAt: string;
  is_paid: boolean;
}

const DetailCard: FC<Props> = ({
  ImagePath,
  Name,
  amount,
  bill_no,
  customer_name,
  // owner,
  CreatedAt,
  is_paid,
}) => {
  return (
    <article className="bg-white px-[2rem] py-[1.5rem] rounded-[1rem]">
      <div className="flex justify-center items-center">
        <Image
          className="rounded-[0.5rem]"
          src={ImagePath}
          width={350}
          height={176}
          alt={Name}
        />
      </div>
      <dl className="mt-[1.5rem] flex flex-col gap-[0.5rem]">
        <div className="flex justify-between items-center text-[0.875rem]">
          <dt className="font-semibold text-[#0E0C0F]">Gift Card title</dt>
          <dd className="text-[#B3ADB1]">{Name}</dd>
        </div>

        {/* <div className="flex justify-between items-center text-[0.875rem]">
          <dt className="font-semibold text-[#0E0C0F]">Username </dt>
          <dd className="text-[#B3ADB1]">kiana.mansouri@gmail.com</dd>
        </div> */}

        <div className="flex justify-between items-center text-[0.875rem]">
          <dt className="font-semibold text-[#0E0C0F]">Order Number</dt>
          <dd className="text-[#B3ADB1] w-[100px] md:w-auto">{bill_no}</dd>
        </div>

        {/* <div className="flex justify-between items-center text-[0.875rem]">
          <dt className="font-semibold text-[#0E0C0F]">Recipient Name</dt>
          <dd className="text-[#B3ADB1]">{owner}</dd>
        </div> */}

        <div className="flex justify-between items-center text-[0.875rem]">
          <dt className="font-semibold text-[#0E0C0F]">Purchaser Name</dt>
          <dd className="text-[#B3ADB1]">{customer_name}</dd>
        </div>

        <div className="flex justify-between items-center text-[0.875rem]">
          <dt className="font-semibold text-[#0E0C0F]">Date Created</dt>
          <dd className="text-[#B3ADB1]">
            {new Date(CreatedAt).toLocaleDateString("en", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </dd>
        </div>

        <div className="flex justify-between items-center text-[0.875rem]">
          <dt className="font-semibold text-[#0E0C0F]">Price</dt>
          <dd className="text-[#B3ADB1] font-semibold">${amount}</dd>
        </div>

        <div className="flex justify-between items-center text-[0.875rem]">
          <dt className="font-semibold text-[#0E0C0F]">Status</dt>
          {is_paid ? (
            <dd className="text-[#C0BA35] font-semibold">Activated</dd>
          ) : (
            <dd className="text-[#C13800] font-semibold">Deactivated</dd>
          )}
        </div>
      </dl>
    </article>
  );
};

export default DetailCard;
