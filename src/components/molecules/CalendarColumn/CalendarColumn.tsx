import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { format } from "date-fns";
import CalendarHeader from "../../atoms/CalendarHeader/CalendarHeader";
import TaskCard from "../TaskCard/TaskCard";
import { ReactSortable } from "react-sortablejs";
import { Task } from "../../../models/task";
import { useUpdateTaskSortOrderMutation } from "../../../api/TasksApi";
import { useQueryClient } from "@tanstack/react-query";

interface CalendarColumnProps {
  header: string;
  taskList: Task[];
}

const CalendarColumn = ({ header, taskList }: CalendarColumnProps) => {
  const queryClient = useQueryClient();
  const [tasks, setTasks] = useState<Task[]>(taskList);
  const updateTaskOrder = useUpdateTaskSortOrderMutation(queryClient);

  const saveSortOrder = () => {
    const mappedOrder = tasks?.map((task, index) => {
      return {
        taskId: task.id,
        order: index + 1,
      };
    });

    updateTaskOrder.mutate(mappedOrder);
  };

  useEffect(() => {
    saveSortOrder();
  }, [tasks]);

  useEffect(() => {
    setTasks(taskList);
  }, [taskList]);

  return (
    <Box width="100%">
      <Box
        m={1}
        sx={{
          textAlign: "center",
          bgcolor: "#272727",
          borderRadius: "2px",
          padding: 1,
          border: `${
            format(new Date(), "eeee") === header ? 1 : 0
          }px solid #f2f2f2`,
        }}
      >
        <CalendarHeader label={header} />
      </Box>
      <ReactSortable
        animation={150}
        list={tasks || []}
        setList={(updatedTaskList, i) => {
          console.log("wut this", i);
          setTasks(updatedTaskList);
        }}
      >
        {tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
      </ReactSortable>
    </Box>
  );
};

export default CalendarColumn;
