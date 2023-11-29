import React, { useState, useEffect } from "react";
import PomodoroCell from "../PomodoroCell/PomodoroCell";

interface PomodoroBlockProps {
  taskDurationInMinutes: number;
  breakDurationInMinutes: number;
  setIsBlockCompleted?: () => void;
  disabled?: boolean;
}

const PomodoroBlock = ({
  taskDurationInMinutes,
  breakDurationInMinutes,
  setIsBlockCompleted,
  disabled,
}: PomodoroBlockProps) => {
  const [isTaskBlockComplete, setIsTaskBlockComplete] =
    useState<boolean>(false);
  const [isBreakBlockComplete, setIsBreakBlockComplete] =
    useState<boolean>(false);

  useEffect(() => {
    if (isBreakBlockComplete) setIsBlockCompleted();
  }, [isBreakBlockComplete]);

  return (
    <>
      <PomodoroCell
        disabled={disabled}
        durationInMinutes={taskDurationInMinutes}
        blockType={"Task"}
        setIsCompleted={setIsTaskBlockComplete}
      />
      <PomodoroCell
        disabled={!isTaskBlockComplete || disabled}
        durationInMinutes={breakDurationInMinutes}
        blockType={"Break"}
        setIsCompleted={setIsBreakBlockComplete}
      />
    </>
  );
};

export default PomodoroBlock;
