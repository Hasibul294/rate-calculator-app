import { Typography } from "@mui/material";
import React from "react";

const Header = ({ title }: { title: string }) => {
  return (
    <Typography variant="h5" fontWeight="fontWeightBold">
      {title}
    </Typography>
  );
};

export default Header;
