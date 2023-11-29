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
import AddIcon from "@mui/icons-material/Add";
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
  const isEditing = useMemo(() => goal?.id > 0, [goal]);
  const currentGoalProgress = useMemo(
    () =>
      Math.round(
        (goal?.subGoals?.filter((x) => x?.isCompleted).length /
          goal?.subGoals?.length) *
          100,
      ),
    [goal?.subGoals],
  );
  const queryClient = useQueryClient();
  const saveGoal = useAddGoalMutation(queryClient);
  const editGoal = useEditGoalMutation(queryClient);
  const deleteGoal = useDeleteGoalMutation(queryClient);
  const completeGoal = useCompleteGoalMutation(queryClient);
  const unCompleteGoal = useUnCompleteGoalMutation(queryClient);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setDescription(goal?.description);
  }, [goal]);

  const handleCompleteClick = () => {
    if (!goal?.isCompleted) {
      completeGoal.mutate(goal?.id);
    } else if (goal?.isCompleted) {
      unCompleteGoal.mutate(goal?.id);
    }
  };

  return (
    <Box
      p={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography marginBottom={3} variant="h5" gutterBottom>
        Set a goal:
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <TextField
          sx={{ marginRight: 1 }}
          variant={"standard"}
          label="Goal"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        {isEditing ? (
          <Tooltip title="Edit Goal">
            <IconButton
              onClick={() => editGoal.mutate({ id: goal?.id, description })}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Create Goal">
            <IconButton onClick={() => saveGoal.mutate({ description })}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Delete Goal">
          <span>
            <IconButton
              disabled={!isEditing}
              onClick={() => deleteGoal.mutate(goal?.id)}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
        {isEditing && (
          <Tooltip title="Complete">
            <IconButton
              color={goal?.isCompleted ? "success" : "primary"}
              size="small"
              onClick={() => handleCompleteClick()}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
        )}
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" value={currentGoalProgress} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >{`${currentGoalProgress}%`}</Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            color={"text.secondary"}
            sx={{ maxWidth: 900 }}
            marginBottom={3}
            variant="h6"
          >
            Break down the main goal into essential sub-goals:
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 4,
            marginLeft: 4,
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

      <Divider
        sx={{ height: 1, width: "100%", marginTop: 12 }}
        variant="middle"
      />
    </Box>
  );
};

export default GoalRow;
