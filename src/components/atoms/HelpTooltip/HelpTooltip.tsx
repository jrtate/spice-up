import React from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Tooltip } from "@mui/material";

interface HelpTooltipProps {
  message: string;
}

const HelpTooltip = ({ message }: HelpTooltipProps) => (
  <Tooltip title={message}>
    <QuestionMarkIcon />
  </Tooltip>
);

export default HelpTooltip;
