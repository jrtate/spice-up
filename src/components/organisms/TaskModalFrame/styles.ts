import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: rgb(20 20 20);
  border: 1px solid #f5f5f5;
  border-radius: 1.5rem;
`;
