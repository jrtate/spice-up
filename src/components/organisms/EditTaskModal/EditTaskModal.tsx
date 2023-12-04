import React, { useEffect, useState } from "react";
import { DaysOfWeek, Task } from "models/Task";
import { useEditTaskMutation } from "api/TasksApi";
import { useToast } from "hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import TaskModalFrame from "../TaskModalFrame/TaskModalFrame";

interface EditTaskModalProps {
  show: boolean;
  closeModal: () => void;
  task: Task;
}

const EditTaskModal = ({ show, closeModal, task }: EditTaskModalProps) => {
  const queryClient = useQueryClient();
  const editTask = useEditTaskMutation(queryClient);
  const { handleSetShowToast } = useToast();
  const [description, setDescription] = useState<string>(
    task.description || "",
  );
  const [duration, setDuration] = useState<number>(null);
  const [isRecurring, setIsRecurring] = useState<boolean>(
    task.isRecurring || true,
  );
  const [isRandom, setIsRandom] = useState<boolean>(task.isRandom || false);
  const [checkedDays, setCheckedDays] = useState<DaysOfWeek[]>(
    task.daysOfWeek || [],
  );
  const [frequency, setFrequency] = useState<number>(task.frequency || 1);
  const [scheduledDay, setScheduledDay] = useState<Date>(new Date());

  useEffect(() => {
    setDescription(task.description || "");
    setDuration(task.duration || null);
    setIsRecurring(task.isRecurring);
    setIsRandom(task.isRandom);
    setCheckedDays(task.daysOfWeek || []);
    setFrequency(task.frequency || 1);
    setScheduledDay(
      task.scheduledDay ? new Date(task.scheduledDay) : new Date(),
    );
  }, [task, show]);

  const handleModalClose = () => {
    setDescription(task.description || "");
    setDuration(task.duration || null);
    setIsRecurring(task.isRecurring || true);
    setIsRandom(task.isRandom || false);
    setCheckedDays(task.daysOfWeek || []);
    setFrequency(task.frequency || 1);
    setScheduledDay(task.scheduledDay || new Date());
    closeModal();
  };

  const handleDayOfWeekClick = (key: DaysOfWeek) =>
    setCheckedDays((prevState) => {
      if (prevState.includes(key)) {
        return prevState.filter((day) => day !== key);
      } else return [...prevState, key];
    });

  const handleEditTask = () => {
    try {
      editTask.mutate({
        id: task.id,
        description,
        duration,
        isRecurring,
        daysOfWeek: checkedDays,
        isRandom,
        frequency,
        scheduledDay,
      });
      handleModalClose();
      handleSetShowToast("Task successfully saved.");
    } catch (e) {
      handleSetShowToast("Something went wrong.");
    }
  };

  useEffect(() => {
    if (isRandom) setCheckedDays([]);
  }, [isRandom]);

  return (
    <TaskModalFrame
      title={"Edit task"}
      show={show}
      checkedDays={checkedDays}
      description={description}
      duration={duration}
      setDuration={setDuration}
      handleDayOfWeekClick={handleDayOfWeekClick}
      handleModalClose={handleModalClose}
      handleSaveTask={handleEditTask}
      isLoading={editTask.isPending}
      isRandom={isRandom}
      isRecurring={isRecurring}
      frequency={frequency}
      setDescription={setDescription}
      setFrequency={setFrequency}
      setIsRandom={setIsRandom}
      setIsRecurring={setIsRecurring}
      scheduledDay={scheduledDay}
      setScheduledDay={setScheduledDay}
    />
  );
};

export default EditTaskModal;
