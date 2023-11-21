import React from "react";
import PomodoroCell from "components/molecules/PomodoroCell/PomodoroCell";

interface PomodoroTrackerProps {
  durationInMinutes: number;
}

const PomodoroTracker = ({ durationInMinutes }: PomodoroTrackerProps) => {
  // todo: make these savable settings
  const pomodoroWorkBlockInMinutes = 15;
  const pomodoroBreakBlockInMinutes = 10;
  const remainderWorkBlock = durationInMinutes % pomodoroWorkBlockInMinutes;
  return (
    <>
      {Array.from(
        Array(
          Math.floor(durationInMinutes / pomodoroWorkBlockInMinutes),
        ).keys(),
      )?.map(() => {
        return (
          <>
            <PomodoroCell
              durationInMinutes={pomodoroWorkBlockInMinutes}
              blockType={"Task"}
            />
            <PomodoroCell
              durationInMinutes={pomodoroBreakBlockInMinutes}
              blockType={"Break"}
            />
          </>
        );
      })}
      {remainderWorkBlock > 0 && (
        <>
          <PomodoroCell
            durationInMinutes={remainderWorkBlock}
            blockType={"Task"}
          />
          <PomodoroCell
            durationInMinutes={pomodoroBreakBlockInMinutes}
            blockType={"Break"}
          />
        </>
      )}
    </>
  );
};

export default PomodoroTracker;
