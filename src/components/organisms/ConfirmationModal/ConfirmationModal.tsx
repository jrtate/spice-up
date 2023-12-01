import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ModalContainer } from "./styles";

interface ConfirmationModalProps {
  show: boolean;
  closeModal: () => void;
  isLoading?: boolean;
  headerText: string;
  bodyText: string;
  confirmButtonText?: string;
  handleConfirmClick: () => void;
}

const ConfirmationModal = ({
  show,
  closeModal,
  isLoading,
  headerText,
  bodyText,
  confirmButtonText,
  handleConfirmClick,
}: ConfirmationModalProps) => (
  <Modal open={show} onClose={closeModal}>
    <ModalContainer padding={3}>
      <Typography variant="h6" gutterBottom>
        {headerText}
      </Typography>
      <Typography variant="h6" sx={{ marginTop: 3 }} gutterBottom>
        {bodyText}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }} mt={3}>
        <LoadingButton
          loading={isLoading}
          onClick={() => {
            handleConfirmClick();
            closeModal();
          }}
        >
          {confirmButtonText || "Confirm"}
        </LoadingButton>
      </Box>
    </ModalContainer>
  </Modal>
);

export default ConfirmationModal;
