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
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialDateString = searchParams.get(queryKey);
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(
    initialDateString
      ? new DateObject({ date: initialDateString, format: format })
      : null
  );

  const handleDateChange = (date: DateObject | null) => {
    setSelectedDate(date);

    const current = new URLSearchParams(searchParams.toString());
    if (date) {
      const dateString = date.format(format);
      current.set(queryKey, dateString);
    } else {
      current.delete(queryKey);
    }

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
        format: format,
      });
      if (newDateObject.isValid) {
        setSelectedDate(newDateObject);
      }
    } else if (!dateFromQuery && selectedDate) {
      setSelectedDate(null);
    }
  }, [searchParams, queryKey, format]);

  return (
    <div className="flex items-center gap-2.5">
      <CalenderSVG /> {placeholder}
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
