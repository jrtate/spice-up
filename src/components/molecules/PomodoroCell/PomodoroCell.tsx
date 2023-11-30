import React, { useEffect, useState, useMemo } from "react";
import { Box, IconButton, LinearProgress } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTimer } from "react-timer-hook";
import { PauseCircle } from "@mui/icons-material";
import { TaskBlock } from "../../../models/Task";

interface PomodoroCellProps {
  durationInMinutes: number;
  blockType: "Break" | "Task";
  setIsCompleted: (b: boolean) => void;
  disabled?: boolean;
  isBlockComplete: boolean;
  taskBlock: TaskBlock;
}

const PomodoroCell = ({
  durationInMinutes,
  blockType,
  setIsCompleted,
  disabled,
  isBlockComplete,
  taskBlock,
}: PomodoroCellProps) => {
  const [timerWasStarted, setTimerWasStarted] = useState<boolean>(false);
  const expirationInSeconds = useMemo(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + durationInMinutes * 60);
    return time;
  }, [durationInMinutes, taskBlock]);

  const {
    totalSeconds,
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    autoStart: false,
    expiryTimestamp: expirationInSeconds,
    onExpire: () => {
      setIsCompleted(true);
    },
  });

  useEffect(() => {
    restart(expirationInSeconds, false);
  }, [taskBlock]);

  const isCompleted = useMemo(() => {
    if (isBlockComplete) return true;
    return minutes + seconds === 0;
  }, [isBlockComplete]);

  const handleToggleTimer = () => {
    if (!isRunning && !timerWasStarted) {
      start();
      setTimerWasStarted(true);
    } else if (isRunning) {
      pause();
    } else if (timerWasStarted) {
      resume();
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        disabled={disabled}
        size={"large"}
        color={isCompleted ? "success" : "primary"}
        onClick={() => handleToggleTimer()}
      >
        {isCompleted ? (
          <CheckCircleIcon />
        ) : isRunning ? (
          <PauseCircle />
        ) : (
          <PlayCircleIcon />
        )}
      </IconButton>
      <Box
        mt={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LinearProgress
          color={isCompleted ? "success" : "primary"}
          sx={{
            minWidth: 150,
            backgroundColor: disabled ? "#5a5a5a" : "",
            height: ".25rem",
          }}
          variant="determinate"
          value={
            isCompleted
              ? 100
              : Math.min(
                  ((durationInMinutes * 60 - totalSeconds) /
                    (durationInMinutes * 60)) *
                    100,
                  100,
                )
          }
        />
        {`${blockType} Cycle - ${
          isCompleted
            ? "00:00"
            : `${minutes < 10 ? `0${minutes}` : minutes}:${
                seconds < 10 ? `0${seconds}` : seconds
              }`
        }`}
      </Box>
    </Box>
  );
};

export default PomodoroCell;
