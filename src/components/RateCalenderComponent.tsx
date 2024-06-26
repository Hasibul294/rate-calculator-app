import { Box, Container, Typography } from "@mui/material";
import DateRangePickerComponent from "./DateRangePickerComponent";

const RateCalenderComponent = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        background: "#e2e8f0",
        padding: "20px",
      }}
    >
      <Box
        component="div"
        sx={{
          p: 3,
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" fontWeight="fontWeightBold">
          Rate Calender
        </Typography>

        <Box component="div" maxWidth="sm">
          <DateRangePickerComponent />
        </Box>
      </Box>
    </Container>
  );
};

export default RateCalenderComponent;
