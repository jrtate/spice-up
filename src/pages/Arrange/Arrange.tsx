import React, { useCallback } from "react";
import { CalendarContainer } from "./styles";
import CalendarColumn from "components/molecules/CalendarColumn/CalendarColumn";
import { DaysOfWeek, Task } from "models/Task";
import { useGetTasksQuery } from "api/TasksApi";
import PageLoader from "../../components/atoms/PageLoader/PageLoader";
import { useGetTaskOrdersQuery } from "api/OrderApi";
import { Box } from "@mui/material";
import { format } from "date-fns";

const Arrange = () => {
  const { isLoading, data: taskData } = useGetTasksQuery();
  const { data: taskOrderData } = useGetTaskOrdersQuery();

  const sortTasksToDayOfWeek = useCallback(
    (key: DaysOfWeek) => {
      const getSortOrder = (task: Task, dayOfWeek: DaysOfWeek) => {
        const orderData = taskOrderData?.find?.((order) => {
          return order.dayOfWeek === dayOfWeek && order.taskId === task.id;
        });
        return orderData?.order;
      };

      return taskData
        ?.filter?.((task) => {
          if (task?.daysOfWeek?.some((day) => day === key)) {
            return true;
          } else
            return (
              task.scheduledDay &&
              key === DaysOfWeek[format(new Date(task.scheduledDay), "eeee")]
            );
        })
        .sort((taskA, taskB) => {
          const taskASortOrder = getSortOrder(taskA, key);
          const taskBSortOrder = getSortOrder(taskB, key);

          return taskASortOrder - taskBSortOrder;
        });
    },
    [taskData, taskOrderData],
  );

  return (
    <CalendarContainer>
      {isLoading ? (
        <PageLoader />
      ) : (
        <Box sx={{ display: "flex", width: "100%", gap: 1 }} p={1}>
          <CalendarColumn
            header="Monday"
            taskList={sortTasksToDayOfWeek(DaysOfWeek.Monday)}
          />
          <CalendarColumn
            header="Tuesday"
            taskList={sortTasksToDayOfWeek(DaysOfWeek.Tuesday)}
          />
          <CalendarColumn
            header="Wednesday"
            taskList={sortTasksToDayOfWeek(DaysOfWeek.Wednesday)}
          />
          <CalendarColumn
            header="Thursday"
            taskList={sortTasksToDayOfWeek(DaysOfWeek.Thursday)}
          />
          <CalendarColumn
            header="Friday"
            taskList={sortTasksToDayOfWeek(DaysOfWeek.Friday)}
          />
          <CalendarColumn
            header="Saturday"
            taskList={sortTasksToDayOfWeek(DaysOfWeek.Saturday)}
          />
          <CalendarColumn
            header="Sunday"
            taskList={sortTasksToDayOfWeek(DaysOfWeek.Sunday)}
          />
        </Box>
      )}
    </CalendarContainer>
  );
};

export default Arrange;
