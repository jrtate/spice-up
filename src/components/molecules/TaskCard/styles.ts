import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)`
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;
