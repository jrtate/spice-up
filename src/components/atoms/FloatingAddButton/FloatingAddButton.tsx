import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { StyledFab } from "./styles";

interface FloatingAddButtonProps {
  onClick: () => void;
}

const FloatingAddButton = ({ onClick }: FloatingAddButtonProps) => {
  return (
    <StyledFab color="primary" aria-label="add" onClick={onClick}>
      <AddIcon />
    </StyledFab>
  );
};

export default FloatingAddButton;
