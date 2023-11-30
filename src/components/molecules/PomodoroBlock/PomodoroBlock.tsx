import React, { useState, useEffect } from "react";
import PomodoroCell from "../PomodoroCell/PomodoroCell";
import { TaskBlock } from "../../../models/Task";

interface PomodoroBlockProps {
  taskDurationInMinutes: number;
  breakDurationInMinutes: number;
  isBlockComplete: boolean;
  setIsBlockCompleted: () => void;
  disabled?: boolean;
  taskBlock: TaskBlock;
}

const PomodoroBlock = ({
  taskDurationInMinutes,
  breakDurationInMinutes,
  isBlockComplete,
  setIsBlockCompleted,
  disabled,
  taskBlock,
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
        taskBlock={taskBlock}
      />
      <PomodoroCell
        disabled={(!isTaskBlockComplete || disabled) && !isBlockComplete}
        durationInMinutes={breakDurationInMinutes}
        blockType={"Break"}
        setIsCompleted={setIsBreakBlockComplete}
        isBlockComplete={isBlockComplete}
        taskBlock={taskBlock}
      />
    </>
  );
};

export default PomodoroBlock;
