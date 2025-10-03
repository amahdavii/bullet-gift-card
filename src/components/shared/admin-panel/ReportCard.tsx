import TrendingDown from "@/components/icons/admin-panel/TrendingDown";
import TrendingUp from "@/components/icons/admin-panel/TrendingUp";
import SpinnerSVG from "@/components/icons/SpinnerSVG";
import { FC } from "react";

interface ReportCardProps {
  title: string;
  value: number;
  state: string;
  percentage: number;
  price?: boolean;
  isLoading?: boolean;
}

const ReportCard: FC<ReportCardProps> = ({
  title,
  value = 0,
  state,
  percentage,
  price = false,
  isLoading = false,
}) => {
  return (
    <div className="flex-1 h-[166px] shadow-[0px_-2px_8px_0px_#BAB9BA1A,_0px_2px_8px_0px_#BAB9BA1A] p-6 flex flex-col justify-between bg-white rounded-2xl">
      <h3 className="font-semibold text-[14px]">{title}</h3>
      {isLoading ? (
        <SpinnerSVG />
      ) : (
        <>
          {price ? (
            <span className="font-bold text-[32px]">
              {Number(value).toLocaleString()} $
            </span>
          ) : (
            <span className="font-bold text-[32px]">
              {Number(value).toLocaleString()}
            </span>
          )}

          <div className="flex items-center gap-1">
            {state === "up" ? (
              <span className="bg-[#22C55E29] inline-flex items-center justify-center w-[24px] h-[24px] rounded-full">
                <TrendingUp />
              </span>
            ) : (
              <span className="bg-[#FF563029] inline-flex items-center justify-center w-[24px] h-[24px] rounded-full">
                <TrendingDown />
              </span>
            )}

            <span className="font-semibold">{percentage}%</span>
            <span className="text-[#637381]">last week</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportCard;
