import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useGetTasksQuery } from "../../api/TasksApi";
import { DaysOfWeek, Task } from "../../models/task";
import PlanLoader from "../../components/organisms/Calendar/PlanLoader/PlanLoader";
import { Box, Typography } from "@mui/material";
import { ReactSortable } from "react-sortablejs";
import CurrentCard from "../../components/molecules/CurrentCard/CurrentCard";

const Act = () => {
  const [currentTaskList, setCurrentTaskList] = useState<Task[]>([]);
  const { isLoading, data } = useGetTasksQuery();
  const currentDay = format(new Date(), "eeee");
  const currentTasks = useMemo(() => {
    return data?.filter((task) => {
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
    });
  }, [data, currentDay]);

  useEffect(() => {
    setCurrentTaskList(currentTasks);
  }, [currentTasks]);

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
              setList={(updatedTaskList) => setCurrentTaskList(updatedTaskList)}
            >
              {currentTaskList?.map((task) => (
                <CurrentCard key={task.id} task={task} />
              ))}
            </ReactSortable>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Act;
