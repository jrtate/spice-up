import React, { useState } from "react";
import { Box, Divider, Fab, Tooltip } from "@mui/material";
import PlanLoader from "../Plan/PlanLoader/PlanLoader";
import GoalRow from "../../components/organisms/GoalRow/GoalRow";
import AddIcon from "@mui/icons-material/Add";

const Brainstorm = () => {
  const [goals, setGoals] = useState<number[]>([1]);
  const isLoading = false;

  return (
    <Box p={1}>
      {isLoading ? <PlanLoader /> : goals.map((goal) => <GoalRow key={goal} />)}

      <Box
        marginTop={2}
        sx={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <Tooltip title="Add New Goal" placement="top">
          <Fab
            color="primary"
            onClick={() =>
              setGoals((prevState) => [...prevState, goals.length + 1])
            }
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Brainstorm;
