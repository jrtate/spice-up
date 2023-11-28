import { Task } from "./Task";

export interface Goal {
  id?: number;
  description: string;
  subGoals?: SubGoal[];
}

export interface SubGoal {
  id?: number;
  description: string;
  goalId?: number;
  tasks?: Task[];
}
