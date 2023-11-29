import { Task } from "./Task";

export interface Goal {
  id?: number;
  description: string;
  isCompleted?: boolean;
  subGoals?: SubGoal[];
}

export interface SubGoal {
  id?: number;
  description: string;
  goalId?: number;
  isCompleted?: boolean;
  tasks?: Task[];
}
