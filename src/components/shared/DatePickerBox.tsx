"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css";
import CalenderSVG from "../icons/admin-panel/CalenderSVG";

export default function DateQueryPicker({
  queryKey = "selectedDate",
  format = "YYYY-MM-DD",
  placeholder = "",
  otherDateKey, // نام query برای تاریخ مقابل (start <-> end)
  isStart = true, // آیا این datepicker start_date است؟
}: {
  queryKey?: string;
  format?: string;
  placeholder?: string;
  otherDateKey?: string;
  isStart?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialDateString = searchParams.get(queryKey);
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(
    initialDateString
      ? new DateObject({ date: initialDateString, format })
      : null
  );

  const handleDateChange = (date: DateObject | null) => {
    if (!date) return;

    const current = new URLSearchParams(searchParams.toString());
    const dateString = date.format(format);

    // محدودیت تاریخ
    if (otherDateKey) {
      const otherDateString = searchParams.get(otherDateKey);
      if (otherDateString) {
        const otherDate = new DateObject({ date: otherDateString, format });
        if (
          (isStart && date.toDate() > otherDate.toDate()) ||
          (!isStart && date.toDate() < otherDate.toDate())
        ) {
          // اگر قوانین رعایت نشده، تاریخ مقابل را هم برابر با این تاریخ قرار بده
          current.set(otherDateKey, dateString);
        }
      }
    }

    current.set(queryKey, dateString);
    setSelectedDate(date);

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.replace(`${window.location.pathname}${query}`, { scroll: false });
  };

  useEffect(() => {
    const dateFromQuery = searchParams.get(queryKey);
    if (
      dateFromQuery &&
      (!selectedDate || selectedDate.format(format) !== dateFromQuery)
    ) {
      const newDateObject = new DateObject({
        date: dateFromQuery,
        format,
      });
      if (newDateObject.isValid) {
        setSelectedDate(newDateObject);
      }
    } else if (!dateFromQuery && selectedDate) {
      setSelectedDate(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, queryKey, format]);

  return (
    <div className="flex items-center gap-2.5">
      <CalenderSVG />
      <DatePicker
        calendarPosition="bottom-right"
        value={selectedDate}
        onChange={handleDateChange}
        format={format}
        className="bg-white"
        placeholder={placeholder}
      />
    </div>
  );
}
