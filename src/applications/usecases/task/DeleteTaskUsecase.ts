import { TaskRepository } from "../../../domain/repository/TaskRepository";

export class DeleteTaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(id: number): Promise<void> {
    return await this.taskRepository.deleteTask(id);
  }
}
