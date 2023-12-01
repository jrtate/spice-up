import React, { useEffect, useMemo } from "react";
import PomodoroBlock from "../../molecules/PomodoroBlock/PomodoroBlock";
import { DaysOfWeek, Task, TaskBlock } from "../../../models/Task";
import { useUpdateTaskBlockMutation } from "../../../api/TaskBlockApi";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import ReplayIcon from "@mui/icons-material/Replay";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useGetSettingsQuery } from "../../../api/SettingsApi";

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
  const {
    data: { workBlockDuration, breakBlockDuration },
  } = useGetSettingsQuery();

  const queryClient = useQueryClient();
  const upsertBlock = useUpdateTaskBlockMutation(queryClient);
  const remainderWorkBlock = useMemo(
    () => durationInMinutes % workBlockDuration,
    [workBlockDuration, durationInMinutes],
  );
  const currentDay = format(new Date(), "eeee");
  const fullDurationBlocks = useMemo(() => {
    return Array.from(
      Array(Math.floor(durationInMinutes / workBlockDuration)).keys(),
    ).map((x) => x + 1);
  }, [durationInMinutes, workBlockDuration]);
  const totalBlockCount = useMemo(() => {
    return fullDurationBlocks?.length + (remainderWorkBlock > 0 ? 1 : 0);
  }, [fullDurationBlocks, remainderWorkBlock]);

  const handleBlockCompletion = () => {
    if (!taskBlock) return;
    upsertBlock.mutate({
      id: taskBlock.id,
      taskId: taskBlock.taskId,
      totalBlocks: taskBlock.totalBlocks,
      completedBlocks: taskBlock?.completedBlocks + 1,
      dayOfWeek: taskBlock.dayOfWeek,
    });
  };

  const handleBlockUndo = () => {
    if (!taskBlock) return;
    upsertBlock.mutate({
      id: taskBlock.id,
      taskId: taskBlock.taskId,
      totalBlocks: taskBlock.totalBlocks,
      completedBlocks:
        taskBlock?.completedBlocks - 1 <= 0
          ? 0
          : taskBlock?.completedBlocks - 1,
      dayOfWeek: taskBlock.dayOfWeek,
    });
  };

  useEffect(() => {
    // Initialize block if one isn't saved
    if (
      (!taskBlock?.id && task.id && currentDay && totalBlockCount) ||
      totalBlockCount !== taskBlock?.totalBlocks
    ) {
      upsertBlock.mutate({
        id: undefined,
        taskId: task.id,
        totalBlocks: totalBlockCount,
        completedBlocks: 0,
        dayOfWeek: DaysOfWeek[currentDay],
      });
    }
  }, [taskBlock, task, currentDay, totalBlockCount]);

  return (
    <>
      <Tooltip title={"Reset last block"}>
        <IconButton onClick={() => handleBlockUndo()}>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={"Skip to next block"}>
        <IconButton onClick={() => handleBlockCompletion()}>
          <SkipNextIcon />
        </IconButton>
      </Tooltip>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {fullDurationBlocks?.map((blockId, index) => {
          return (
            <PomodoroBlock
              key={blockId}
              taskDurationInMinutes={workBlockDuration}
              breakDurationInMinutes={breakBlockDuration}
              isBlockComplete={taskBlock?.completedBlocks >= blockId}
              setIsBlockCompleted={() => handleBlockCompletion()}
              disabled={index > taskBlock?.completedBlocks}
              taskBlock={taskBlock}
            />
          );
        })}
        {remainderWorkBlock > 0 && (
          <PomodoroBlock
            isBlockComplete={taskBlock?.completedBlocks === totalBlockCount}
            setIsBlockCompleted={() => handleBlockCompletion()}
            taskDurationInMinutes={remainderWorkBlock}
            breakDurationInMinutes={breakBlockDuration}
            disabled={fullDurationBlocks.length !== taskBlock?.completedBlocks}
            taskBlock={taskBlock}
          />
        )}
      </Box>
    </>
  );
};

export default PomodoroTracker;
