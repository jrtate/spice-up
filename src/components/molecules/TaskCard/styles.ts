import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)`
  width: 100%;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;
