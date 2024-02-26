import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import PageLoader from "../../components/atoms/PageLoader/PageLoader";
import GoalRow from "../../components/organisms/GoalRow/GoalRow";
import AddIcon from "@mui/icons-material/Add";
import { useGetGoalsQuery } from "../../api/GoalsApi";

const Plan = () => {
  const { data: goals, isLoading = true } = useGetGoalsQuery();
  const [blankGoals, setBlankGoals] = useState<number[]>([]);

  return isLoading ? (
    <PageLoader />
  ) : (
    <Box p={1}>
      {goals?.map?.((goal) => <GoalRow key={goal?.id} goal={goal} />)}

      {!goals?.length ? (
        <GoalRow />
      ) : (
        blankGoals?.map((i) => (
          <GoalRow key={i} onSaveGoal={() => setBlankGoals([])} />
        ))
      )}

      <Box
        marginTop={2}
        sx={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <Button
          variant={"outlined"}
          disabled={blankGoals.length === 1}
          color="primary"
          onClick={() => setBlankGoals([1])}
        >
          Add New Goal <AddIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Plan;
