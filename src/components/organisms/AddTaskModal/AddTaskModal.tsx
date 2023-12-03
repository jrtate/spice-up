import React, { useEffect, useState } from "react";
import { DaysOfWeek } from "models/Task";
import { useAddTaskMutation } from "api/TasksApi";
import { useToast } from "hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import TaskModalFrame from "../TaskModalFrame/TaskModalFrame";

interface AddTaskModalProps {
  show: boolean;
  closeModal: () => void;
  subGoalId?: number;
}

const AddTaskModal = ({ show, closeModal, subGoalId }: AddTaskModalProps) => {
  const queryClient = useQueryClient();
  const [description, setDescription] = useState<string>("");
  const [duration, setDuration] = useState<number>(15);
  const [isRecurring, setIsRecurring] = useState<boolean>(true);
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [checkedDays, setCheckedDays] = useState<DaysOfWeek[]>([]);
  const [scheduledDay, setScheduledDay] = useState<Date>(new Date());
  const addTask = useAddTaskMutation(queryClient);
  const { handleSetShowToast } = useToast();
  const [frequency, setFrequency] = useState<number>(1);

  const handleModalClose = () => {
    setDescription("");
    setDuration(15);
    setIsRecurring(true);
    setIsRandom(false);
    setCheckedDays([]);
    setFrequency(1);
    setScheduledDay(new Date());
    closeModal();
  };

  const handleDayOfWeekClick = (key: DaysOfWeek) =>
    setCheckedDays((prevState) => {
      if (prevState.includes(key)) {
        return prevState.filter((day) => day !== key);
      } else return [...prevState, key];
    });

  const handleSaveTask = () => {
    try {
      addTask.mutate({
        id: Math.random(),
        subGoalId: subGoalId,
        description,
        duration,
        isRecurring,
        daysOfWeek: checkedDays,
        isRandom,
        frequency,
        scheduledDay,
      });
      handleModalClose();
      handleSetShowToast("Task successfully added.");
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
      title={"Add a new task"}
      show={show}
      checkedDays={checkedDays}
      description={description}
      duration={duration}
      setDuration={setDuration}
      handleDayOfWeekClick={handleDayOfWeekClick}
      handleModalClose={handleModalClose}
      handleSaveTask={handleSaveTask}
      isLoading={addTask.isPending}
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

export default AddTaskModal;
