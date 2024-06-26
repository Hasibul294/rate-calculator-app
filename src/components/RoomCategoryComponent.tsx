import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";

const RoomCategoryComponent = ({ data }: { data: any }) => {
  return (
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
        <Grid xs={4} sm={3} md={2}>
          <Box
            sx={{
              borderBottom: "1px solid #e2e8f0",
              borderRight: "1px solid #e2e8f0",
              paddingY: "30.5px",
            }}
          ></Box>
          {data.data.map((room: any, index: number) => (
            <Box key={index}>
              <Typography
                variant="h6"
                whiteSpace="nowrap"
                sx={{
                  my: { xs: 1, sm: 2 },
                  fontSize: { xs: "24px", sm: "28px", md: "32px" },
                }}
              >
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
                        sx={{
                          fontSize: {
                            xs: "24px",
                            sm: "30px",
                            md: "34px",
                          },
                        }}
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
        <Grid xs={8} sm={9} md={10} className="custom-scrollbar">
          <Box display="flex" flexDirection="row">
            {data.data[0].inventory_calendar.map((inv: any, index: number) => (
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
            ))}
          </Box>
          <Box>
            {data?.data.map((room: any, index: number) => (
              <Box key={index}>
                <Typography
                  height={50}
                  sx={{
                    marginTop: { xs: "0px", sm: "21.5px", md: "27.5px" },
                  }}
                ></Typography>
                <Box display="flex" flexDirection="row">
                  {room?.inventory_calendar.map((inv: any, index: number) => (
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
                        {room?.rate_plans.map((plan: any, index: number) => (
                          <Box key={index}>
                            <Typography
                              width={100}
                              height={80}
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
                              {plan.calendar[index].reservation_deadline}
                            </Typography>
                          </Box>
                        ))}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomCategoryComponent;
