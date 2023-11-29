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

interface ModalFrameProps {
  title: string;
  show: boolean;
  handleModalClose: () => void;
  description: string;
  setDescription: (s: string) => void;
  duration: number;
  setDuration: (n: number) => void;
  isRecurring: boolean;
  setIsRecurring: (b: boolean) => void;
  checkedDays: DaysOfWeek[];
  handleDayOfWeekClick: (d: DaysOfWeek) => void;
  isRandom: boolean;
  setIsRandom: (b: boolean) => void;
  frequency?: number;
  setFrequency: (n: number) => void;
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
          />
          <TextField
            label="Duration (in minutes)"
            variant="standard"
            value={duration}
            type={"number"}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            required
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

        <Box mt={2}>
          <FormLabel>Schedule Task</FormLabel>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedDays.includes(DaysOfWeek.Monday)}
                    onChange={() => handleDayOfWeekClick(DaysOfWeek.Monday)}
                  />
                }
                label="Monday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedDays.includes(DaysOfWeek.Tuesday)}
                    onChange={() => handleDayOfWeekClick(DaysOfWeek.Tuesday)}
                  />
                }
                label="Tuesday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedDays.includes(DaysOfWeek.Wednesday)}
                    onChange={() => handleDayOfWeekClick(DaysOfWeek.Wednesday)}
                  />
                }
                label="Wednesday"
              />
              <FormControlLabel
                control={
                  <Checkbox
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
                    checked={checkedDays.includes(DaysOfWeek.Friday)}
                    onChange={() => handleDayOfWeekClick(DaysOfWeek.Friday)}
                  />
                }
                label="Friday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedDays.includes(DaysOfWeek.Saturday)}
                    onChange={() => handleDayOfWeekClick(DaysOfWeek.Saturday)}
                  />
                }
                label="Saturday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedDays.includes(DaysOfWeek.Sunday)}
                    onChange={() => handleDayOfWeekClick(DaysOfWeek.Sunday)}
                  />
                }
                label="Sunday"
              />
            </Box>
          </Box>
        </Box>

        <Box mt={2}>
          <FormControlLabel
            control={
              <Switch
                checked={isRandom}
                onClick={() => setIsRandom(!isRandom)}
              />
            }
            label="Add Some Spice! (Randomize)"
          />
          <FormControl sx={{ marginY: 1 }} fullWidth>
            <InputLabel id="frequency-label">Frequency</InputLabel>
            <Select
              disabled={!isRandom}
              labelId="frequency-label"
              id="frequency-select"
              value={frequency}
              label="Frequency"
              onChange={(e) => setFrequency(parseInt(e.target.value as string))}
            >
              {Array.from(
                Array(checkedDays.length === 0 ? 7 : checkedDays.length).keys(),
              ).map((val: number) => {
                return (
                  <MenuItem key={val} value={val + 1}>
                    {val + 1}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Typography variant="body2" color={"secondary"}>
            If specific days are selected, it will only assign the task randomly
            to those selected days.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }} mt={3}>
          <LoadingButton
            loading={isLoading}
            onClick={() => handleSaveTask()}
            disabled={
              (checkedDays.length === 0 && !isRandom) ||
              isLoading ||
              !description ||
              !duration
            }
          >
            Save
          </LoadingButton>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default TaskModalFrame;
