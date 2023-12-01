import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { StyledCard } from "./styles";
import { DaysOfWeek, Task, TaskBlock } from "models/Task";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTaskMutation } from "api/TasksApi";
import { useToast } from "hooks/useToast";
import EditTaskModal from "components/organisms/EditTaskModal/EditTaskModal";
import { format, formatDuration, intervalToDuration } from "date-fns";
import {
  useCompleteTaskMutation,
  useUnCompleteTaskMutation,
} from "api/TaskCompletionApi";
import { useUpdateTaskBlockMutation } from "../../../api/TaskBlockApi";

interface CurrentCardProps {
  task: Task;
  taskBlock: TaskBlock;
}

const CurrentCard = ({ task, taskBlock }: CurrentCardProps) => {
  const queryClient = useQueryClient();
  const upsertBlock = useUpdateTaskBlockMutation(queryClient);
  const duration = useMemo(
    () =>
      formatDuration(
        intervalToDuration({ start: 0, end: task.duration * 60000 }),
      ),
    [task.duration],
  );
  const [showEditTaskModal, setShowEditTaskModal] = useState<boolean>(false);
  const deleteTask = useDeleteTaskMutation(queryClient);
  const completeTask = useCompleteTaskMutation(queryClient);
  const unCompleteTask = useUnCompleteTaskMutation(queryClient);
  const { handleSetShowToast } = useToast();

  const handleDeleteTask = () => {
    deleteTask.mutate(task.id);
    handleSetShowToast("Task successfully deleted.");
  };

  useEffect(() => {
    console.log("stas", taskBlock);
    if (taskBlock.completedBlocks === taskBlock.totalBlocks) {
      const completedDay = DaysOfWeek[format(new Date(), "eeee")];
      completeTask.mutate({ id: task.id, completedDay });
    } else {
      unCompleteTask.mutate(task.id);
    }
  }, [task.id, taskBlock.completedBlocks, taskBlock.totalBlocks]);

  const handleCompleteClick = () => {
    if (!task.isCompleted) {
      const completedDay = DaysOfWeek[format(new Date(), "eeee")];
      completeTask.mutate({ id: task.id, completedDay });
      if (!taskBlock) return;
      upsertBlock.mutate({
        id: taskBlock.id,
        taskId: taskBlock.taskId,
        totalBlocks: taskBlock.totalBlocks,
        completedBlocks: taskBlock?.totalBlocks,
        dayOfWeek: taskBlock.dayOfWeek,
      });
    } else if (task.isCompleted) {
      unCompleteTask.mutate(task.id);
      upsertBlock.mutate({
        id: taskBlock.id,
        taskId: taskBlock.taskId,
        totalBlocks: taskBlock.totalBlocks,
        completedBlocks: 0,
        dayOfWeek: taskBlock.dayOfWeek,
      });
    }
  };

  return (
    <Box sx={{ m: 2 }}>
      <EditTaskModal
        show={showEditTaskModal}
        closeModal={() => setShowEditTaskModal(false)}
        task={task}
      />

      <StyledCard>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {task.isRecurring ? "Re-occurring" : "One-time"} Task
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={task.isCompleted ? { textDecoration: "line-through" } : {}}
          >
            {task.description}
          </Typography>
          <Typography mt={1} mb={-2} color="text.secondary">
            {duration}
          </Typography>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Button size="small" onClick={() => setShowEditTaskModal(true)}>
                Edit
              </Button>
              <Button
                size="small"
                color={"secondary"}
                onClick={() => handleDeleteTask()}
              >
                Delete
              </Button>
            </Box>
            <Tooltip title={task.isCompleted ? "Un-Complete" : "Complete"}>
              <IconButton
                color={task.isCompleted ? "success" : "primary"}
                size="small"
                onClick={() => handleCompleteClick()}
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </StyledCard>
    </Box>
  );
};

export default CurrentCard;
