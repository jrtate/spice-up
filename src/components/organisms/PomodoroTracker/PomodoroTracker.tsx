import React, { useEffect, useMemo, useState } from "react";
import PomodoroBlock from "../../molecules/PomodoroBlock/PomodoroBlock";
import { DaysOfWeek, Task, TaskBlock } from "../../../models/Task";
import { useUpdateTaskBlockMutation } from "../../../api/TaskBlockApi";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

interface PomodoroTrackerProps {
  taskBlock: TaskBlock;
  task: Task;
  durationInMinutes: number;
}

const PomodoroTracker = ({
  task,
  taskBlock,
  durationInMinutes,
}: PomodoroTrackerProps) => {
  // todo: make these savable settings
  const pomodoroWorkBlockInMinutes = 15;
  const pomodoroBreakBlockInMinutes = 10;
  const queryClient = useQueryClient();
  const upsertBlock = useUpdateTaskBlockMutation(queryClient);
  const [completedBlocks, setCompletedBlocks] = useState<number[]>([]);
  const remainderWorkBlock = durationInMinutes % pomodoroWorkBlockInMinutes;
  const currentDay = format(new Date(), "eeee");
  const fullDurationBlocks = useMemo(() => {
    return Array.from(
      Array(Math.floor(durationInMinutes / pomodoroWorkBlockInMinutes)).keys(),
    ).map((x) => x + 1);
  }, [durationInMinutes, pomodoroWorkBlockInMinutes]);

  const handleBlockCompletion = (blockId: number) => {
    setCompletedBlocks((prevState) => [...prevState, blockId]);
  };

  useEffect(() => {
    upsertBlock.mutate({
      id: taskBlock?.id || undefined,
      taskId: task?.id,
      totalBlocks:
        fullDurationBlocks?.length + (remainderWorkBlock > 0 ? 1 : 0),
      completedBlocks: completedBlocks?.length,
      lastKnownDuration: 0,
      dayOfWeek: DaysOfWeek[currentDay],
    });
  }, [
    taskBlock,
    task,
    fullDurationBlocks,
    remainderWorkBlock,
    completedBlocks,
  ]);

  return (
    <>
      {fullDurationBlocks?.map((blockId, index) => {
        return (
          <PomodoroBlock
            key={blockId}
            taskDurationInMinutes={pomodoroWorkBlockInMinutes}
            breakDurationInMinutes={pomodoroBreakBlockInMinutes}
            setIsBlockCompleted={() => handleBlockCompletion(blockId)}
            disabled={index > completedBlocks.length}
          />
        );
      })}
      {remainderWorkBlock > 0 && (
        // fullDurationBlocks.length === completedBlocks.length && (
        <PomodoroBlock
          taskDurationInMinutes={remainderWorkBlock}
          breakDurationInMinutes={pomodoroBreakBlockInMinutes}
          disabled={fullDurationBlocks.length !== completedBlocks.length}
        />
      )}
    </>
  );
};

export default PomodoroTracker;
