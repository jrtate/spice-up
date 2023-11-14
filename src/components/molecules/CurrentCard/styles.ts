import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)`
  min-width: 220px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;
