import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)`
  width: 15rem;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;
