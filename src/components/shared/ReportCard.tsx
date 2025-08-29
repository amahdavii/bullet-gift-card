import Image from "next/image";
import { FC } from "react";

interface Props {
  title: string;
  price?: number;
  count?: number;
  state: string;
  changePercent: number;
  date_range: {
    from: string;
    to: string;
  };
}

const ReportCard: FC<Props> = ({
  title,
  price,
  count,
  state,
  changePercent,
  date_range,
}) => {
  const fromDate = new Date(date_range.from);
  const toDate = new Date(date_range.to);

  const diffTime = toDate.getTime() - fromDate.getTime();

  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  return (
    <article className="flex flex-col bg-white rounded-[0.5rem] shadow-[0px_-2px_8px_0px_#BAB9BA1A,_0px_2px_8px_0px_#BAB9BA1A] flex-1 h-[8rem] py-[1rem] px-[1.25rem] gap-[0.5rem]">
      <h3 className="text-[0.875rem] font-semibold">{title}</h3>
      {(Boolean(price) || price === 0) && (
        <p className="font-semibold text-[1.5rem]">${price}</p>
      )}

      {(Boolean(count) || count === 0) && (
        <p className="font-semibold flex items-baseline gap-2 text-[1.5rem]">
          {count} <span className="text-[0.6875rem] text-[#B3ADB1]">Cards</span>
        </p>
      )}
      <div className="flex items-center gap-[4px] text-[0.75rem]">
        {state === "up" ? (
          <Image
            src="/assets/images/up.svg"
            width={24}
            height={24}
            alt="up arrow image"
          />
        ) : (
          <Image
            src="/assets/images/down.svg"
            width={24}
            height={24}
            alt="down arrow image"
          />
        )}
        <p className="mr-[4px] font-semibold">{changePercent}%</p>
        <span className="text-[#B3ADB1]">last {diffDays} days</span>
      </div>
    </article>
  );
};

export default ReportCard;
