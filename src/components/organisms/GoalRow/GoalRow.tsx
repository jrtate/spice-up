import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  LinearProgress,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import SubGoalColumn from "../SubGoalColumn/SubGoalColumn";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAddGoalMutation,
  useDeleteGoalMutation,
  useEditGoalMutation,
} from "../../../api/GoalsApi";
import { Goal } from "../../../models/Goal";
import {
  useCompleteGoalMutation,
  useUnCompleteGoalMutation,
} from "../../../api/GoalCompletionApi";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { useToast } from "../../../hooks/useToast";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface GoalRowProps {
  goal?: Goal;
  onSaveGoal?: () => void;
}

const GoalRow = ({ goal, onSaveGoal }: GoalRowProps) => {
  const isGoalCreated = useMemo(() => goal?.id > 0, [goal]);
  const currentGoalProgress = useMemo(
    () =>
      Math.round(
        (goal?.subGoals?.filter((x) => x?.isCompleted).length /
          goal?.subGoals?.length) *
          100,
      ) || 0,
    [goal?.subGoals],
  );
  const queryClient = useQueryClient();
  const saveGoal = useAddGoalMutation(queryClient);
  const editGoal = useEditGoalMutation(queryClient);
  const deleteGoal = useDeleteGoalMutation(queryClient);
  const completeGoal = useCompleteGoalMutation(queryClient);
  const unCompleteGoal = useUnCompleteGoalMutation(queryClient);
  const [description, setDescription] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [shouldCollapse, setShouldCollapse] = useState<boolean>(false);
  const { handleSetShowToast } = useToast();

  useEffect(() => {
    setDescription(goal?.description);
  }, [goal?.description]);

  const handleCompleteGoal = () => {
    if (!goal?.id) return;
    if (!goal?.isCompleted && currentGoalProgress >= 100) {
      completeGoal.mutate(goal.id);
      handleSetShowToast("Goal finished!");
    } else if (goal?.isCompleted && currentGoalProgress < 100) {
      unCompleteGoal.mutate(goal.id);
    }
  };

  useEffect(() => {
    handleCompleteGoal();
  }, [currentGoalProgress]);

  return (
    <Box
      p={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ConfirmationModal
        isLoading={deleteGoal.isPending}
        headerText={`Are you sure you want to delete the following goal?`}
        bodyText={`${goal?.description}`}
        show={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
        handleConfirmClick={() => {
          deleteGoal.mutate(goal?.id);
          handleSetShowToast("The goal has been deleted.");
        }}
        confirmButtonText={"Delete Goal"}
      />

      {!isGoalCreated && (
        <Typography
          color={"#f5f5f5"}
          marginBottom={3}
          variant="h5"
          gutterBottom
        >
          Set a goal:
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Tooltip title={"Toggle Show/Hide"}>
          <IconButton onClick={() => setShouldCollapse(!shouldCollapse)}>
            {shouldCollapse ? <AddIcon /> : <RemoveIcon />}
          </IconButton>
        </Tooltip>
        {!isEditing && isGoalCreated && (
          <Typography
            color={"#f5f5f5"}
            sx={{
              marginX: 1,
              textDecoration: goal?.isCompleted ? "line-through" : "none",
            }}
            variant="h5"
          >
            {description}
          </Typography>
        )}

        {(isEditing || !isGoalCreated) && (
          <TextField
            autoFocus
            sx={{ marginRight: 1 }}
            variant={"standard"}
            label="Goal"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            inputProps={{ maxLength: 50 }}
          />
        )}
        {isGoalCreated && !isEditing ? (
          <Tooltip title="Edit Goal">
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Save Goal">
            <IconButton
              disabled={!description}
              onClick={() => {
                if (isGoalCreated) {
                  editGoal.mutate({ id: goal?.id, description });
                  handleSetShowToast("Goal saved.");
                } else {
                  saveGoal.mutate({ description });
                  onSaveGoal?.();
                  handleSetShowToast("Goal created.");
                }
                setIsEditing(false);
              }}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
        )}
        {!isEditing && isGoalCreated && (
          <Tooltip title="Delete Goal">
            <IconButton onClick={() => setShowDeleteModal(true)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {isEditing && (
          <Tooltip title={"Cancel"}>
            <IconButton
              onClick={() => {
                setDescription(goal?.description);
                setIsEditing(false);
              }}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {!shouldCollapse && (
        <>
          {isGoalCreated && goal?.subGoals?.length > 0 && (
            <Typography variant="subtitle1" color="text.secondary">
              Current Progress:
            </Typography>
          )}
          {isGoalCreated && goal?.subGoals?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: "35rem",
                textWrap: "nowrap",
              }}
            >
              <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                  sx={{ height: "10px", borderRadius: "4px" }}
                  variant="determinate"
                  value={currentGoalProgress}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                >{`${currentGoalProgress}%`}</Typography>
              </Box>
            </Box>
          )}

          {isGoalCreated && (
            <Box
              mt={8}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              {!goal?.subGoals?.length && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    color={"#f5f5f5"}
                    sx={{ maxWidth: 900 }}
                    marginBottom={2}
                    variant="h6"
                  >
                    Break down "{goal?.description}" into essential sub-goals:
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 4,
                }}
              >
                {goal?.subGoals?.map((subGoal) => (
                  <Box
                    key={subGoal?.id}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 4,
                    }}
                  >
                    <SubGoalColumn goalId={goal.id} subGoal={subGoal} />
                    <Divider
                      orientation="vertical"
                      sx={{ width: "1px", height: "100%" }}
                      variant="middle"
                    />
                  </Box>
                ))}
                <SubGoalColumn goalId={goal?.id} />
              </Box>
            </Box>
          )}
        </>
      )}
      <Divider
        sx={{ height: 1, width: "100%", marginTop: 12 }}
        variant="middle"
      />
    </Box>
  );
};

export default GoalRow;
