import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { StyledCard } from "./styles";
import { Task } from "../../../models/task";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTaskMutation } from "../../../api/TasksApi";
import { useToast } from "hooks/useToast";
import EditTaskModal from "pages/Plan/EditTaskModal/EditTaskModal";
import { formatDuration, intervalToDuration } from "date-fns";

interface TaskDisplayCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskDisplayCardProps) => {
  const queryClient = useQueryClient();
  const duration = useMemo(
    () =>
      formatDuration(
        intervalToDuration({ start: 0, end: task.duration * 60000 }),
      ),
    [task.duration],
  );
  const [showEditTaskModal, setShowEditTaskModal] = useState<boolean>(false);
  const deleteTask = useDeleteTaskMutation(queryClient);
  const { handleSetShowToast } = useToast();

  const handleDeleteTask = () => {
    deleteTask.mutate(task.id);
    handleSetShowToast("Task successfully deleted.");
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
          <Typography variant="h5" component="div">
            {task.description}
          </Typography>
          <Typography mt={1} mb={-2} color="text.secondary">
            {duration}
          </Typography>
        </CardContent>
        <CardActions>
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
