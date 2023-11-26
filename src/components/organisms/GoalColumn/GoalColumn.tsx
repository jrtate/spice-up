import React, { useState } from "react";
import { Box, Divider, TextField } from "@mui/material";

interface GoalColumnProps {
  id: number;
}

const GoalColumn = ({ id }: GoalColumnProps) => {
  const [subGoal, setSubGoal] = useState<string>("");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        sx={{ marginBottom: 4 }}
        variant={"outlined"}
        label="Sub-Goal"
        value={subGoal}
        onChange={(e) => {
          setSubGoal(e.target.value);
        }}
      />
    </Box>
  );
};

export default GoalColumn;
