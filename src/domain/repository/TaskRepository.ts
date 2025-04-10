import { CreateTaskDto } from "../../dto/task/CreateTaskDto";
import { UpdateTaskDto } from "../../dto/task/UpdateTaskDto";
import { TaskEntity } from "../entity/TaskEntity";

export interface TaskRepository {
  getAllTasks(): Promise<TaskEntity[]>;
  getTaskById(id: number): Promise<TaskEntity | null>;
  createTask(task: CreateTaskDto): Promise<TaskEntity>;
  deleteTask(id: number): void;
  updateTask(id: number, schema: UpdateTaskDto): Promise<TaskEntity | null>;
  completedTask(id: number): Promise<TaskEntity | null>;

  getAllCompletedTask(): Promise<TaskEntity[]>;
  getAllOnGoingTask(): Promise<TaskEntity[]>;
}
