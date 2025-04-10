import { TaskEntity } from "../../../domain/entity/TaskEntity";
import { TaskRepository } from "../../../domain/repository/TaskRepository";

export class GetAllCompletedTaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(): Promise<TaskEntity[]> {
    return await this.taskRepository.getAllCompletedTask();
  }
}
