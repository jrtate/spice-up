import React, { useEffect, useState, useMemo, useRef } from "react";
import { Box, IconButton, LinearProgress } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface PomodoroCellProps {
  durationInMinutes: number;
  blockType: "Break" | "Task";
  setIsCompleted: (b: boolean) => void;
  disabled?: boolean;
  isBlockComplete: boolean;
}

const PomodoroCell = ({
  durationInMinutes,
  blockType,
  setIsCompleted,
  disabled,
  isBlockComplete,
}: PomodoroCellProps) => {
  const timerRef = useRef();
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [countdown, setCountdown] = useState<string>(
    `${
      durationInMinutes < 10 ? "0" + durationInMinutes : durationInMinutes
    }:00`,
  );

  useEffect(() => {
    setCountdown(
      `${
        durationInMinutes < 10 ? "0" + durationInMinutes : durationInMinutes
      }:00`,
    );
  }, [durationInMinutes]);

  const durationToMs = useMemo(
    () => durationInMinutes * 1000 * 60,
    [durationInMinutes],
  );
  const isCompleted = useMemo(() => {
    if (isBlockComplete) return true;
    const completed = progress >= 100;
    setIsCompleted(completed);
    return completed;
  }, [progress, isBlockComplete]);

  const countdownTimer = () => {
    // get the number of seconds that have elapsed since called
    const diff =
      durationInMinutes * 60 - (((Date.now() - startTime) / 1000) | 0);

    let minutes: string | number = (diff / 60) | 0;
    let seconds: string | number = diff % 60 | 0;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    setCountdown(`${minutes}:${seconds}`);

    if (diff <= 0) {
      // add one second so that the count-down starts at the full duration
      // example 05:00 not 04:59
      setStartTime(Date.now() + 1000);
    }
  };

  const startTimer = () => {
    countdownTimer();
    if (!timerRef.current) {
      // @ts-ignore
      timerRef.current = setInterval(() => {
        if (!startTime) return;
        countdownTimer();
        setProgress(() => {
          const diff = (Date.now() - startTime) / durationToMs;
          return Math.min(diff * 100, 100);
        });
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (startTime === 0 || progress >= 100) {
      clearInterval(timerRef.current);
      return;
    }

    startTimer();
  }, [startTime, progress, timerRef.current]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        disabled={disabled}
        size={"large"}
        color={isCompleted ? "success" : "primary"}
        onClick={() => {
          setStartTime(Date.now());
        }}
      >
        {isCompleted ? <CheckCircleIcon /> : <PlayCircleIcon />}
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
          value={isCompleted ? 100 : progress}
        />
        {`${blockType} Cycle - ${isCompleted ? "00:00" : countdown}`}
      </Box>
    </Box>
  );
};

export default PomodoroCell;
