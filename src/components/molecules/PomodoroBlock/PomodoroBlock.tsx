import React, { useState, useEffect } from "react";
import PomodoroCell from "../PomodoroCell/PomodoroCell";

interface PomodoroBlockProps {
  taskDurationInMinutes: number;
  breakDurationInMinutes: number;
  isBlockComplete: boolean;
  setIsBlockCompleted: () => void;
  disabled?: boolean;
}

const PomodoroBlock = ({
  taskDurationInMinutes,
  breakDurationInMinutes,
  isBlockComplete,
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
        disabled={disabled && !isBlockComplete}
        durationInMinutes={taskDurationInMinutes}
        blockType={"Task"}
        setIsCompleted={setIsTaskBlockComplete}
        isBlockComplete={isBlockComplete}
      />
      <PomodoroCell
        disabled={(!isTaskBlockComplete || disabled) && !isBlockComplete}
        durationInMinutes={breakDurationInMinutes}
        blockType={"Break"}
        setIsCompleted={setIsBreakBlockComplete}
        isBlockComplete={isBlockComplete}
      />
    </>
  );
};

export default PomodoroBlock;
