import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)`
  width: 100%;
  cursor: grab;
  height: 175px;
  &:active {
    cursor: grabbing;
  }
`;
