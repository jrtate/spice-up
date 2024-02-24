import React, { useCallback, useState } from "react";
import { CalendarContainer } from "./styles";
import CalendarColumn from "components/molecules/CalendarColumn/CalendarColumn";
import { DaysOfWeek, Task } from "models/Task";
import { useGetTasksQuery } from "api/TasksApi";
import PageLoader from "../../components/atoms/PageLoader/PageLoader";
import { useGetTaskOrdersQuery } from "api/OrderApi";
import { Box, Button, Fab, IconButton } from "@mui/material";
import { format } from "date-fns";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

const Arrange = () => {
  const { isLoading, data: taskData } = useGetTasksQuery();
  const { data: taskOrderData } = useGetTaskOrdersQuery();
  const [selectedWeek, setSelectedWeek] = useState<number>(0);

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
    [taskData, taskOrderData, selectedWeek],
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
            selectedWeek={selectedWeek}
          />
          <CalendarColumn
            header="Tuesday"
            taskList={sortTasksToDayOfWeek(DaysOfWeek.Tuesday)}
            selectedWeek={selectedWeek}
          />
          <CalendarColumn
            header="Wednesday"
            taskList={sortTasksToDayOfWeek(DaysOfWeek.Wednesday)}
            selectedWeek={selectedWeek}
          />
          <CalendarColumn
            header="Thursday"
            taskList={sortTasksToDayOfWeek(DaysOfWeek.Thursday)}
            selectedWeek={selectedWeek}
          />
          <CalendarColumn
            header="Friday"
            taskList={sortTasksToDayOfWeek(DaysOfWeek.Friday)}
            selectedWeek={selectedWeek}
          />
          <CalendarColumn
            header="Saturday"
            taskList={sortTasksToDayOfWeek(DaysOfWeek.Saturday)}
            selectedWeek={selectedWeek}
          />
          <CalendarColumn
            header="Sunday"
            taskList={sortTasksToDayOfWeek(DaysOfWeek.Sunday)}
            selectedWeek={selectedWeek}
          />
        </Box>
      )}

      <Fab
        sx={{
          position: "fixed",
          right: "50%",
          mr: 1,
          bottom: 16,
          zIndex: 9999,
        }}
        color={"primary"}
        onClick={() => setSelectedWeek((prevState) => prevState - 1)}
      >
        <NavigateBefore />
      </Fab>
      <Fab
        sx={{
          position: "fixed",
          left: "50%",
          ml: 1,
          bottom: 16,
          zIndex: 9999,
        }}
        color={"primary"}
        onClick={() => setSelectedWeek((prevState) => prevState + 1)}
      >
        <NavigateNext />
      </Fab>
    </CalendarContainer>
  );
};

export default Arrange;
