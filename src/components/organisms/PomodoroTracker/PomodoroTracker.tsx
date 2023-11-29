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
  const pomodoroBreakBlockInMinutes = 1;
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
  const totalBlockCount = useMemo(() => {
    return fullDurationBlocks?.length + (remainderWorkBlock > 0 ? 1 : 0);
  }, [fullDurationBlocks, remainderWorkBlock]);

  const handleBlockCompletion = (blockId: number) => {
    if (!taskBlock) return;
    upsertBlock.mutate({
      id: taskBlock.id,
      taskId: taskBlock.taskId,
      totalBlocks: taskBlock.totalBlocks,
      completedBlocks: completedBlocks?.length + 1,
      dayOfWeek: taskBlock.dayOfWeek,
    });
  };

  useEffect(() => {
    setCompletedBlocks(Array.from(Array(taskBlock?.completedBlocks)));
  }, [taskBlock?.completedBlocks]);

  useEffect(() => {
    // Initialize block if one isn't saved
    if (!taskBlock?.id && task.id && currentDay && totalBlockCount)
      upsertBlock.mutate({
        id: undefined,
        taskId: task.id,
        totalBlocks: totalBlockCount,
        completedBlocks: 0,
        dayOfWeek: DaysOfWeek[currentDay],
      });
  }, [taskBlock, task, currentDay, totalBlockCount]);

  return (
    <>
      {fullDurationBlocks?.map((blockId, index) => {
        return (
          <PomodoroBlock
            key={blockId}
            taskDurationInMinutes={pomodoroWorkBlockInMinutes}
            breakDurationInMinutes={pomodoroBreakBlockInMinutes}
            isBlockComplete={completedBlocks.includes(blockId)}
            setIsBlockCompleted={() => handleBlockCompletion(blockId)}
            disabled={index > completedBlocks.length}
          />
        );
      })}
      {remainderWorkBlock > 0 && (
        <PomodoroBlock
          isBlockComplete={completedBlocks.length === totalBlockCount}
          setIsBlockCompleted={() =>
            handleBlockCompletion(completedBlocks.length + 1)
          }
          taskDurationInMinutes={remainderWorkBlock}
          breakDurationInMinutes={pomodoroBreakBlockInMinutes}
          disabled={fullDurationBlocks.length !== completedBlocks.length}
        />
      )}
    </>
  );
};

export default PomodoroTracker;
