import { TaskEntityStatus } from "./TaskStatusEntity";

export interface TaskEntity {
  id: number;
  name: string;
  task_status_id: number;
  user_id: number;
  task_status: TaskEntityStatus,
  created_at: string
}
