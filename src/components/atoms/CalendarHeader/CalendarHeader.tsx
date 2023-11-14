import React from "react";
import { Typography } from "@mui/material";

interface CalendarHeaderProps {
  label: string;
}

const CalendarHeader = ({ label }: CalendarHeaderProps) => {
  return (
    <Typography variant="h6" gutterBottom>
      {label}
    </Typography>
  );
};

export default CalendarHeader;
