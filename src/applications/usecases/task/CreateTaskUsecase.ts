import { TaskEntity } from "../../../domain/entity/TaskEntity";
import { TaskRepository } from "../../../domain/repository/TaskRepository";
import { CreateTaskDto } from "../../../dto/task/CreateTaskDto";

export class CreateTaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(schema: CreateTaskDto): Promise<TaskEntity> {
    console.log(schema);
    return await this.taskRepository.createTask(schema);
  }
}
