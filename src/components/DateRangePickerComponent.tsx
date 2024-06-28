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

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

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
      {data &&
        data.data.map((room, index: number) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {room.name}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Room Status</TableCell>
                    {room.inventory_calendar.map((inv, index: number) => (
                      <TableCell
                        key={index}
                        sx={{
                          backgroundColor: inv.status ? "green" : "red",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {dayjs(inv.date).format("ddd, MMM D")}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Rooms to sell</TableCell>
                    {room.inventory_calendar.map((inv, index: number) => (
                      <TableCell key={index} sx={{ textAlign: "center" }}>
                        {inv.available}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>Net booked</TableCell>
                    {room.inventory_calendar.map((inv, index: number) => (
                      <TableCell key={index} sx={{ textAlign: "center" }}>
                        {inv.booked}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>Standard Rate</TableCell>
                    {room.rate_plans[0]?.calendar.map((rate, index: number) => (
                      <TableCell key={index} sx={{ textAlign: "center" }}>
                        {rate.rate}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>Min. length of stay</TableCell>
                    {room.rate_plans[0]?.calendar.map((rate) => (
                      <TableCell key={rate.id} sx={{ textAlign: "center" }}>
                        {rate.min_length_of_stay || "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>Min. advance reservation</TableCell>
                    {room.rate_plans[0]?.calendar.map((rate) => (
                      <TableCell key={rate.id} sx={{ textAlign: "center" }}>
                        {rate.reservation_deadline || "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {/* <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              BULK EDIT
            </Button> */}
          </Box>
        ))}
    </LocalizationProvider>
  );
}
