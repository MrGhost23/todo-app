import { TaskType } from "@/types/Task";
import Task from "./Task";

const TasksList: React.FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  return (
    <div>
      <div className="grid col-span-9 grid-cols-1 lg:grid-cols-4 gap-4">
        {tasks?.map((task: TaskType) => {
          return <Task key={task._id} {...task} />;
        })}
      </div>
    </div>
  );
};
export default TasksList;
