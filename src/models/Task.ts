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
  scheduledDay?: Date;
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

export interface TaskBlock {
  id?: number;
  taskId: number;
  totalBlocks: number;
  completedBlocks: number;
  dayOfWeek: DaysOfWeek[];
}
