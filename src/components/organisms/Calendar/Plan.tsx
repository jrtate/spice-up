import React, { useEffect, useState } from "react";
import { CalendarContainer } from "./styles";
import CalendarColumn from "components/molecules/CalendarColumn/CalendarColumn";
import FloatingAddButton from "components/atoms/FloatingAddButton/FloatingAddButton";
import { DaysOfWeek, Task } from "../../../models/task";
import AddTaskModal from "./AddTaskModal/AddTaskModal";
import { useGetTasksQuery } from "../../../api/TasksApi";
import PlanLoader from "./PlanLoader/PlanLoader";

const Plan = () => {
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isLoading, data } = useGetTasksQuery();

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const getTasksForColumn = (key: DaysOfWeek) => {
    return tasks?.filter?.((task) =>
      task.daysOfWeek.some((day) => day === key),
    );
  };

  return (
    <CalendarContainer>
      {isLoading ? (
        <PlanLoader />
      ) : (
        <>
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
        </>
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
