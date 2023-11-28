import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
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

interface GoalRowProps {
  goal?: Goal;
}

const GoalRow = ({ goal }: GoalRowProps) => {
  const isEditing = useMemo(() => goal?.id > 0, [goal]);
  const queryClient = useQueryClient();
  const saveGoal = useAddGoalMutation(queryClient);
  const editGoal = useEditGoalMutation(queryClient);
  const deleteGoal = useDeleteGoalMutation(queryClient);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setDescription(goal?.description);
  }, [goal]);

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
        marginBottom={3}
        variant="h5"
        color="text.secondary"
        gutterBottom
      >
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
          <IconButton onClick={() => deleteGoal.mutate(goal?.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box>
        <Typography
          marginBottom={3}
          variant="h6"
          color="text.secondary"
          gutterBottom
        >
          What will you need to do to accomplish this goal?
        </Typography>
        <Box sx={{ display: "flex", gap: 4, marginLeft: 4 }}>
          {goal?.subGoals?.map((subGoal, i) => (
            <Box key={subGoal.id}>
              {i > 0 && <Divider orientation="vertical" flexItem />}
              <SubGoalColumn goalId={goal.id} subGoal={subGoal} />
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
