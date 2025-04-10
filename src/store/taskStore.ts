import { create } from "zustand";
import { TaskEntity } from "../domain/entity/TaskEntity";
import { GetListTaskUsecase } from "../applications/usecases/task/GetListTaskUsecase";
import { TaskRepositoryImpl } from "../infrastructure/api/repository/TaskRepositoryImpl";
import { CreateTaskUsecase } from "../applications/usecases/task/CreateTaskUsecase";
import { CreateTaskDto } from "../dto/task/CreateTaskDto";
import { DetailTaskUsecase } from "../applications/usecases/task/DetailTaskUsecase";
import { UpdateTaskDto } from "../dto/task/UpdateTaskDto";
import { CompletedTaskUsecase } from "../applications/usecases/task/CompletedTaskUsecase";
import { GetAllCompletedTaskUsecase } from "../applications/usecases/task/GetAllCompletedTaskUsecase";
import { GetAllOnGoingTaskUsecase } from "../applications/usecases/task/GetAllOnGoingTaskUsecase";

interface ITaskStore {
  tasks: TaskEntity[];
  errors: null | any;
  detail: null | TaskEntity;
  completedTaskList: TaskEntity[];
  onGoingTaskList: TaskEntity[];
  getAllTask: () => Promise<void>;
  createTask: (task: CreateTaskDto, callback?:() =>void) => Promise<void>;
  getDetail: (id: number) => Promise<void>;
  cancelUpdate: () => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, task: UpdateTaskDto, callback?:() => void) => void;
  completedTask: (id: number) => void;
  getAllCompletedTask: () => void;
  getAllOnGoingTask: () => void;
}

const repo = new TaskRepositoryImpl();
export const useTaskStore = create<ITaskStore>((set, get) => ({
  tasks: [],
  completedTaskList: [],
  onGoingTaskList: [],
  errors: null,
  detail: null,
  getAllTask: async () => {
    const response = await new GetListTaskUsecase(repo).execute();
    const data = response as TaskEntity[];
    set({ tasks: data });
  },
  getDetail: async (id: number) => {
    const response = await new DetailTaskUsecase(repo).execute(id);
    set({ detail: response });
  },
  cancelUpdate: () => {
    set({ detail: null });
  },
  updateTask: async (id: number, task: UpdateTaskDto, successCallback?: () => void) => {
    try {
      const response = await repo.updateTask(id, task);
      await get().getAllCompletedTask()
      await get().getAllOnGoingTask()
      set({
        detail: null
      })
      if(successCallback) {
        successCallback()
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        set({ errors: e.message });
      }
    }
  },

  deleteTask: async (id: number) => {
    try {
      const response = await repo.deleteTask(id);
      console.log(response);
      await get().getAllCompletedTask()
      await get().getAllOnGoingTask();
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        set({ errors: e.message });
      }
    }
  },
  getAllCompletedTask: async () => {
    const response = await new GetAllCompletedTaskUsecase(repo).execute();
    const data = response as TaskEntity[];
    set({ completedTaskList: data });
  },

  getAllOnGoingTask: async () => {
    const response = await new GetAllOnGoingTaskUsecase(repo).execute();
    const data = response as TaskEntity[];
    set({ onGoingTaskList: data });
  },
  completedTask: async (id:number) => {
    try {
      const response = await new CompletedTaskUsecase(repo).execute(id);
      const data = response;
      await get().getAllCompletedTask()
      await get().getAllOnGoingTask();

    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        set({ errors: e.message });
      }
    }
  },
  createTask: async (task: CreateTaskDto, successCallback?: ()=>void) => {
    try {
      console.log(task);
      const response = await new CreateTaskUsecase(repo).execute(task);
      const data = response;
      if (successCallback) {
        successCallback();
      }
      await get().getAllOnGoingTask()
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        set({ errors: e.message });
      }
    }
  },
}));
