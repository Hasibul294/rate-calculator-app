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
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/globals.css";

import { Box, Typography, Grid } from "@mui/material";

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
        <Typography variant="h5" fontWeight="fontWeightBold">
          Rate Calender
        </Typography>
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
      {data && (
        // data.data[0].inventory_calendar.map((room: any, index: number) => (
        <Box
          component="div"
          sx={{
            mt: 3,
            p: 3,
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        >
          <Grid container spacing={2}>
            <Grid xs={2}>
              <Box
                sx={{
                  borderBottom: "1px solid #e2e8f0",
                  borderRight: "1px solid #e2e8f0",
                  paddingY: "30.5px",
                }}
              ></Box>
              {data.data.map((room: any, index: number) => (
                <Box key={index}>
                  <Typography variant="h6" sx={{ my: 2 }}>
                    {room.name}
                  </Typography>
                  <Typography
                    height={40}
                    display="flex"
                    alignItems="center"
                    justifyContent="start"
                    sx={{
                      borderTop: "1px solid #e2e8f0",
                      borderBottom: "1px solid #e2e8f0",
                      borderRight: "1px solid #e2e8f0",
                    }}
                  >
                    Room Status
                  </Typography>
                  <Typography
                    height={40}
                    display="flex"
                    alignItems="center"
                    justifyContent="start"
                    sx={{
                      borderTop: "1px solid #e2e8f0",
                      borderBottom: "1px solid #e2e8f0",
                      borderRight: "1px solid #e2e8f0",
                    }}
                  >
                    Rooms to sell
                  </Typography>
                  <Typography
                    height={40}
                    display="flex"
                    alignItems="center"
                    justifyContent="start"
                    sx={{
                      borderTop: "1px solid #e2e8f0",
                      borderBottom: "1px solid #e2e8f0",
                      borderRight: "1px solid #e2e8f0",
                    }}
                  >
                    Net booked
                  </Typography>

                  {room?.rate_plans.map((plan: any, index: number) => (
                    <>
                      <Typography
                        height={80}
                        display="flex"
                        flexDirection="column"
                        alignItems="start"
                        justifyContent="center"
                        sx={{
                          borderTop: "1px solid #e2e8f0",
                          borderBottom: "1px solid #e2e8f0",
                          borderRight: "1px solid #e2e8f0",
                        }}
                        key={index}
                      >
                        {plan?.name}
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          gap={1}
                        >
                          <PersonIcon
                            fontSize="large"
                            color="primary"
                          ></PersonIcon>
                          <CloseIcon fontSize="small" color="primary" />
                          <Typography
                            variant="caption"
                            fontSize="18px"
                            color="primary"
                          >
                            {room?.occupancy}
                          </Typography>
                        </Box>
                      </Typography>
                      <Typography
                        height={40}
                        display="flex"
                        alignItems="center"
                        justifyContent="start"
                        sx={{
                          borderTop: "1px solid #e2e8f0",
                          borderBottom: "1px solid #e2e8f0",
                          borderRight: "1px solid #e2e8f0",
                        }}
                      >
                        Min. length of stay
                      </Typography>
                      <Typography
                        height={40}
                        display="flex"
                        alignItems="center"
                        justifyContent="start"
                        sx={{
                          borderTop: "1px solid #e2e8f0",
                          borderBottom: "1px solid #e2e8f0",
                          borderRight: "1px solid #e2e8f0",
                        }}
                      >
                        Min. advance reservation
                      </Typography>
                    </>
                  ))}
                </Box>
              ))}

              {}
            </Grid>
            <Grid xs={10} className="custom-scrollbar">
              <Box display="flex" flexDirection="row">
                {data.data[0].inventory_calendar.map(
                  (inv: any, index: number) => (
                    <Typography
                      key={index}
                      variant="caption"
                      fontWeight="700"
                      p={2}
                      alignItems="end"
                      sx={{
                        borderTop: "1px solid #e2e8f0",
                        borderBottom: "1px solid #e2e8f0",
                        borderRight: "1px solid #e2e8f0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {dayjs(inv.date).format("ddd, MMM D")}
                    </Typography>
                  )
                )}
              </Box>
              <Box>
                {data?.data.map((room: any, index: number) => (
                  <Box key={index}>
                    <Typography
                      height={50}
                      sx={{ marginTop: "8.5px" }}
                    ></Typography>
                    <Box display="flex" flexDirection="row">
                      {room?.inventory_calendar.map(
                        (inv: any, index: number) => (
                          <Box key={index}>
                            <Typography
                              width={100}
                              height={40}
                              textAlign="end"
                              display="flex"
                              alignItems="center"
                              justifyContent="end"
                              sx={{
                                marginTop: "6px",
                                borderTop: inv.status
                                  ? "1px solid #e2e8f0"
                                  : "1px solid red",
                                borderBottom: inv.status
                                  ? "1px solid #e2e8f0"
                                  : "1px solid red",
                                borderRight: inv.status
                                  ? "1px solid #e2e8f0"
                                  : "1px solid red",
                                whiteSpace: "nowrap",
                                backgroundColor: inv.status ? "green" : "red",
                                color: "white",
                              }}
                            >
                              {inv?.status === true ? "Open" : "Close"}
                            </Typography>
                            <Typography
                              width={100}
                              height={40}
                              textAlign="end"
                              display="flex"
                              alignItems="center"
                              justifyContent="end"
                              sx={{
                                borderTop: inv.status
                                  ? "1px solid #e2e8f0"
                                  : "1px solid red",
                                borderBottom: inv.status
                                  ? "1px solid #e2e8f0"
                                  : "1px solid red",
                                borderRight: inv.status
                                  ? "1px solid #e2e8f0"
                                  : "1px solid red",
                                whiteSpace: "nowrap",
                                backgroundColor: inv.status ? "white" : "red",
                                color: inv.status ? "black" : "white",
                              }}
                            >
                              {inv?.available ? inv.available : "-"}
                            </Typography>
                            <Typography
                              width={100}
                              height={40}
                              textAlign="end"
                              display="flex"
                              alignItems="center"
                              justifyContent="end"
                              sx={{
                                backgroundColor: inv.status ? "white" : "red",
                                color: inv.status ? "black" : "white",
                                borderTop: inv.status
                                  ? "1px solid #e2e8f0"
                                  : "1px solid red",
                                borderBottom: inv.status
                                  ? "1px solid #e2e8f0"
                                  : "1px solid red",
                                borderRight: inv.status
                                  ? "1px solid #e2e8f0"
                                  : "1px solid red",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {inv?.booked}
                            </Typography>
                            <Typography>
                              {room?.rate_plans.map(
                                (plan: any, index: number) => (
                                  <Box key={index}>
                                    <Typography
                                      width={100}
                                      height={80}
                                      textAlign="end"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="end"
                                      sx={{
                                        backgroundColor: inv.status
                                          ? "white"
                                          : "red",
                                        color: inv.status ? "black" : "white",
                                        borderTop: inv.status
                                          ? "1px solid #e2e8f0"
                                          : "1px solid red",
                                        borderBottom: inv.status
                                          ? "1px solid #e2e8f0"
                                          : "1px solid red",
                                        borderRight: inv.status
                                          ? "1px solid #e2e8f0"
                                          : "1px solid red",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {plan.calendar[index].rate}
                                    </Typography>
                                    <Typography
                                      width={100}
                                      height={40}
                                      textAlign="end"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="end"
                                      sx={{
                                        backgroundColor: inv.status
                                          ? "white"
                                          : "red",
                                        color: inv.status ? "black" : "white",
                                        borderTop: inv.status
                                          ? "1px solid #e2e8f0"
                                          : "1px solid red",
                                        borderBottom: inv.status
                                          ? "1px solid #e2e8f0"
                                          : "1px solid red",
                                        borderRight: inv.status
                                          ? "1px solid #e2e8f0"
                                          : "1px solid red",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {plan.calendar[index].min_length_of_stay}
                                    </Typography>
                                    <Typography
                                      width={100}
                                      height={40}
                                      textAlign="end"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="end"
                                      sx={{
                                        backgroundColor: inv.status
                                          ? "white"
                                          : "red",
                                        color: inv.status ? "black" : "white",
                                        borderTop: inv.status
                                          ? "1px solid #e2e8f0"
                                          : "1px solid red",
                                        borderBottom: inv.status
                                          ? "1px solid #e2e8f0"
                                          : "1px solid red",
                                        borderRight: inv.status
                                          ? "1px solid #e2e8f0"
                                          : "1px solid red",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {
                                        plan.calendar[index]
                                          .reservation_deadline
                                      }
                                    </Typography>
                                  </Box>
                                )
                              )}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
