import React, { useCallback, useState } from "react";
import { CalendarContainer } from "./styles";
import CalendarColumn from "components/molecules/CalendarColumn/CalendarColumn";
import FloatingAddButton from "components/atoms/FloatingAddButton/FloatingAddButton";
import { DaysOfWeek, Task } from "models/Task";
import AddTaskModal from "./AddTaskModal/AddTaskModal";
import { useGetTasksQuery } from "api/TasksApi";
import PageLoader from "../../components/atoms/PageLoader/PageLoader";
import { useGetTaskOrdersQuery } from "api/OrderApi";
import { Box } from "@mui/material";

const Plan = () => {
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const { isLoading, data: taskData } = useGetTasksQuery();
  const { data: taskOrderData } = useGetTaskOrdersQuery();

  const getTasksForColumn = useCallback(
    (key: DaysOfWeek) => {
      const getSortOrder = (task: Task, dayOfWeek: DaysOfWeek) => {
        const orderData = taskOrderData?.find?.((order) => {
          return order.dayOfWeek === dayOfWeek && order.taskId === task.id;
        });
        return orderData?.order;
      };

      return taskData
        ?.filter?.((task) => task?.daysOfWeek?.some((day) => day === key))
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
            taskList={getTasksForColumn(DaysOfWeek.Monday)}
          />
          <CalendarColumn
            header="Tuesday"
            taskList={getTasksForColumn(DaysOfWeek.Tuesday)}
          />
          <CalendarColumn
            header="Wednesday"
            taskList={getTasksForColumn(DaysOfWeek.Wednesday)}
          />
          <CalendarColumn
            header="Thursday"
            taskList={getTasksForColumn(DaysOfWeek.Thursday)}
          />
          <CalendarColumn
            header="Friday"
            taskList={getTasksForColumn(DaysOfWeek.Friday)}
          />
          <CalendarColumn
            header="Saturday"
            taskList={getTasksForColumn(DaysOfWeek.Saturday)}
          />
          <CalendarColumn
            header="Sunday"
            taskList={getTasksForColumn(DaysOfWeek.Sunday)}
          />
        </Box>
      )}

      <FloatingAddButton onClick={() => setShowAddTaskModal(true)} />
      <AddTaskModal
        show={showAddTaskModal}
        closeModal={() => setShowAddTaskModal(false)}
      />
    </CalendarContainer>
  );
};

export default Plan;
