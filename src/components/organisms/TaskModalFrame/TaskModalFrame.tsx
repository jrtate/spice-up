import React from "react";
import { ModalContainer } from "./styles";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DaysOfWeek } from "models/Task";
import { LoadingButton } from "@mui/lab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface ModalFrameProps {
  title: string;
  show: boolean;
  handleModalClose: () => void;
  description: string;
  setDescription: (s: string) => void;
  duration?: number;
  setDuration: (n: number) => void;
  isRecurring: boolean;
  setIsRecurring: (b: boolean) => void;
  checkedDays: DaysOfWeek[];
  handleDayOfWeekClick: (d: DaysOfWeek) => void;
  isRandom: boolean;
  setIsRandom: (b: boolean) => void;
  frequency?: number;
  setFrequency: (n: number) => void;
  scheduledDay: Date;
  setScheduledDay: (d: Date) => void;
  isLoading: boolean;
  handleSaveTask: () => void;
}

const TaskModalFrame = ({
  title,
  show,
  handleModalClose,
  description,
  setDescription,
  duration,
  setDuration,
  isRecurring,
  setIsRecurring,
  checkedDays,
  handleDayOfWeekClick,
  isRandom,
  setIsRandom,
  frequency,
  setFrequency,
  scheduledDay,
  setScheduledDay,
  isLoading,
  handleSaveTask,
}: ModalFrameProps) => {
  return (
    <Modal open={show} onClose={handleModalClose}>
      <ModalContainer padding={3}>
        <Typography variant="h6">{title}</Typography>

        <Box mt={2} sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Task Description"
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            fullWidth
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            label="Duration (in minutes)"
            variant="standard"
            value={duration}
            type={"number"}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            fullWidth
          />
        </Box>

        <Box mt={3}>
          <FormLabel>Set Occurrence</FormLabel>
          <RadioGroup row>
            <FormControlLabel
              value={2}
              control={
                <Radio
                  checked={isRecurring}
                  onChange={() => setIsRecurring(true)}
                />
              }
              label="Re-occurring Task"
            />
            <FormControlLabel
              value={1}
              control={
                <Radio
                  checked={!isRecurring}
                  onChange={() => setIsRecurring(false)}
                />
              }
              label="One Time Task"
            />
          </RadioGroup>
        </Box>

        <Box mt={2} sx={{ display: "flex", flexDirection: "column" }}>
          <FormLabel>Schedule Task</FormLabel>
          {!isRecurring && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={scheduledDay}
                onChange={(newValue) => setScheduledDay(newValue)}
              />
            </LocalizationProvider>
          )}

          {isRecurring && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={isRandom}
                      checked={checkedDays.includes(DaysOfWeek.Monday)}
                      onChange={() => handleDayOfWeekClick(DaysOfWeek.Monday)}
                    />
                  }
                  label="Monday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={isRandom}
                      checked={checkedDays.includes(DaysOfWeek.Tuesday)}
                      onChange={() => handleDayOfWeekClick(DaysOfWeek.Tuesday)}
                    />
                  }
                  label="Tuesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={isRandom}
                      checked={checkedDays.includes(DaysOfWeek.Wednesday)}
                      onChange={() =>
                        handleDayOfWeekClick(DaysOfWeek.Wednesday)
                      }
                    />
                  }
                  label="Wednesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={isRandom}
                      checked={checkedDays.includes(DaysOfWeek.Thursday)}
                      onChange={() => handleDayOfWeekClick(DaysOfWeek.Thursday)}
                    />
                  }
                  label="Thursday"
                />
              </Box>
              <Box sx={{ display: "flex" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={isRandom}
                      checked={checkedDays.includes(DaysOfWeek.Friday)}
                      onChange={() => handleDayOfWeekClick(DaysOfWeek.Friday)}
                    />
                  }
                  label="Friday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={isRandom}
                      checked={checkedDays.includes(DaysOfWeek.Saturday)}
                      onChange={() => handleDayOfWeekClick(DaysOfWeek.Saturday)}
                    />
                  }
                  label="Saturday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={isRandom}
                      checked={checkedDays.includes(DaysOfWeek.Sunday)}
                      onChange={() => handleDayOfWeekClick(DaysOfWeek.Sunday)}
                    />
                  }
                  label="Sunday"
                />
              </Box>
            </Box>
          )}
        </Box>

        {isRecurring && (
          <Box mt={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={isRandom}
                  onClick={() => setIsRandom(!isRandom)}
                />
              }
              label="Add Some Spice! (Randomize scheduled days)"
            />
            <FormControl sx={{ marginY: 2 }} fullWidth>
              <InputLabel id="frequency-label">Frequency</InputLabel>
              <Select
                disabled={!isRandom}
                labelId="frequency-label"
                id="frequency-select"
                value={frequency}
                label="Frequency"
                onChange={(e) =>
                  setFrequency(parseInt(e.target.value as string))
                }
              >
                {Array.from(Array(7).keys()).map((val: number) => {
                  return (
                    <MenuItem key={val} value={val + 1}>
                      {val + 1}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end" }} mt={3}>
          <LoadingButton
            loading={isLoading}
            onClick={() => handleSaveTask()}
            disabled={isLoading || !description}
          >
            Save
          </LoadingButton>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default TaskModalFrame;
