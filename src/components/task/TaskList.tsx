import { TaskEntity } from "../../domain/entity/TaskEntity";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  title: string;
  datas: TaskEntity[];
}

export function TaskList(props: TaskListProps) {
  return (
    <div>
      <h1 className="text-left lg:text-lg text-sm  font-bold lg:mb-4 mb-3">
        {props.title}
      </h1>
      <ul className="flex flex-col space-y-1">
        {props.datas.map((item) => (
          <li>
            <TaskCard task={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
