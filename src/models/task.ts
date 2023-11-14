export interface Task {
  id: number;
  description: string;
  duration: number;
  isRecurring: boolean;
  isRandom: boolean;
  daysOfWeek: DaysOfWeek[];
  frequency?: number;
  isCompleted?: boolean;
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
}
