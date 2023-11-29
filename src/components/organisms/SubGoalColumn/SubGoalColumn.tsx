import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
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
import CheckIcon from "@mui/icons-material/Check";
import {
  useCompleteSubGoalMutation,
  useUnCompleteSubGoalMutation,
} from "../../../api/SubGoalCompletionApi";
import SaveIcon from "@mui/icons-material/Save";

interface GoalColumnProps {
  goalId?: number;
  subGoal?: SubGoal;
}

const SubGoalColumn = ({ goalId, subGoal }: GoalColumnProps) => {
  const isSubGoalCreated = useMemo(() => subGoal?.id > 0, [subGoal]);
  const queryClient = useQueryClient();
  const saveSubGoal = useAddSubGoalMutation(queryClient);
  const editSubGoal = useEditSubGoalMutation(queryClient);
  const deleteSubGoal = useDeleteSubGoalMutation(queryClient);
  const completeSubGoal = useCompleteSubGoalMutation(queryClient);
  const unCompleteSubGoal = useUnCompleteSubGoalMutation(queryClient);
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (isSubGoalCreated) setDescription(subGoal?.description);
  }, [subGoal]);

  const handleCompleteClick = () => {
    if (!subGoal?.isCompleted) {
      completeSubGoal.mutate(subGoal?.id);
    } else if (subGoal?.isCompleted) {
      unCompleteSubGoal.mutate(subGoal?.id);
    }
  };

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
          width: "100%",
          marginBottom: 1,
        }}
      >
        {!isEditing && isSubGoalCreated && (
          <Typography sx={{ marginRight: 1 }} variant="subtitle1" gutterBottom>
            {description}
          </Typography>
        )}
        {(isEditing || !isSubGoalCreated) && (
          <TextField
            sx={{ marginRight: 1 }}
            variant={"standard"}
            label="Sub-goal"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        )}
        {isSubGoalCreated && !isEditing ? (
          <Tooltip title="Edit Sub-goal">
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Save Sub-goal">
            <IconButton
              onClick={() => {
                if (isSubGoalCreated) {
                  editSubGoal.mutate({ id: subGoal?.id, description });
                } else {
                  saveSubGoal.mutate({ goalId, description });
                }
                setDescription("");
                setIsEditing(false);
              }}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
        )}
        {isSubGoalCreated && !isEditing && (
          <Tooltip title="Delete Sub-goal">
            <span>
              <IconButton
                disabled={!isSubGoalCreated}
                onClick={() => deleteSubGoal.mutate(subGoal?.id)}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
        {isSubGoalCreated && !isEditing && (
          <Tooltip title="Complete">
            <IconButton
              color={subGoal?.isCompleted ? "success" : "primary"}
              size="small"
              onClick={() => handleCompleteClick()}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {subGoal?.tasks?.map((task) => (
        <Box key={task.id} marginBottom={2} width={"100%"}>
          <TaskCard task={task} showCompletionStats={true} />
        </Box>
      ))}

      {isSubGoalCreated && (
        <Button
          sx={{ marginTop: "1rem" }}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setShowAddTaskModal(true)}
        >
          Add Task
        </Button>
      )}
      <AddTaskModal
        show={showAddTaskModal}
        closeModal={() => setShowAddTaskModal(false)}
        subGoalId={subGoal?.id}
      />
    </Box>
  );
};

export default SubGoalColumn;
