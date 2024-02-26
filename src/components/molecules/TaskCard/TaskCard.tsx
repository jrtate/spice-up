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
import EditTaskModal from "components/organisms/EditTaskModal/EditTaskModal";
import { formatDuration, formatRelative, intervalToDuration } from "date-fns";
import { useGetTaskCompletionCount } from "../../../api/TaskCompletionApi";
import ConfirmationModal from "../../organisms/ConfirmationModal/ConfirmationModal";
import { enUS } from "date-fns/locale";

interface TaskDisplayCardProps {
  task: Task;
  showCompletionStats?: boolean;
}

const TaskCard = ({ task, showCompletionStats }: TaskDisplayCardProps) => {
  const formatRelativeLocale = {
    lastWeek: "'last' eeee",
    yesterday: "'Yesterday",
    today: "'Today",
    tomorrow: "'Tomorrow",
    nextWeek: "eeee",
    other: "P",
  };
  const locale = {
    ...enUS,
    formatRelative: (token) => formatRelativeLocale[token],
  };

  const queryClient = useQueryClient();
  const duration = useMemo(
    () =>
      formatDuration(
        intervalToDuration({ start: 0, end: task.duration * 60000 }),
      ),
    [task.duration],
  );
  const { data: taskCompletions } = useGetTaskCompletionCount(task.id);
  const [showEditTaskModal, setShowEditTaskModal] = useState<boolean>(false);
  const deleteTask = useDeleteTaskMutation(queryClient);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const { handleSetShowToast } = useToast();

  const handleDeleteTask = () => {
    deleteTask.mutate(task.id);
    handleSetShowToast("Task successfully deleted.");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <ConfirmationModal
        isLoading={deleteTask.isPending}
        headerText={`Are you sure you want to delete the following task?`}
        bodyText={`${task?.description}`}
        show={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
        handleConfirmClick={() => handleDeleteTask()}
        confirmButtonText={"Delete Task"}
      />
      <EditTaskModal
        show={showEditTaskModal}
        closeModal={() => setShowEditTaskModal(false)}
        task={task}
      />

      <StyledCard>
        <CardContent sx={{ height: "100%", backgroundColor: "rgb(20 20 20)" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {task.isRecurring ? "Re-occurring" : "One-time"} Task
          </Typography>
          <Typography variant="h6" component="div">
            {task?.description?.toUpperCase()}
          </Typography>
          {!!duration && (
            <Typography
              mt={1}
              mb={1}
              variant={"subtitle1"}
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              {duration}
            </Typography>
          )}

          {!task?.isRecurring && task?.scheduledDay && !task.isCompleted && (
            <Typography
              mt={1}
              mb={1}
              variant={"body2"}
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              Due{" "}
              {formatRelative(new Date(task.scheduledDay), new Date(), {
                locale,
              })}
            </Typography>
          )}
          {showCompletionStats && task?.isRecurring && (
            <Typography
              mt={1}
              variant={"body2"}
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              Completions: {taskCompletions || 0}
            </Typography>
          )}
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            backgroundColor: "rgb(20 20 20)",
          }}
        >
          <Button size="small" onClick={() => setShowEditTaskModal(true)}>
            Edit
          </Button>
          <Button
            size="small"
            color={"secondary"}
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
        </CardActions>
      </StyledCard>
    </Box>
  );
};

export default TaskCard;
