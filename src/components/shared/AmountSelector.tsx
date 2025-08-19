"use client";

import { FC } from "react";
import PlusSVG from "../icons/PlusSVG";
import MinusSVG from "../icons/MinusSVG";

interface Props {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  min: number;
  max: number;
}

const AmountSelector: FC<Props> = ({ amount, setAmount, min, max }) => {
  const generateQuickAmounts = (min: number, max: number) => {
    if (min <= 50 && max >= 500) {
      return [50, 100, 200, 300, 400, 500];
    }

    const steps = 5;
    let stepSize = (max - min) / steps;

    const roundToNiceNumber = (num: number) => {
      if (max - min <= 50) {
        return Math.round(num / 5) * 5;
      }
      return Math.round(num / 10) * 10;
    };

    stepSize = roundToNiceNumber(stepSize);

    const amounts = Array.from({ length: steps }, (_, i) => min + i * stepSize);

    // آخرین عدد محاسبه‌شده
    const last = amounts[amounts.length - 1];

    if (last !== max) {
      // اگه max توی لیست نبود، اضافه‌ش کن
      amounts.push(max);
    }

    return amounts;
  };

  const quickAmounts = generateQuickAmounts(min, max);

  const decrease = () => {
    setAmount((prev) => Math.max(min, prev - 5));
  };

  const increase = () => {
    setAmount((prev) => {
      if (prev < min) return min; // اگر کمتر از مین بود، پرش مستقیم روی مین
      return Math.min(max, prev + 5);
    });
  };

  const selectAmount = (val: number) => {
    setAmount(val);
  };

  return (
    <div className="flex flex-col items-center gap-4 px-6">
      {/* Amount control */}
      <div className="flex items-center gap-4">
        <button
          onClick={decrease}
          disabled={amount <= min}
          className={`bg-[#D1AE82] text-white w-8 h-8 rounded-[0.5rem] flex items-center justify-center font-bold text-lg cursor-pointer 
      ${amount <= min ? "opacity-50 pointer-events-none" : ""}`}
        >
          <MinusSVG />
        </button>

        <div className="text-2xl font-bold">${amount.toFixed(2)}</div>

        <button
          onClick={increase}
          disabled={amount >= max}
          className={`bg-[#D1AE82] text-white w-8 h-8 rounded-[0.5rem] flex items-center justify-center font-bold text-lg cursor-pointer 
      ${amount >= max ? "opacity-50 pointer-events-none" : ""}`}
        >
          <PlusSVG />
        </button>
      </div>

      {/* Range text */}
      <p className="text-gray-500 text-[0.75rem]">
        ( ${min} to ${max} )
      </p>

      {/* Quick select buttons */}
      <div className="grid grid-cols-3 gap-3 mt-[3.5rem]">
        {quickAmounts.map((val, index) => (
          <button
            key={`${val} ${index}`}
            onClick={() => selectAmount(val)}
            className={`px-4 py-2 rounded-[0.5rem] border cursor-pointer ${
              amount === val
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300"
            }`}
          >
            ${val}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AmountSelector;
