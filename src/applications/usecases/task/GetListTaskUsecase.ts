import { TaskEntity } from "../../../domain/entity/TaskEntity";
import { TaskRepository } from "../../../domain/repository/TaskRepository";

export class GetListTaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(): Promise<TaskEntity[]> {
    return await this.taskRepository.getAllTasks();
  }
}
