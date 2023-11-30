import React, { useEffect, useState } from "react";
import { useToast } from "hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ModalContainer } from "../TaskModalFrame/styles";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../api/SettingsApi";

interface SettingsModalProps {
  show: boolean;
  closeModal: () => void;
}

const SettingsModal = ({ show, closeModal }: SettingsModalProps) => {
  const queryClient = useQueryClient();
  const { data: settingsData, isLoading: isSettingsDataLoading } =
    useGetSettingsQuery();
  const updateSettings = useUpdateSettingsMutation(queryClient);
  const [workBlockDuration, setWorkBlockDuration] = useState<number>(25);
  const [breakBlockDuration, setBreakBlockDuration] = useState<number>(5);
  const { handleSetShowToast } = useToast();

  const handleModalClose = () => {
    setWorkBlockDuration(settingsData?.workBlockDuration || 25);
    setBreakBlockDuration(settingsData?.breakBlockDuration || 5);
    closeModal();
  };

  const handleSaveTask = () => {
    try {
      updateSettings.mutate({ workBlockDuration, breakBlockDuration });
      handleModalClose();
      handleSetShowToast("Settings saved.");
    } catch (e) {
      handleSetShowToast("Something went wrong.");
    }
  };

  useEffect(() => {
    setWorkBlockDuration(settingsData?.workBlockDuration);
    setBreakBlockDuration(settingsData?.breakBlockDuration);
  }, [settingsData]);

  return (
    <Modal open={show} onClose={handleModalClose}>
      <ModalContainer padding={3}>
        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            label="Work Duration (in minutes)"
            variant="standard"
            value={workBlockDuration}
            type={"number"}
            onChange={(e) => setWorkBlockDuration(parseInt(e.target.value))}
            required
          />

          <TextField
            label="Break Duration (in minutes)"
            variant="standard"
            value={breakBlockDuration}
            type={"number"}
            onChange={(e) => setBreakBlockDuration(parseInt(e.target.value))}
            required
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }} mt={3}>
          <LoadingButton
            loading={updateSettings.isPending || isSettingsDataLoading}
            onClick={() => handleSaveTask()}
            disabled={!workBlockDuration || !breakBlockDuration}
          >
            Save
          </LoadingButton>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default SettingsModal;
