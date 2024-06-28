import { Box, Container, Typography } from "@mui/material";
import DateRangePickerComponent from "./DateRangePickerComponent";

const RateCalenderComponent = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        background: "#e2e8f0",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <DateRangePickerComponent />
    </Container>
  );
};

export default RateCalenderComponent;
