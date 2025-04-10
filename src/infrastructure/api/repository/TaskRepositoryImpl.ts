import { TaskEntity } from "../../../domain/entity/TaskEntity";
import { TaskRepository } from "../../../domain/repository/TaskRepository";
import { CreateTaskDto } from "../../../dto/task/CreateTaskDto";
import { UpdateTaskDto } from "../../../dto/task/UpdateTaskDto";
import { apiClient } from "../apiClient";

export class TaskRepositoryImpl implements TaskRepository {
  async getAllCompletedTask(): Promise<TaskEntity[]> {
     try {
       const response = await apiClient("/tasks/list/completed", {
         method: "GET",
       });
       return response.data as TaskEntity[];
     } catch (error) {
       throw error;
     }
  }
 async getAllOnGoingTask(): Promise<TaskEntity[]> {
     try {
      const response = await apiClient("/tasks/list/on_going", {
        method: "GET",
      });
      return response.data as TaskEntity[];
    } catch (error) {
      throw error;
    }
  }
  async getAllTasks(): Promise<TaskEntity[]> {
    try {
      const response = await apiClient("/tasks/list", {
        method: "GET",
      });
      return response.data as TaskEntity[];
    } catch (error) {
      throw error;
    }
  }
  async getTaskById(id: number): Promise<TaskEntity | null> {
    try {
      const response = await apiClient("/tasks/detail/" + id, {
        method: "GET",
      });
      return response.data as TaskEntity;
    } catch (error) {
      throw error;
    }
  }
  async createTask(task: CreateTaskDto): Promise<TaskEntity> {
    try {
      const response = await apiClient("/tasks/create", {
        method: "POST",
        body: task,
      });
      return response.data as TaskEntity;
    } catch (error) {
      throw error;
    }
  }
  async deleteTask(id: number): void {
    try {
      const response = await apiClient("/tasks/delete/" + id, {
        method: "DELETE",
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async updateTask(
    id: number,
    schema: UpdateTaskDto
  ): Promise<TaskEntity | null> {
    try {
      const response = await apiClient("/tasks/update/" + id, {
        method: "PUT",
        body: schema,
      });
      return response.data as TaskEntity;
    } catch (error) {
      throw error;
    }
  }

  async completedTask(
    id: number,
  ): Promise<TaskEntity | null> {
    try {
      const response = await apiClient("/tasks/update-success/" + id, {
        method: "PUT",
  
      });
      return response.data as TaskEntity;
    } catch (error) {
      throw error;
    }
  }
}
