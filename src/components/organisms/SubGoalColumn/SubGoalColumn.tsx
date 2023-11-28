import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import AddTaskModal from "../../../pages/Plan/AddTaskModal/AddTaskModal";
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

interface GoalColumnProps {
  goalId?: number;
  subGoal?: SubGoal;
}

const SubGoalColumn = ({ goalId, subGoal }: GoalColumnProps) => {
  const isEditing = useMemo(() => subGoal?.id > 0, [subGoal]);
  const queryClient = useQueryClient();
  const saveSubGoal = useAddSubGoalMutation(queryClient);
  const editSubGoal = useEditSubGoalMutation(queryClient);
  const deleteSubGoal = useDeleteSubGoalMutation(queryClient);
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (isEditing) setDescription(subGoal?.description);
  }, [subGoal]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <TextField
          sx={{ marginBottom: 4 }}
          variant={"standard"}
          label="Sub-goal"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        {isEditing ? (
          <Tooltip title="Edit Sub-goal">
            <IconButton
              onClick={() =>
                editSubGoal.mutate({ id: subGoal?.id, description })
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Create Sub-goal">
            <IconButton
              onClick={() => {
                saveSubGoal.mutate({ goalId, description });
                setDescription("");
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Delete Sub-goal">
          <span>
            <IconButton
              disabled={!isEditing}
              onClick={() => deleteSubGoal.mutate(subGoal?.id)}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      {subGoal?.tasks?.map((task) => (
        <Box key={task.id} marginBottom={2} width={"100%"}>
          <TaskCard task={task} showCompletionStats={true} />
        </Box>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setShowAddTaskModal(true)}
      >
        Add Task
      </Button>
      <AddTaskModal
        show={showAddTaskModal}
        closeModal={() => setShowAddTaskModal(false)}
        subGoalId={subGoal?.id}
      />
    </Box>
  );
};

export default SubGoalColumn;
