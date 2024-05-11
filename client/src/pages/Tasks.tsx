import TaskStat from "@/components/TaskStat";
import TasksList from "@/components/Tasks/TasksList";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import TasksSkeletons from "@/components/ui/skeletons/TasksSkeletons";
import { TaskType } from "@/types/Task";
import { fetchTasks } from "@/utils/taskActions";
import { useQuery } from "@tanstack/react-query";

const Tasks = () => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery<TaskType[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const totalTasks = tasks?.length ?? 0;
  const completedTasks = tasks?.filter((task) => task.isCompleted).length ?? 0;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="grid lg:col-span-3">
          <TaskStat totalTasks={totalTasks} completedTasks={completedTasks} />
        </div>
        <div className="grid lg:col-span-9">
          <div className="flex flex-col">
            <p className="text-2xl mb-4">All Tasks</p>
            <Separator className="mb-4" />
          </div>
          {isLoading ? (
            <TasksSkeletons number={6} />
          ) : (
            <TasksList tasks={tasks ?? []} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Tasks;
