export interface Task {
  id: number;
  subGoalId?: number;
  description: string;
  duration: number;
  isRecurring: boolean;
  isRandom: boolean;
  daysOfWeek: DaysOfWeek[];
  frequency?: number;
  isCompleted?: boolean;
  order?: number;
}

export enum DaysOfWeek {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export interface CompletedTask {
  id: number;
  completedDay: number;
}

export interface TaskOrder {
  id?: number;
  taskId: number;
  order: number;
  dayOfWeek: number;
}
