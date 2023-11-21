import React, { useEffect, useState, useMemo, useRef } from "react";
import { Box, IconButton, LinearProgress } from "@mui/material";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface PomodoroCellProps {
  durationInMinutes: number; // in minutes
  blockType: "Break" | "Task";
}

const PomodoroCell = ({ durationInMinutes, blockType }: PomodoroCellProps) => {
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [countdown, setCountdown] = useState<string>(
    `${
      durationInMinutes < 10 ? "0" + durationInMinutes : durationInMinutes
    }:00`,
  );
  const timerRef = useRef();
  const durationToMs = useMemo(
    () => durationInMinutes * 1000 * 60,
    [durationInMinutes],
  );

  const countdownTimer = () => {
    // get the number of seconds that have elapsed since
    // startTimer() was called
    const diff =
      durationInMinutes * 60 - (((Date.now() - startTime) / 1000) | 0);

    // does the same job as parseInt truncates the float
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
    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
      <IconButton
        color="primary"
        onClick={() => {
          setStartTime(Date.now());
        }}
      >
        {progress < 100 ? <NotStartedIcon /> : <CheckCircleIcon />}
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
          sx={{ minWidth: 150 }}
          variant="determinate"
          value={progress}
        />
        {`${blockType} Cycle - ${countdown}`}
      </Box>
    </Box>
  );
};

export default PomodoroCell;
