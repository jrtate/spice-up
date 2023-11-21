import React, { useMemo, useState } from "react";
import PomodoroBlock from "../../molecules/PomodoroBlock/PomodoroBlock";

interface PomodoroTrackerProps {
  durationInMinutes: number;
}

const PomodoroTracker = ({ durationInMinutes }: PomodoroTrackerProps) => {
  // todo: make these savable settings
  const pomodoroWorkBlockInMinutes = 15;
  const pomodoroBreakBlockInMinutes = 10;

  const [completedBlocks, setCompletedBlocks] = useState<number[]>([]);
  const remainderWorkBlock = durationInMinutes % pomodoroWorkBlockInMinutes;
  const fullDurationBlocks = useMemo(() => {
    return Array.from(
      Array(Math.floor(durationInMinutes / pomodoroWorkBlockInMinutes)).keys(),
    ).map((x) => x + 1);
  }, [durationInMinutes, pomodoroWorkBlockInMinutes]);

  const handleBlockCompletion = (blockId: number) => {
    setCompletedBlocks((prevState) => [...prevState, blockId]);
  };

  const shouldBlockRender = (blockId: number) =>
    blockId === 1 || completedBlocks.includes(blockId - 1);

  return (
    <>
      {fullDurationBlocks?.map((blockId) => {
        return (
          shouldBlockRender(blockId) && (
            <PomodoroBlock
              key={blockId}
              taskDurationInMinutes={pomodoroWorkBlockInMinutes}
              breakDurationInMinutes={pomodoroBreakBlockInMinutes}
              setIsBlockCompleted={() => handleBlockCompletion(blockId)}
            />
          )
        );
      })}
      {remainderWorkBlock > 0 &&
        fullDurationBlocks.length === completedBlocks.length && (
          <PomodoroBlock
            taskDurationInMinutes={remainderWorkBlock}
            breakDurationInMinutes={pomodoroBreakBlockInMinutes}
          />
        )}
    </>
  );
};

export default PomodoroTracker;
