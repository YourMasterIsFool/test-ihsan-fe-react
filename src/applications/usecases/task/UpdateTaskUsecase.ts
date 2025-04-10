import { TaskEntity } from "../../../domain/entity/TaskEntity";
import { TaskRepository } from "../../../domain/repository/TaskRepository";
import { UpdateTaskDto } from "../../../dto/task/UpdateTaskDto";

export class UpdateTaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(id: number, schema: UpdateTaskDto): Promise<TaskEntity | null> {
    return await this.taskRepository.updateTask(id, schema);
  }
}
