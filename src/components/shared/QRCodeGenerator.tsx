"use client";

import React from "react";
import QRCode from "react-qr-code";

interface QRCodeBoxProps {
  value: string;
  qrColor?: string; // رنگ QR کد رو می‌تونی با این مقدار تنظیم کنی
}

const QRCodeBox: React.FC<QRCodeBoxProps> = ({
  value,
  qrColor = "#525153",
}) => {
  return (
    <div
      className="flex flex-col justify-center items-center rounded-[1rem] p-[0.875rem]"
      style={{
        width: 173,
        background: "linear-gradient(0deg, #D1AE82 0%, #FFDFB7 100%)",
      }}
    >
      <div className="bg-white rounded-[8px] p-[0.875rem] flex justify-center items-center">
        <QRCode
          value={`${process.env.NEXT_PUBLIC_URL}/dashboard/order/${value}`}
          size={133}
          fgColor={qrColor}
        />
      </div>
      <p className="text-[#525153] mt-2 font-semibold">{value || ""}</p>
    </div>
  );
};

export default QRCodeBox;
