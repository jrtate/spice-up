import React, { useEffect, useState } from "react";
import { DaysOfWeek, Task } from "models/task";
import { useEditTaskMutation } from "api/TasksApi";
import { useToast } from "hooks/Toast";
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

  useEffect(() => {
    setDescription(task.description || "");
    setDuration(task.duration || null);
    setIsRecurring(task.isRecurring);
    setIsRandom(task.isRandom);
    setCheckedDays(task.daysOfWeek || []);
    setFrequency(task.frequency || 1);
  }, [task, show]);

  const handleModalClose = () => {
    setDescription(task.description || "");
    setDuration(task.duration || null);
    setIsRecurring(task.isRecurring || true);
    setIsRandom(task.isRandom || false);
    setCheckedDays(task.daysOfWeek || []);
    setFrequency(task.frequency || 1);
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
      });
      handleModalClose();
      handleSetShowToast("Task successfully saved.");
    } catch (e) {
      handleSetShowToast("Something went wrong.");
    }
  };

  useEffect(() => {
    if (frequency > checkedDays.length) {
      let updatedFrequency = frequency;
      while (updatedFrequency > checkedDays.length) {
        updatedFrequency = updatedFrequency - 1;
      }
      setFrequency(updatedFrequency);
    }
    if (checkedDays.length === 0) setFrequency(1);
  }, [checkedDays, frequency]);

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
    />
  );
};

export default EditTaskModal;
