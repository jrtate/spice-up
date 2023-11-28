import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { StyledCard } from "./styles";
import { Task } from "../../../models/Task";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTaskMutation } from "../../../api/TasksApi";
import { useToast } from "hooks/useToast";
import EditTaskModal from "pages/Plan/EditTaskModal/EditTaskModal";
import { formatDuration, intervalToDuration } from "date-fns";
import { useGetCompletionCount } from "../../../api/TaskCompletionApi";

interface TaskDisplayCardProps {
  task: Task;
  showCompletionStats?: boolean;
}

const TaskCard = ({ task, showCompletionStats }: TaskDisplayCardProps) => {
  const queryClient = useQueryClient();
  const duration = useMemo(
    () =>
      formatDuration(
        intervalToDuration({ start: 0, end: task.duration * 60000 }),
      ),
    [task.duration],
  );
  const { data: taskCompletions } = useGetCompletionCount(task.id);
  const [showEditTaskModal, setShowEditTaskModal] = useState<boolean>(false);
  const deleteTask = useDeleteTaskMutation(queryClient);
  const { handleSetShowToast } = useToast();

  const handleDeleteTask = () => {
    deleteTask.mutate(task.id);
    handleSetShowToast("Task successfully deleted.");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <EditTaskModal
        show={showEditTaskModal}
        closeModal={() => setShowEditTaskModal(false)}
        task={task}
      />

      <StyledCard>
        <CardContent sx={{ height: "100%" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {task.isRecurring ? "Re-occurring" : "One-time"} Task
          </Typography>
          <Typography variant="h6" component="div">
            {task?.description?.toUpperCase()}
          </Typography>
          <Typography
            mt={1}
            mb={2}
            variant={"subtitle1"}
            color="text.secondary"
          >
            Duration: {duration}.
          </Typography>
          {showCompletionStats && (
            <Typography mt={1} variant={"body1"} color="text.secondary">
              Number of times completed: {taskCompletions || 0}
            </Typography>
          )}
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
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
        </CardActions>
      </StyledCard>
    </Box>
  );
};

export default TaskCard;
