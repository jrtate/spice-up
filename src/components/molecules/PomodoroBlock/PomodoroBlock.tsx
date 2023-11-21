import React, { useState, useEffect } from "react";
import PomodoroCell from "../PomodoroCell/PomodoroCell";

interface PomodoroBlockProps {
  taskDurationInMinutes: number;
  breakDurationInMinutes: number;
  setIsBlockCompleted?: () => void;
}

const PomodoroBlock = ({
  taskDurationInMinutes,
  breakDurationInMinutes,
  setIsBlockCompleted,
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
        durationInMinutes={taskDurationInMinutes}
        blockType={"Task"}
        setIsCompleted={setIsTaskBlockComplete}
      />
      {isTaskBlockComplete && (
        <PomodoroCell
          durationInMinutes={breakDurationInMinutes}
          blockType={"Break"}
          setIsCompleted={setIsBreakBlockComplete}
        />
      )}
    </>
  );
};

export default PomodoroBlock;
