import React, { useState } from "react";
import {
  Box,
  Divider,
  Fab,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GoalColumn from "../GoalColumn/GoalColumn";

interface GoalRowProps {}

const GoalRow = ({}: GoalRowProps) => {
  const [goal, setGoal] = useState<string>("");
  const [subGoals, setSubGoals] = useState<number[]>([]);

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
          variant={"outlined"}
          label="Goal"
          value={goal}
          onChange={(e) => {
            setGoal(e.target.value);
          }}
        />
        <Tooltip title="Create Goal">
          <IconButton
            color="success"
            onClick={() =>
              setSubGoals((prevState) => [...prevState, subGoals.length + 1])
            }
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {subGoals.length > 0 && (
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
            {subGoals.map((subGoal) => (
              <GoalColumn key={subGoal} id={subGoal} />
            ))}
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
