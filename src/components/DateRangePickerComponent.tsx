"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { useQuery } from "@tanstack/react-query";

const fetchRates = async (start: string, end: string) => {
  const response = await fetch(
    `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${start}&end_date=${end}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function DateRangePickerComponent() {
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null]);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["fetchRates", value],
    queryFn: () =>
      fetchRates(
        value[0]!.format("YYYY-MM-DD"),
        value[1]!.format("YYYY-MM-DD")
      ),
    enabled: !!value[0] && !!value[1], // Enable query only if both dates are selected
  });

  useEffect(() => {
    if (value[0] && value[1]) {
      refetch();
    }
  }, [value, refetch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]}>
        <DateRangePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          localeText={{ start: "Start Date", end: "End Date" }}
        />
      </DemoContainer>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {(error as Error).message}</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </LocalizationProvider>
  );
}
