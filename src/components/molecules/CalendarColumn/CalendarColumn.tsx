import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { eachDayOfInterval, format, addWeeks } from "date-fns";
import CalendarHeader from "../../atoms/CalendarHeader/CalendarHeader";
import TaskCard from "../TaskCard/TaskCard";
import { ReactSortable } from "react-sortablejs";
import { DaysOfWeek, Task } from "../../../models/Task";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateTaskSortOrderMutation } from "../../../api/OrderApi";
import { enUS } from "date-fns/locale";
import { Typography } from "@mui/material";

interface CalendarColumnProps {
  header: string;
  taskList: Task[];
  selectedWeek: number;
}

const CalendarColumn = ({
  header,
  taskList,
  selectedWeek,
}: CalendarColumnProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const queryClient = useQueryClient();
  const updateTaskOrder = useUpdateTaskSortOrderMutation(queryClient);
  const daysOfWeek = useMemo(() => {
    const prevMonday = addWeeks(new Date(), selectedWeek);
    prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7));
    return eachDayOfInterval({
      start: prevMonday,
      end: addWeeks(new Date(), selectedWeek).setDate(prevMonday.getDate() + 6),
    });
  }, [selectedWeek]);

  const getDate = () => {
    return daysOfWeek.find(
      (day) => format(day, "eeee", { locale: enUS }) === header,
    );
  };

  useEffect(() => {
    // Remove any one time tasks that aren't scheduled for this day
    const updatedTaskList = taskList?.filter?.(
      (task) =>
        (task.isRecurring && !task.scheduledDay) ||
        (!task.isRecurring &&
          format(getDate(), "MM-dd-yy") ===
            format(
              task.scheduledDay ? new Date(task?.scheduledDay) : new Date(),
              "MM-dd-yy",
            )),
    );
    setTasks(updatedTaskList);
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
        marginBottom={2}
        sx={{
          width: "100%",
          textAlign: "center",
          borderRadius: "2px",
          padding: 1,
          border: `1px solid ${
            format(new Date(), "eeee") === header
              ? "#f5f5f5"
              : "rgba(255, 255, 255, 0.12)"
          }`,
          backgroundColor: "rgb(20 20 20)",
        }}
      >
        <CalendarHeader label={header} />
        <Typography
          sx={{
            fontStyle: "italic",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          {format(getDate(), "MM-dd")}
        </Typography>
      </Box>
      <ReactSortable
        animation={150}
        list={tasks || []}
        setList={(updatedTaskList) => saveSortOrder(updatedTaskList)}
      >
        {tasks?.map((task) => (
          <Box key={task.id} marginBottom={2}>
            <TaskCard task={task} />
          </Box>
        ))}
      </ReactSortable>
    </Box>
  );
};

export default CalendarColumn;
