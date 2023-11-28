import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { format } from "date-fns";
import CalendarHeader from "../../atoms/CalendarHeader/CalendarHeader";
import TaskCard from "../TaskCard/TaskCard";
import { ReactSortable } from "react-sortablejs";
import { DaysOfWeek, Task } from "../../../models/Task";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateTaskSortOrderMutation } from "../../../api/OrderApi";

interface CalendarColumnProps {
  header: string;
  taskList: Task[];
}

const CalendarColumn = ({ header, taskList }: CalendarColumnProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const queryClient = useQueryClient();
  const updateTaskOrder = useUpdateTaskSortOrderMutation(queryClient);

  useEffect(() => {
    setTasks(taskList);
  }, [taskList]);

  const saveSortOrder = (updatedTaskList: Task[]) => {
    setTasks(updatedTaskList);
    const mappedOrder = updatedTaskList?.map((task: Task, index: number) => {
      return {
        taskId: task.id,
        order: index + 1,
        dayOfWeek: DaysOfWeek[header],
      };
    });

    updateTaskOrder.mutate(mappedOrder);
  };

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
        setList={(updatedTaskList) => saveSortOrder(updatedTaskList)}
      >
        {tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
      </ReactSortable>
    </Box>
  );
};

export default CalendarColumn;
