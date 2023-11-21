import React, { useMemo } from "react";
import PomodoroCell from "components/molecules/PomodoroCell/PomodoroCell";

interface PomodoroTrackerProps {
  duration: number;
}

const PomodoroTracker = ({ duration }: PomodoroTrackerProps) => {
  const pomodoroWorkBlock = 15;
  const remainderWorkBlock = duration % pomodoroWorkBlock;
  return (
    <>
      {Array.from(Array(Math.floor(duration / pomodoroWorkBlock)).keys())?.map(
        () => {
          return <PomodoroCell duration={pomodoroWorkBlock} />;
        },
      )}
      {remainderWorkBlock > 0 && <PomodoroCell duration={remainderWorkBlock} />}
    </>
  );
};

export default PomodoroTracker;
