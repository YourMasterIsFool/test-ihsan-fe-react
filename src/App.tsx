import "./App.css";
import { TaskList } from "./components/task/TaskList";
import { Button } from "./components/commons/Button";
import { useTaskStore } from "./store/taskStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CreateTaskDto } from "./dto/task/CreateTaskDto";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateTaskDto } from "./dto/task/UpdateTaskDto";
const formSchema = z.object({
  name: z
    .string({
      message: "title dibutuhkan",
    })
    .min(3, {
      message: "minimal title 3 huruf",
    }),
});

function App() {
  const { getAllTask, tasks, createTask, detail, cancelUpdate, updateTask, onGoingTaskList, getAllOnGoingTask, getAllCompletedTask, completedTaskList } =
    useTaskStore();
  const form = useForm({
    shouldUseNativeValidation: true,
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (values) => {
    const taskDto: CreateTaskDto = {
      name: values.name,
    };
    console.log(taskDto);
    if (detail) {
      const updateDto: UpdateTaskDto = {
        name: values.name,
      };
      await updateTask(detail.id, updateDto, () => {
        form.setValue("name", "");
      });
    } else {
      await createTask(taskDto, ()=> {
        form.setValue('name', '')
      });
    }
  };

  const handleCancel = () => {
    cancelUpdate();
    form.setValue("name", "");
  };
  useEffect(() => {
    if (detail) {
      form.setValue("name", detail.name);
    }
  }, [detail]);
  useEffect(() => {
    getAllTask();
    getAllOnGoingTask()
    getAllCompletedTask()
  }, []);
  return (
    <>
      <div>
        <h1 className="lg:text-[48px] text-xl text-center font-[400]">
          Task Management
        </h1>
        <div className="w-full flex items-center justify-center">
          <div className="lg:mt-6 mt-4 lg:w-2/3 w-full">
            <div>
              <p className="lg:text-base font-light text-left capitalize">
                title
              </p>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <input className="form-input" {...form.register("name")} />
                {form.formState.errors.name && (
                  <span class="text-red-500 text-xs">
                    {form.formState.errors.name.message}
                  </span>
                )}

                <div className="list-button lg:mt-3 mt-2 flex items-center space-x-4 justify-center ">
                  {detail ? (
                    <>
                      <Button type="submit" color="warning">
                        Update
                      </Button>
                      <Button
                        onClick={() => handleCancel()}
                        type="button"
                        color="destructive"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button type="submit">Add Task</Button>
                  )}
                </div>
              </form>
            </div>
            <div className="on going task lg:mt-6 mt-4">
              <TaskList title="On Going Task" datas={onGoingTaskList} />
            </div>

            <div className="Completed task lg:mt-6 mt-4">
              <TaskList title="Completed Task" datas={completedTaskList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
