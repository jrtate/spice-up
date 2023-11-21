import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useGetTasksQuery } from "../../api/TasksApi";
import { DaysOfWeek, Task } from "../../models/task";
import PlanLoader from "pages/Plan/PlanLoader/PlanLoader";
import { Box, Typography } from "@mui/material";
import { ReactSortable } from "react-sortablejs";
import CurrentCard from "components/molecules/CurrentCard/CurrentCard";
import {
  useGetTaskOrdersQuery,
  useUpdateTaskSortOrderMutation,
} from "../../api/OrderApi";
import { useQueryClient } from "@tanstack/react-query";
import PomodoroTracker from "components/organisms/PomodoroTracker/PomodoroTracker";

const Act = () => {
  const [currentTaskList, setCurrentTaskList] = useState<Task[]>([]);
  const { isLoading, data: taskData } = useGetTasksQuery();
  const { data: taskOrderData } = useGetTaskOrdersQuery();
  const queryClient = useQueryClient();
  const updateTaskOrder = useUpdateTaskSortOrderMutation(queryClient);
  const currentDay = format(new Date(), "eeee");

  const getSortOrder = (task: Task) => {
    const orderData = taskOrderData?.find?.((order) => {
      return (
        order.dayOfWeek === DaysOfWeek[currentDay] && order.taskId === task.id
      );
    });
    return orderData?.order;
  };

  const currentTaskData = useMemo(() => {
    return taskData
      ?.filter((task) => {
        let matchingTask: Task;
        task?.daysOfWeek?.forEach((day: string | number) => {
          const dayOfWeek = DaysOfWeek[day];

          if (dayOfWeek === currentDay) {
            matchingTask = task;
          }
        });

        if (matchingTask) {
          return matchingTask;
        }
      })
      ?.sort((taskA, taskB) => {
        const taskASortOrder = getSortOrder(taskA);
        const taskBSortOrder = getSortOrder(taskB);

        return taskASortOrder - taskBSortOrder;
      });
  }, [taskData, currentDay, taskOrderData]);

  useEffect(() => {
    setCurrentTaskList(currentTaskData);
  }, [currentTaskData]);

  const saveSortOrder = (updatedTaskList: Task[]) => {
    setCurrentTaskList(updatedTaskList);
    const mappedOrder = updatedTaskList?.map((task: Task, index: number) => {
      return {
        taskId: task.id,
        order: index + 1,
        dayOfWeek: DaysOfWeek[currentDay],
      };
    });

    updateTaskOrder.mutate(mappedOrder);
  };

  return (
    <Box p={1} sx={{ width: "100%", height: "100%" }}>
      {isLoading ? (
        <PlanLoader />
      ) : (
        <Box m={3}>
          <Typography variant="h6" gutterBottom>
            Here is the outline for today:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <ReactSortable
              animation={150}
              list={currentTaskList || []}
              setList={(updatedTaskList) => saveSortOrder(updatedTaskList)}
            >
              {currentTaskList?.map((task) => (
                <Box
                  key={task.id}
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: "fit-content",
                    alignItems: "center",
                  }}
                >
                  <CurrentCard task={task} />
                  {!!task.duration && (
                    <PomodoroTracker durationInMinutes={task.duration} />
                  )}
                </Box>
              ))}
            </ReactSortable>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Act;
