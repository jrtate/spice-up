import React, { useState } from "react";
import { Box, Fab, Tooltip } from "@mui/material";
import PageLoader from "../../components/atoms/PageLoader/PageLoader";
import GoalRow from "../../components/organisms/GoalRow/GoalRow";
import AddIcon from "@mui/icons-material/Add";
import { useGetGoalsQuery } from "../../api/GoalsApi";

const Brainstorm = () => {
  const { data: goals, isLoading } = useGetGoalsQuery();
  const [blankGoals, setBlankGoals] = useState<number[]>([]);

  return isLoading ? (
    <PageLoader />
  ) : (
    <Box p={1}>
      {goals?.map?.((goal) => <GoalRow key={goal?.id} goal={goal} />)}

      {!goals?.length ? (
        <GoalRow />
      ) : (
        blankGoals?.map((i) => <GoalRow key={i} />)
      )}

      <Box
        marginTop={2}
        sx={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <Tooltip title="Add New Goal" placement="top">
          <Fab
            color="primary"
            onClick={() =>
              setBlankGoals((prevState) => [
                ...prevState,
                blankGoals.length + 1,
              ])
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
