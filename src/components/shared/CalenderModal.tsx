"use client";

import CalenderSVG from "@/components/icons/CalenderSVG";
import FullScreenModal from "@/components/shared/FullScreenModal";
import { Button } from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import React, { useEffect, useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  isOpen: boolean;
  close: () => void;
}

export default function CalenderModal({ isOpen, close }: Props) {
  const [values, setValues] = useState<DateObject[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (dateObjects: DateObject | DateObject[]) => {
    const arr = Array.isArray(dateObjects) ? dateObjects : [dateObjects];
    setValues(arr as DateObject[]);
  };

  const handleReset = () => {
    setValues([]);
  };

  const handleApply = () => {
    if (values.length !== 2) return;

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("from", values[0].format("YYYY-MM-DD"));
    params.set("to", values[1].format("YYYY-MM-DD"));
    params.delete("modal");

    router.replace(`/dashboard?${params.toString()}`);
  };

  useEffect(() => {
    if (!isOpen) {
      setValues([]);
    }
  }, [isOpen]);

  return (
    <FullScreenModal isOpen={isOpen} onClose={close}>
      {/* container با محدودیت عرض */}
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 px-6 items-center">
        <div className="flex gap-4 w-full justify-center mt-5">
          <TextField
            value={values[0]?.format("DD/MM/YYYY") || "DD/MM/YYYY"}
            label="Start Date"
            id="Start Date"
            disabled
            icon={<CalenderSVG />}
          />
          <TextField
            value={values[1]?.format("DD/MM/YYYY") || "DD/MM/YYYY"}
            label="End Date"
            id="End Date"
            disabled
            icon={<CalenderSVG />}
          />
        </div>

        <Calendar
          value={values}
          onChange={handleChange}
          range
          numberOfMonths={1}
          format="DD/MM/YYYY"
          className="rmdp-mobile custom-calendar"
          highlightToday={false}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <div className="flex w-full max-w-4xl mx-auto px-6 py-6 gap-4">
          <Button
            fullWidth
            variant="outline"
            onClick={handleReset}
            disabled={!values[0] || !values[1]}
          >
            Reset
          </Button>
          <Button
            fullWidth
            onClick={handleApply}
            disabled={!values[0] || !values[1]}
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </FullScreenModal>
  );
}
