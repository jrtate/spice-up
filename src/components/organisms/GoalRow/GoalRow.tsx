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
import SubGoalColumn from "../SubGoalColumn/SubGoalColumn";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAddGoalMutation,
  useDeleteGoalMutation,
  useEditGoalMutation,
} from "../../../api/GoalsApi";
import { Goal } from "../../../models/Goal";
import CheckIcon from "@mui/icons-material/Check";
import {
  useCompleteGoalMutation,
  useUnCompleteGoalMutation,
} from "../../../api/GoalCompletionApi";

interface GoalRowProps {
  goal?: Goal;
}

const GoalRow = ({ goal }: GoalRowProps) => {
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

  useEffect(() => {
    setDescription(goal?.description);
  }, [goal?.description]);

  const handleCompleteGoal = () => {
    if (!goal?.id) return;
    if (!goal?.isCompleted && currentGoalProgress >= 100) {
      completeGoal.mutate(goal.id);
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
        alignItems: "flex-start",
      }}
    >
      <Typography
        color={"text.secondary"}
        marginBottom={3}
        variant="h5"
        gutterBottom
      >
        {isGoalCreated ? "Goal:" : "Set a goal:"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        {!isEditing && isGoalCreated && (
          <Typography sx={{ marginRight: 1 }} variant="h6">
            {description}
          </Typography>
        )}

        {(isEditing || !isGoalCreated) && (
          <TextField
            sx={{ marginRight: 1 }}
            variant={"standard"}
            label="Goal"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
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
              onClick={() => {
                if (isGoalCreated) {
                  editGoal.mutate({ id: goal?.id, description });
                } else {
                  saveGoal.mutate({ description });
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
            <IconButton onClick={() => deleteGoal.mutate(goal?.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

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
            marginBottom: "2rem",
          }}
        >
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" value={currentGoalProgress} />
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
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              color={"text.secondary"}
              sx={{ maxWidth: 900 }}
              marginBottom={2}
              variant="h6"
            >
              {goal?.subGoals?.length > 0
                ? "Sub-goals:"
                : "Break down the main goal into essential sub-goals:"}
            </Typography>
          </Box>
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
                sx={{ display: "flex", justifyContent: "flex-start", gap: 4 }}
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
      <Divider
        sx={{ height: 1, width: "100%", marginTop: 12 }}
        variant="middle"
      />
    </Box>
  );
};

export default GoalRow;
