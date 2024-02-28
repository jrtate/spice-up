import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import AddIcon from "@mui/icons-material/Add";
import { SubGoal } from "../../../models/Goal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAddSubGoalMutation,
  useEditSubGoalMutation,
  useDeleteSubGoalMutation,
} from "../../../api/SubGoalsApi";
import TaskCard from "../../molecules/TaskCard/TaskCard";
import CheckIcon from "@mui/icons-material/Check";
import {
  useCompleteSubGoalMutation,
  useUnCompleteSubGoalMutation,
} from "../../../api/SubGoalCompletionApi";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { useToast } from "../../../hooks/useToast";

interface GoalColumnProps {
  goalId?: number;
  subGoal?: SubGoal;
}

const SubGoalColumn = ({ goalId, subGoal }: GoalColumnProps) => {
  const isSubGoalCreated = useMemo(() => subGoal?.id > 0, [subGoal]);
  const queryClient = useQueryClient();
  const saveSubGoal = useAddSubGoalMutation(queryClient);
  const editSubGoal = useEditSubGoalMutation(queryClient);
  const deleteSubGoal = useDeleteSubGoalMutation(queryClient);
  const completeSubGoal = useCompleteSubGoalMutation(queryClient);
  const unCompleteSubGoal = useUnCompleteSubGoalMutation(queryClient);
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const { handleSetShowToast } = useToast();

  useEffect(() => {
    if (isSubGoalCreated) setDescription(subGoal?.description);
  }, [subGoal]);

  const handleCompleteClick = () => {
    if (!subGoal?.isCompleted) {
      completeSubGoal.mutate(subGoal?.id);
      handleSetShowToast("Sub-goal finished!");
    } else if (subGoal?.isCompleted) {
      unCompleteSubGoal.mutate(subGoal?.id);
    }
  };

  /*useEffect(() => {
    // todo: consider moving this to BE when a task is completed
    if (subGoal?.tasks?.some((task) => !task?.isCompleted)) {
      if (!subGoal?.isCompleted) return;
      unCompleteSubGoal.mutate(subGoal?.id);
    } else {
      completeSubGoal.mutate(subGoal?.id);
    }
  }, [subGoal?.tasks]);*/

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "15rem",
      }}
    >
      <ConfirmationModal
        isLoading={deleteSubGoal.isPending}
        headerText={`Are you sure you want to delete the following sub-goal?`}
        bodyText={`${subGoal?.description}`}
        show={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
        handleConfirmClick={() => {
          deleteSubGoal.mutate(subGoal?.id);
          handleSetShowToast("The sub-goal has been deleted.");
        }}
        confirmButtonText={"Delete Sub-Goal"}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "4rem",
          marginBottom: 4,
        }}
      >
        {!isEditing && isSubGoalCreated && (
          <Typography
            color={"#f5f5f5"}
            sx={{
              marginRight: 1,
              textDecoration: subGoal?.isCompleted ? "line-through" : "none",
              maxWidth: "8rem",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
            variant="h6"
          >
            {description}
          </Typography>
        )}
        {(isEditing || !isSubGoalCreated) && (
          <TextField
            autoFocus
            sx={{ marginRight: 1 }}
            variant={"outlined"}
            label="Sub-goal"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            inputProps={{ maxLength: 50 }}
          />
        )}
        {isSubGoalCreated && !isEditing ? (
          <Tooltip title="Edit Sub-goal">
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Save Sub-goal">
            <span>
              <IconButton
                disabled={!description}
                onClick={() => {
                  if (isSubGoalCreated) {
                    editSubGoal.mutate({ id: subGoal?.id, description });
                    handleSetShowToast("Sub-goal saved.");
                  } else {
                    saveSubGoal.mutate({ goalId, description });
                    handleSetShowToast("Sub-goal created.");
                  }
                  setDescription("");
                  setIsEditing(false);
                }}
              >
                <SaveIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
        {isSubGoalCreated && !isEditing && (
          <Tooltip title="Delete Sub-goal">
            <span>
              <IconButton
                disabled={!isSubGoalCreated}
                onClick={() => setShowDeleteModal(true)}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
        {isSubGoalCreated && !isEditing && (
          <Tooltip title="Complete">
            <IconButton
              color={subGoal?.isCompleted ? "success" : "primary"}
              size="small"
              onClick={() => handleCompleteClick()}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
        )}
        {isEditing && (
          <Tooltip title={"Cancel"}>
            <IconButton
              onClick={() => {
                setDescription(subGoal?.description);
                setIsEditing(false);
              }}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {!subGoal?.isCompleted ? (
        subGoal?.tasks?.map((task) => (
          <Box key={task.id} marginBottom={2} width={"100%"}>
            <TaskCard task={task} showCompletionStats={true} />
          </Box>
        ))
      ) : (
        <Typography sx={{ marginTop: "1rem" }} variant={"h6"}>
          Sub-goal completed!
        </Typography>
      )}

      {isSubGoalCreated && !subGoal?.isCompleted && (
        <Button
          sx={{ marginTop: "1rem" }}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setShowAddTaskModal(true)}
        >
          Add Task
        </Button>
      )}
      <AddTaskModal
        show={showAddTaskModal}
        closeModal={() => setShowAddTaskModal(false)}
        subGoalId={subGoal?.id}
      />
    </Box>
  );
};

export default SubGoalColumn;
