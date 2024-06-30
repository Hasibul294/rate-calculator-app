"use client";

import * as React from "react";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { useQuery } from "@tanstack/react-query";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";

import { Box, Typography, Grid } from "@mui/material";
import Header from "./Header";
import { useRates } from "@/app/hooks/useRates";
import RoomCategoryComponent from "./RoomCategoryComponent";

export default function DateRangePickerComponent() {
  const [value, setValue] = useState<DateRange<Dayjs>>([null, null]);
  const { data, error, isLoading, refetch } = useRates(value);

  useEffect(() => {
    if (value[0] && value[1]) {
      refetch();
    }
  }, [value, refetch]);

  return (
    <Box component="div">
      <Box
        component="div"
        maxWidth="md"
        sx={{
          p: 3,
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <Header title={"Rate Calender"}></Header>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangePicker"]}>
            <DateRangePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
              localeText={{ start: "Start Date", end: "End Date" }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>

      {isLoading && <Typography variant="h4">Loading...</Typography>}
      {error && (
        <Typography variant="h5">Error: {(error as Error).message}</Typography>
      )}
      {data && <RoomCategoryComponent data={data}></RoomCategoryComponent>}
    </Box>
  );
}
