import { TaskEntity } from "../../../domain/entity/TaskEntity";
import { TaskRepository } from "../../../domain/repository/TaskRepository";
export class CompletedTaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(id: number): Promise<TaskEntity | null> {
    return await this.taskRepository.completedTask(id);
  }
}
