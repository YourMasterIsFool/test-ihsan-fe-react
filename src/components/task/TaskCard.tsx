import { CircleX, Pencil, Circle, CircleCheck } from "lucide-react";
import { TaskEntity } from "../../domain/entity/TaskEntity";
import { useTaskStore } from "../../store/taskStore";
import moment from 'moment';

interface TaskCardProps {
  task: TaskEntity;
  isCompleted?: boolean;
}

export function TaskCard({ task, isCompleted = false }: TaskCardProps) {
  const { getDetail, deleteTask, completedTask } = useTaskStore();

  async function onHandlerEdit() {
    await getDetail(task.id);
  }

  async function handleCompleted() {
    await completedTask(task.id)
  }
  async function onHandlerDelete() {
    await deleteTask(task.id);
  }
  return (
    <div className="flex items-center justify-between  lg:p-6 p-4  bg-gray-200 rounded-2xl text-black">
      <div>
        <div className="flex items-center space-x-1 lg:text-lg font-light">
          <span
            className={`lg:text-[16px] transition-all duration-300 text-[14px] ${
              task.task_status.code == "completed" ? "line-through" : ""
            }`}
          >
            {task.name}{" "}
          </span>
          <Pencil
            onClick={() => onHandlerEdit()}
            size={20}
            className="cursor-pointer"
          />
        </div>
        <p className="lg:text-sm font-light text-left text-xs">
          {moment(task.created_at).format('DD MMM YYYY hh:mm:ss')}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <CircleX size={30} onClick={() => onHandlerDelete()} />

        {task.task_status.code == "completed" ? (
          <CircleCheck />
        ) : (
          <Circle size={30} onClick={() => handleCompleted()} />
        )}
      </div>
    </div>
  );
}
